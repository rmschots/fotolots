import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { HomePage } from '../../shared/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<HomePage>('home');

  scrollToWelcome() {
    const welcomeSection = document.getElementById('welcome-section');
    if (welcomeSection) {
      welcomeSection.scrollIntoView({behavior: 'smooth'});
    }
  }
}
