import { inject, Injectable } from '@angular/core';
import { doc, docSnapshots, DocumentSnapshot, Firestore } from '@angular/fire/firestore';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { isEqual } from 'lodash-es';

@Injectable()
export class PageService {

  #firestore: Firestore = inject(Firestore);

  readPageData<T>(pageName: string): Observable<T> {
    const document = doc(this.#firestore, 'pages', pageName);
    return docSnapshots<T>(document)
      .pipe(
        map((value: DocumentSnapshot<T>) => value.data()),
        filter(value => !!value),
        distinctUntilChanged((previous, current) => {
          return isEqual(previous, current);
        })
      );
  }
}
