import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SwiperModule } from 'swiper/angular';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { HomepageComponent } from './core/homepage/homepage.component';
import { HomepageSliderComponent } from './core/homepage/homepage-slider/homepage-slider.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { GalleryComponent } from './core/gallery/gallery.component';

const materialModules = [
    MatToolbarModule,
    MatButtonModule,
]

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        HomepageSliderComponent,
        GalleryComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        ...materialModules,
        SwiperModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
