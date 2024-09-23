import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OverMijPage } from '../../shared/page';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent, UploadParams, UploadResult } from '../utils/upload-dialog/upload-dialog.component';

type OverMijPageForm = {
  description: FormControl<string>;
  imageId: FormControl<string>;
};

@Component({
  selector: 'app-admin-over-mij',
  templateUrl: './admin-over-mij.component.html',
  styleUrl: './admin-over-mij.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOverMijComponent extends BaseAdminComponent<OverMijPage, OverMijPageForm> {
  #dialog: MatDialog = inject(MatDialog);
  #cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  override prepareFormGroupForData(_: OverMijPage): void {
  }

  override initFormGroup(): FormGroup<OverMijPageForm> {
    return new FormGroup<OverMijPageForm>({
      description: new FormControl<string>('', {nonNullable: true}),
      imageId: new FormControl<string>('', {nonNullable: true})
    });
  }

  override getPageName(): string {
    return 'overMij';
  }

  setImage() {
    const dialogRef = this.#dialog.open(UploadDialogComponent, {
      width: '500px',
      data: {
        path: `overMij`,
        multi: false
      } as UploadParams
    });
    dialogRef.afterClosed().subscribe((results: UploadResult[]) => {
      if (results) {
        const picturesFormControl = this.fg.controls.imageId;
        picturesFormControl.setValue(results[0].id);
        this.#cdr.detectChanges();
      }
    });
  }

  generateUrlSmall(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/overMij%2Fresized%2F${imageId}_150x150.avif?alt=media`;

  }

  getAlternativePicture(event: ErrorEvent) {
    const errorImage = '/assets/processing.png';
    if((event.target as HTMLImageElement).src !== errorImage) {
      (event.target as HTMLImageElement).src = errorImage;
    }
  }
}
