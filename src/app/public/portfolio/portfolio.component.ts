import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { OverMijPage } from '../../shared/page';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<OverMijPage>('portfolio');

}
