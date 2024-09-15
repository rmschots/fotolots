import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { SharedModule } from '../shared/shared.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { MatListModule } from '@angular/material/list';
import { DienstenComponent } from './diensten/diensten.component';
import { OverMijComponent } from './over-mij/over-mij.component';
import { PageService } from './services/page.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LightgalleryModule } from 'lightgallery/angular';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    PortfolioComponent,
    ContactComponent,
    DienstenComponent,
    OverMijComponent
  ],
  imports: [
    SharedModule,
    PublicRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    LightgalleryModule
  ],
  providers: [PageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicModule {
}
