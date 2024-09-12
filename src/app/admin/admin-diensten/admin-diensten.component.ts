import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { DienstenPage } from '../../shared/page';

type DienstenPageForm = {
  description: FormControl<string>
};

@Component({
  selector: 'app-admin-diensten',
  templateUrl: './admin-diensten.component.html',
  styleUrl: './admin-diensten.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDienstenComponent extends BaseAdminComponent<DienstenPage, DienstenPageForm> {
  override prepareFormGroupForData(data: DienstenPage): void {

  }

  override initFormGroup(): FormGroup<DienstenPageForm> {
    return new FormGroup<DienstenPageForm>({
      description: new FormControl<string>('', {nonNullable: true})
    });
  }

  override getPageName(): string {
    return 'diensten';
  }
}
