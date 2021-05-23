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

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        HomepageSliderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        SwiperModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
