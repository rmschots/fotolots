import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { HomePage } from '../../shared/page';

type HomePageForm = {
  description: FormControl<string>
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
      description: new FormControl<string>('', {nonNullable: true})
    });
  }

  override getPageName(): string {
    return 'home';
  }
}
