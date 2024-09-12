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

}
