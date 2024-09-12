import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseAdminComponent } from '../utils/base-admin-page.component';
import { PortfolioPage } from '../../shared/page';

type PortfolioPageForm = {
  description: FormControl<string>
}

@Component({
  selector: 'app-admin-portfolio',
  templateUrl: './admin-portfolio.component.html',
  styleUrl: './admin-portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPortfolioComponent extends BaseAdminComponent<PortfolioPage, PortfolioPageForm> {
  override prepareFormGroupForData(data: PortfolioPage): void {

  }
  override initFormGroup(): FormGroup<PortfolioPageForm> {
    return new FormGroup<PortfolioPageForm>({
      description: new FormControl<string>('', {nonNullable: true})
    });
  }

  override getPageName(): string {
    return 'portfolio';
  }
}
