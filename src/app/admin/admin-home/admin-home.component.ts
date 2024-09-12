import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { HomePage } from '../../shared/page';

type DienstForm = {
  category: FormControl<string>;
  text: FormControl<string>;
}

type HomePageForm = {
  welkomSectieText: FormControl<string>;
  diensten: FormArray<FormGroup<DienstForm>>;
};

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHomeComponent extends BaseAdminComponent<HomePage, HomePageForm> {
  override initFormGroup(): FormGroup<HomePageForm> {
    return new FormGroup<HomePageForm>({
      welkomSectieText: new FormControl<string>('', {nonNullable: true}),
      diensten: new FormArray<FormGroup<DienstForm>>([])
    });
  }

  override prepareFormGroupForData(data: HomePage): void {
    const dienstenFormArray = this.fg.get('diensten') as FormArray<FormGroup<DienstForm>>;
    dienstenFormArray.clear();
    data.diensten.forEach(() => {
      dienstenFormArray.push(new FormGroup<DienstForm>({
        category: new FormControl<string>('', {nonNullable: true}),
        text: new FormControl<string>('', {nonNullable: true})
      }));
    })
  }

  override getPageName(): string {
    return 'home';
  }

  addDienst() {
    this.fg.controls.diensten.push(new FormGroup<DienstForm>({
      category: new FormControl<string>('', {nonNullable: true}),
      text: new FormControl<string>('', {nonNullable: true})
    }));
  }

  removeDienst(index: number) {
    this.fg.controls.diensten.removeAt(index)
  }
}
