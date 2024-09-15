import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { PortfolioPage } from '../../shared/page';
import { register } from 'swiper/element/bundle';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

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

  generateUrl(category: string, pictureId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/portfolio%2F${category.toLowerCase()}%2Fresized%2F${pictureId}_720x480.avif?alt=media`;
  }

  settings = {
    counter: false
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

}
