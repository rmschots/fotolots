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
}
