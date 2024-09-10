import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { OverMijPage } from '../../shared/page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<OverMijPage>('home');

}
