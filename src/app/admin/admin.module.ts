import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminOverMijComponent } from './admin-over-mij/admin-over-mij.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPortfolioComponent } from './admin-portfolio/admin-portfolio.component';
import { AdminDienstenComponent } from './admin-diensten/admin-diensten.component';
import { AdminContactComponent } from './admin-contact/admin-contact.component';
import { AdminPageService } from './services/admin-page.service';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AdminComponent,
    AdminOverMijComponent,
    AdminHomeComponent,
    AdminPortfolioComponent,
    AdminDienstenComponent,
    AdminContactComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [AdminPageService]
})
export class AdminModule {
}
