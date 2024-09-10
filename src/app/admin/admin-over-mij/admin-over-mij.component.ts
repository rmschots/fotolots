import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminPageService } from '../services/admin-page.service';

type TextSection = {
  description: string;
};

type TextSectionForm = {
  description: FormControl<string>
};

@UntilDestroy()
@Component({
  selector: 'app-admin-over-mij',
  templateUrl: './admin-over-mij.component.html',
  styleUrl: './admin-over-mij.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOverMijComponent implements OnInit {
  #adminPageService: AdminPageService = inject(AdminPageService);
  fg: FormGroup<TextSectionForm> = new FormGroup<TextSectionForm>({
    description: new FormControl<string>('', {nonNullable: true})
  });
  dataLoaded = signal(false);

  private readonly pageName = 'overMij';

  ngOnInit(): void {
    this.#adminPageService.readPageData<TextSection>(this.pageName)
      .pipe(untilDestroyed((this)))
      .subscribe(data => {
        this.fg.setValue(data);
        this.dataLoaded.set(true);
      });
  }

  submit() {
    this.#adminPageService.updatePageData(this.pageName, this.fg.getRawValue());
  }
}
