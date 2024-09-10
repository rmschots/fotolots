import { NgModule } from '@angular/core';

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
    MatListModule
  ],
  providers: [PageService]
})
export class PublicModule {
}
