import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { DienstenPage } from '../../shared/page';

@Component({
  selector: 'app-diensten',
  templateUrl: './diensten.component.html',
  styleUrl: './diensten.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DienstenComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<DienstenPage>('diensten');

  generateUrlSmall(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/diensten%2Fresized%2F${imageId}_150x150.avif?alt=media`;
  }

  generateUrlMedium(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/diensten%2Fresized%2F${imageId}_600x900.avif?alt=media`;
  }

  generateUrlBig(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/diensten%2Fresized%2F${imageId}_1920x1920.avif?alt=media`;
  }

  generateAlternativeUrl(imageId: string): (currentUrl: string) => string {
    return (currentUrl: string) => {
      if (currentUrl === this.generateUrlBig(imageId)) {
        return this.generateUrlMedium(imageId);
      } else if (currentUrl === this.generateUrlMedium(imageId)) {
        return this.generateUrlSmall(imageId);
      }
      return '/assets/processing.png';
    };
  }
}
