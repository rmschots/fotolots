import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { DienstenPage } from '../../shared/page';

@Component({
  selector: 'app-diensten',
  templateUrl: './diensten.component.html',
  styleUrl: './diensten.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DienstenComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<DienstenPage>('diensten');

  generateUrlMedium(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/diensten%2Fresized%2F${imageId}_600x900.avif?alt=media`;
  }
}
