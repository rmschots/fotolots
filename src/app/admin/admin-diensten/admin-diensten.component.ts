import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { DienstenPage } from '../../shared/page';

type DienstForm = {
  name: FormControl<string>;
  imageUrl: FormControl<string>;
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
        imageUrl: new FormControl<string>('', {nonNullable: true}),
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
      imageUrl: new FormControl<string>('', {nonNullable: true}),
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
}
