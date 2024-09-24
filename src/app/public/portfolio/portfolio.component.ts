import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { PageService } from '../services/page.service';
import { PortfolioPage } from '../../shared/page';
import { register } from 'swiper/element/bundle';
import '@appnest/masonry-layout';
import { LightGallerySettings } from 'lightgallery/lg-settings';

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
  columns = signal(this.determineColumnCount());

  generateUrlSmall(category: string, pictureId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/portfolio%2F${category.toLowerCase()}%2Fresized%2F${pictureId}_150x150.avif?alt=media`;
  }

  generateUrlMedium(category: string, pictureId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/portfolio%2F${category.toLowerCase()}%2Fresized%2F${pictureId}_600x900.avif?alt=media`;
  }

  generateUrlBig(category: string, pictureId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/portfolio%2F${category.toLowerCase()}%2Fresized%2F${pictureId}_1920x1920.avif?alt=media`;
  }

  generateUrlHuge(category: string, pictureId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/portfolio%2F${category.toLowerCase()}%2Fresized%2F${pictureId}_5000x5000.avif?alt=media`;
  }

  settings: LightGallerySettings = {
    counter: false,
    selector: '.item',
    download: false
  };

  @HostListener('window:resize')
  onResize() {
    let value = this.determineColumnCount();
    console.log(value)
    this.columns.set(value);
  }

  private determineColumnCount(): number {
    return Math.ceil(window.innerWidth / 600);
  }

}
