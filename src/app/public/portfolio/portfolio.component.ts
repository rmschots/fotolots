import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { PortfolioPage } from '../../shared/page';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<PortfolioPage>('portfolio');

}
