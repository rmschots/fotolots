import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { PageService } from '../services/page.service';
import { HomePage } from '../../shared/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  @ViewChild('welcomeSection') welcomeSection!: ElementRef;
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<HomePage>('home');

  scrollToWelcome() {
    this.welcomeSection.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  generateUrlMedium(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/home%2Fdiensten%2Fresized%2F${imageId}_600x900.avif?alt=media`;
  }

  generateUrlBig(imageId: string) {
    return `https://firebasestorage.googleapis.com/v0/b/fotolots.appspot.com/o/home%2Fdiensten%2Fresized%2F${imageId}_1920x1920.avif?alt=media`;
  }
}
