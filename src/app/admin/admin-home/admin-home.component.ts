import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { HomePage } from '../../shared/page';
import { UploadDialogComponent, UploadParams, UploadResult } from '../utils/upload-dialog/upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';

type DienstForm = {
  category: FormControl<string>;
  imageId: FormControl<string>;
}

type HomePageForm = {
  diensten: FormArray<FormGroup<DienstForm>>;
};

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AdminHomeComponent extends BaseAdminComponent<HomePage, HomePageForm> {
  #dialog: MatDialog = inject(MatDialog);
  #cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  override initFormGroup(): FormGroup<HomePageForm> {
    return new FormGroup<HomePageForm>({
      diensten: new FormArray<FormGroup<DienstForm>>([])
    });
  }

  override prepareFormGroupForData(data: HomePage): void {
    const dienstenFormArray = this.fg.get('diensten') as FormArray<FormGroup<DienstForm>>;
    dienstenFormArray.clear();
    data.diensten.forEach(() => {
      dienstenFormArray.push(new FormGroup<DienstForm>({
        category: new FormControl<string>('', {nonNullable: true}),
        imageId: new FormControl<string>('', {nonNullable: true}),
      }));
    });
  }

  override getPageName(): string {
    return 'home';
  }

  addDienst() {
    this.fg.controls.diensten.push(new FormGroup<DienstForm>({
      category: new FormControl<string>('', {nonNullable: true}),
      imageId: new FormControl<string>('', {nonNullable: true}),
    }));
  }

  removeDienst(index: number) {
    this.fg.controls.diensten.removeAt(index)
  }

  generateUrlSmall(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/home%2Fdiensten%2Fresized%2F${imageId}_150x150.avif?alt=media`;

  }

  getAlternativePicture(event: ErrorEvent) {
    const errorImage = '/assets/processing.png';
    if ((event.target as HTMLImageElement).src !== errorImage) {
      (event.target as HTMLImageElement).src = errorImage;
    }
  }

  setImage(dienstIndex: number) {
    const dialogRef = this.#dialog.open(UploadDialogComponent, {
      width: '500px',
      data: {
        path: `home/diensten`,
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
}
