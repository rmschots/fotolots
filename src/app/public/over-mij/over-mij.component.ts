import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { OverMijPage } from '../../shared/page';

@Component({
  selector: 'app-over-mij',
  templateUrl: './over-mij.component.html',
  styleUrl: './over-mij.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverMijComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<OverMijPage>('overMij');

  generateUrlMedium(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/overMij%2Fresized%2F${imageId}_600x900.avif?alt=media`;
  }

  generateUrlBig(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/overMij%2Fresized%2F${imageId}_1920x1920.avif?alt=media`;
  }
}
