import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OverMijPage } from '../../shared/page';
import { BaseAdminComponent } from '../utils/base-admin-page.component';

type OverMijPageForm = {
  description: FormControl<string>
};

@Component({
  selector: 'app-admin-over-mij',
  templateUrl: './admin-over-mij.component.html',
  styleUrl: './admin-over-mij.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOverMijComponent extends BaseAdminComponent<OverMijPage, OverMijPageForm> {
  override initFormGroup(): FormGroup<OverMijPageForm> {
    return new FormGroup<OverMijPageForm>({
      description: new FormControl<string>('', {nonNullable: true})
    });
  }

  override getPageName(): string {
    return 'overMij';
  }
}
