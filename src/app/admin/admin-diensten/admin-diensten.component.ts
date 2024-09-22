import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { DienstenPage } from '../../shared/page';
import { UploadDialogComponent, UploadParams, UploadResult } from '../utils/upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';

type DienstForm = {
  name: FormControl<string>;
  imageId: FormControl<string>;
  description: FormControl<string>;
  inclusions: FormArray<FormControl<string>>;
}

type DienstenPageForm = {
  diensten: FormArray<FormGroup<DienstForm>>;
};

@Component({
  selector: 'app-admin-diensten',
  templateUrl: './admin-diensten.component.html',
  styleUrl: './admin-diensten.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDienstenComponent extends BaseAdminComponent<DienstenPage, DienstenPageForm> {
  #dialog: MatDialog = inject(MatDialog);
  #cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  override initFormGroup(): FormGroup<DienstenPageForm> {
    return new FormGroup<DienstenPageForm>({
      diensten: new FormArray<FormGroup<DienstForm>>([])
    });
  }

  override prepareFormGroupForData(data: DienstenPage): void {
    if (!data) {
      return;
    }
    const dienstenFormArray = this.fg.get('diensten') as FormArray<FormGroup<DienstForm>>;
    dienstenFormArray.clear();
    data.diensten.forEach(dienst => {
      dienstenFormArray.push(new FormGroup<DienstForm>({
        name: new FormControl<string>('', {nonNullable: true}),
        description: new FormControl<string>('', {nonNullable: true}),
        imageId: new FormControl<string>('', {nonNullable: true}),
        inclusions: new FormArray(dienst.inclusions.map(() => new FormControl('', {nonNullable: true})))
      }));
    });
  }

  override getPageName(): string {
    return 'diensten';
  }

  addDienst() {
    this.fg.controls.diensten.push(new FormGroup<DienstForm>({
      name: new FormControl<string>('', {nonNullable: true}),
      description: new FormControl<string>('', {nonNullable: true}),
      imageId: new FormControl<string>('', {nonNullable: true}),
      inclusions: new FormArray<FormControl<string>>([])
    }));
  }

  removeDienst(index: number) {
    this.fg.controls.diensten.removeAt(index)
  }

  addInclusion(dienstIndex: number) {
    this.fg.controls.diensten.at(dienstIndex).controls.inclusions.push(new FormControl<string>('', {nonNullable: true}));
  }

  removeInclusion(dienstIndex: number, index: number) {
    this.fg.controls.diensten.at(dienstIndex).controls.inclusions.removeAt(index)
  }

  setImage(dienstIndex: number) {
    const dialogRef = this.#dialog.open(UploadDialogComponent, {
      width: '500px',
      data: {
        path: `diensten`,
        multi: false
      } as UploadParams
    });
    dialogRef.afterClosed().subscribe((results: UploadResult[]) => {
      if (results) {
        const picturesFormControl = this.fg.controls.diensten.at(dienstIndex).controls.imageId;
        picturesFormControl.setValue(results[0].id);
        this.#cdr.detectChanges();
        this.submitForm();
      }
    });
  }

  generateUrlSmall(imageId: string) {
      return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/diensten%2Fresized%2F${imageId}_150x150.avif?alt=media`;

  }

  getAlternativePicture(event: ErrorEvent) {
    const errorImage = '/assets/processing.png';
    if((event.target as HTMLImageElement).src !== errorImage) {
      (event.target as HTMLImageElement).src = errorImage;
    }
  }
}
