import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { ContactPage } from '../../shared/page';

type ContactPageForm = {
  description: FormControl<string>
};

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrl: './admin-contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContactComponent extends BaseAdminComponent<ContactPage, ContactPageForm> {
  override prepareFormGroupForData(data: ContactPage): void {
  }

  override initFormGroup(): FormGroup<ContactPageForm> {
    return new FormGroup<ContactPageForm>({
      description: new FormControl<string>('', {nonNullable: true})
    });
  }

  override getPageName(): string {
    return 'contact';
  }
}
