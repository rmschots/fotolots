import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.scss'
})
export class AddCategoryDialogComponent {
  categoryNameControl = new FormControl('', {nonNullable: true});

  constructor(public dialogRef: MatDialogRef<AddCategoryDialogComponent>) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryNameControl.valid) {
      this.dialogRef.close(this.categoryNameControl.value);
    }
  }
}
