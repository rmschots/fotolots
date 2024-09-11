import { ChangeDetectionStrategy, Component, computed, HostListener, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent {
  screenWidth: WritableSignal<number> = signal(window.innerWidth);
  isMobile = computed(() => this.screenWidth() < 1200);

  ngOnInit() {
    this.screenWidth.set(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth);
  }
}
