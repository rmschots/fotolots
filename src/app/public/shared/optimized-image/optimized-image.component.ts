import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-optimized-image',
  templateUrl: './optimized-image.component.html',
  styleUrl: './optimized-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedImageComponent {
  src = input.required<string>();
  alt = input.required<string>();
  placeholderSrc = input.required<string>();
  loaded = signal(false);

  constructor() {
    this.lazyLoadImage();
  }

  lazyLoadImage() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset['src'] ?? '';
          observer.unobserve(img);
        }
      });
    });

    setTimeout(() => {
      const img = document.querySelector(`img[data-src="${this.src()}"]`);
      if (img) observer.observe(img);
    }, 0);
  }

  onImageLoad() {
    this.loaded.set(true);
  }
}
