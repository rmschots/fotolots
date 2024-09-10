import { inject, Injectable } from '@angular/core';
import { doc, docSnapshots, DocumentSnapshot, Firestore, UpdateData, updateDoc } from '@angular/fire/firestore';
import { distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { isEqual } from 'lodash-es';

@Injectable()
export class AdminPageService {
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

  updatePageData(pageName: string, data: UpdateData<unknown>) {
    const document = doc(this.#firestore, 'pages', pageName);
    updateDoc(document, data).then(() => {
      console.log('successfully updated');
    })
  }
}
