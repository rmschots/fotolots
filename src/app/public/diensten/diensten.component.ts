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

  categories = [
    {
      name: 'Wedding',
      imageUrl: 'assets/home-background-80.webp',
      description: 'Capture the magic of your special day with our professional wedding photography services.',
      inclusions: [
        'Full day coverage',
        'Engagement photo session',
        'Online gallery',
        'High-resolution digital files',
        'Printed album'
      ]
    },
    {
      name: 'Family',
      imageUrl: 'assets/home-background-80.webp',
      description: 'Preserve precious family moments with our warm and natural family photography sessions.',
      inclusions: [
        '1-hour photo session',
        'Multiple locations',
        'Online gallery',
        '10 high-resolution digital files',
        'Print package options'
      ]
    },
    {
      name: 'Party',
      imageUrl: 'assets/home-background-80.webp',
      description: 'Let us document the fun and excitement of your special event with our party photography services.',
      inclusions: [
        'Up to 4 hours of coverage',
        'Professional lighting setup',
        'Online gallery',
        'All high-resolution digital files',
        'Photo booth option'
      ]
    }
  ];
}
