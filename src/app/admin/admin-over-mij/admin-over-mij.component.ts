import { Component, inject, OnInit } from '@angular/core';
import { doc, docSnapshots, DocumentSnapshot, Firestore, updateDoc } from '@angular/fire/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { isEqual } from 'lodash-es';

type TextSection = {
  description: {
    text: string;
  }
};

@UntilDestroy()
@Component({
  selector: 'app-admin-over-mij',
  templateUrl: './admin-over-mij.component.html',
  styleUrl: './admin-over-mij.component.scss'
})
export class AdminOverMijComponent implements OnInit {
  #firestore: Firestore = inject(Firestore);
  fg: FormGroup = new FormGroup({
    description: new FormControl<string>('')
  });

  readonly #document = doc(this.#firestore, 'pages', 'overMij');

  ngOnInit(): void {
    docSnapshots<TextSection>(this.#document)
      .pipe(
        map((value: DocumentSnapshot<TextSection>) => value.data()),
        filter(value => !!value),
        distinctUntilChanged((previous, current) => {
          return isEqual(previous, current);
        }),
        untilDestroyed((this))
      )
      .subscribe((data: TextSection) => {
        console.log('got new snapshot', data);
        if (data) {
          this.fg.setValue(data);
        }
      });
  }

  submit() {
    updateDoc(this.#document, this.fg.getRawValue()).then(() => {
      console.log('successfully updated');
    });
  }
}
