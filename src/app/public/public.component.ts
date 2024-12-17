import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PublicComponent implements OnInit {
  screenWidth: WritableSignal<number> = signal(window.innerWidth);
  isMobile = computed(() => this.screenWidth() < 1024);

  ngOnInit() {
    this.screenWidth.set(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.set(window.innerWidth);
  }
}
