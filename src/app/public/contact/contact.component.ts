import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../services/page.service';
import { ContactPage } from '../../shared/page';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ContactComponent {
  #pageService: PageService = inject(PageService);
  pageData$ = this.#pageService.readPageData<ContactPage>('contact');

}
