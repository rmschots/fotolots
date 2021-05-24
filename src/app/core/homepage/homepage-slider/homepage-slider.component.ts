import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import SwiperCore, { EffectFade, Navigation, Autoplay } from 'swiper/core';

SwiperCore.use([EffectFade, Navigation, Autoplay]);

@Component({
    selector: 'app-homepage-slider',
    templateUrl: './homepage-slider.component.html',
    styleUrls: ['./homepage-slider.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class HomepageSliderComponent {

}
