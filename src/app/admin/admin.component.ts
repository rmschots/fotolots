import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { of } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  private auth: Auth = inject(Auth);

  userEmail: WritableSignal<string | undefined> = signal(undefined);
  isLoggedIn = computed(() => !!this.userEmail());

  ngOnInit(): void {
    this.initAuth();
  }

  public signInWithGoogle() {
    return of(this.signIn()).subscribe({
      next: () => {
        console.log('signing in...');
      },
      error: err => {
        console.error('signIn', err);
      }
    });
  }

  private initAuth() {
    this.auth.onAuthStateChanged(value => {
        console.log('authStateChanged', value);
        if (value?.email === null) {
          throw Error('email is null');
        }
        this.userEmail.set(value?.email);
      },
      error => {
        console.error('authStateChanged error', error);
      });
  }

  private signIn() {
    switch (environment.signInMethod) {
      case 'redirect':
        return signInWithRedirect(this.auth, new GoogleAuthProvider());
      case 'popup':
        return signInWithPopup(this.auth, new GoogleAuthProvider());
      default:
        throw Error('invalid signInMethod');
    }
  }
}
