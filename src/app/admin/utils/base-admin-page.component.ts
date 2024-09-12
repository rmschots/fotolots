// noinspection JSNonASCIINames,NonAsciiCharacters

import { inject, OnInit, signal } from '@angular/core';
import { AdminPageService } from '../services/admin-page.service';
import { AbstractControl, FormGroup, ɵFormGroupRawValue } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
export abstract class BaseAdminComponent<T extends ɵFormGroupRawValue<FT>, FT extends {
  [K in keyof FT]: AbstractControl<unknown>;
} = any> implements OnInit {
  #adminPageService: AdminPageService = inject(AdminPageService);
  fg: FormGroup<FT> = this.initFormGroup();
  dataLoaded = signal(false);

  abstract initFormGroup(): FormGroup<FT>;

  abstract prepareFormGroupForData(data: T): void;

  abstract getPageName(): string;

  ngOnInit(): void {
    this.#adminPageService.readPageData<T>(this.getPageName())
      .pipe(untilDestroyed((this)))
      .subscribe(data => {
        this.prepareFormGroupForData(data);
        this.fg.setValue(data);
        this.dataLoaded.set(true);
      });
  }

  submitForm() {
    this.#adminPageService.updatePageData(this.getPageName(), this.fg.getRawValue());
  }
}
