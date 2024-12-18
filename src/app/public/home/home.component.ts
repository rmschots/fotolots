import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PageService } from '../services/page.service';
import { HomePage } from '../../shared/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class HomeComponent {
  @ViewChild('dienstenSection') dienstenSection!: ElementRef;
  readonly #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<HomePage>('home');

  generateUrlMedium(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/home%2Fdiensten%2Fresized%2F${imageId}_600x900.avif?alt=media`;
  }

  generateUrlBig(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/home%2Fdiensten%2Fresized%2F${imageId}_1920x1920.avif?alt=media`;
  }
}
