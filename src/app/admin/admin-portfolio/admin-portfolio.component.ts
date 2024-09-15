import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { PortfolioPage } from '../../shared/page';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent, UploadResult } from './upload-dialog/upload-dialog.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

type PortfolioPageForm = {
  categories: FormArray<FormGroup<CategoryForm>>;
}

type CategoryForm = {
  name: FormControl<string>;
  pictures: FormArray<FormGroup<PictureForm>>;
};

type PictureForm = {
  id: FormControl<string>;
  originalFilename: FormControl<string>;
};

@Component({
  selector: 'app-admin-portfolio',
  templateUrl: './admin-portfolio.component.html',
  styleUrl: './admin-portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPortfolioComponent extends BaseAdminComponent<PortfolioPage, PortfolioPageForm> {
  #dialog: MatDialog = inject(MatDialog);
  #cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  override prepareFormGroupForData(data: PortfolioPage): void {
    this.fg.controls.categories = new FormArray(
      (data.categories || []).map(category => this.createCategoryFormGroup(category))
    );
    this.#cdr.detectChanges();
  }

  override initFormGroup(): FormGroup<PortfolioPageForm> {
    return new FormGroup<PortfolioPageForm>({
      categories: new FormArray<FormGroup<CategoryForm>>([])
    });
  }

  override getPageName(): string {
    return 'portfolio';
  }

  addCategory() {
    const dialogRef = this.#dialog.open(AddCategoryDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((categoryName: string) => {
      if (categoryName) {
        this.fg.controls.categories.push(this.createCategoryFormGroup({name: categoryName, pictures: []}));
        this.#cdr.detectChanges();
        this.submitForm();
      }
    });
  }

  removeCategory(index: number) {
    this.fg.controls.categories.removeAt(index);
    this.#cdr.detectChanges();
    this.submitForm();
  }

  addPhotosToCategory(categoryIndex: number) {
    let categoryName = this.fg.controls.categories.at(categoryIndex).controls.name;
    const dialogRef = this.#dialog.open(UploadDialogComponent, {
      width: '500px',
      data: categoryName.value
    });
    dialogRef.afterClosed().subscribe((results: UploadResult[]) => {
      if (results) {
        const picturesFormArray = this.fg.controls.categories.at(categoryIndex).controls.pictures;
        results.forEach(result => {
          picturesFormArray.push(this.createPictureFormGroup({
            id: result.id,
            originalFilename: result.originalName
          }));
        });
        this.#cdr.detectChanges();
        this.submitForm();
      }
    });
  }

  removePhotoFromCategory(categoryIndex: number, photoIndex: number) {
    const categoriesFormArray = this.fg.get('categories') as FormArray<FormGroup<CategoryForm>>;
    const categoryFormGroup = categoriesFormArray.at(categoryIndex);
    const picturesFormArray = categoryFormGroup.get('pictures') as FormArray<FormGroup<PictureForm>>;
    picturesFormArray.removeAt(photoIndex);
    this.#cdr.detectChanges();
    this.submitForm();
  }

  private createCategoryFormGroup(category: {
    name: string;
    pictures: { id: string; originalFilename: string }[]
  }): FormGroup<CategoryForm> {
    return new FormGroup<CategoryForm>({
      name: new FormControl(category.name, {validators: [Validators.required], nonNullable: true}),
      pictures: new FormArray(
        category.pictures.map(picture => this.createPictureFormGroup(picture))
      )
    });
  }

  private createPictureFormGroup(picture: { id: string; originalFilename: string }): FormGroup<PictureForm> {
    return new FormGroup<PictureForm>({
      id: new FormControl(picture.id, {validators: [Validators.required], nonNullable: true}),
      originalFilename: new FormControl(picture.originalFilename, {
        validators: [Validators.required],
        nonNullable: true
      })
    });
  }

  generateUrl(category: string, pictureId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/portfolio%2F${category.toLowerCase()}%2Fresized%2F${pictureId}_600x900.avif?alt=media`;
  }

  getAlternativePicture(event: ErrorEvent, category: string, pictureId: string) {
    (event.target as HTMLImageElement).src = 'https://www.google.com/images/srpr/logo11w.png';
  }

  onCategoryDrop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex != event.currentIndex) {
      const categoriesArray = this.fg.controls.categories;
      moveItemInArray(categoriesArray.controls, event.previousIndex, event.currentIndex);
      this.#cdr.detectChanges();
      this.submitForm();
    }
  }

  onPictureDrop(event: CdkDragDrop<string[]>, categoryIndex: number) {
    if (event.previousIndex != event.currentIndex) {
      const picturesArray = this.fg.controls.categories.at(categoryIndex).controls.pictures;
      moveItemInArray(picturesArray.controls, event.previousIndex, event.currentIndex);
      this.#cdr.detectChanges();
      this.submitForm();
    }
  }
}
