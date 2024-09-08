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


@NgModule({
  declarations: [
    AdminComponent,
    AdminOverMijComponent
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
    MatCardModule
  ]
})
export class AdminModule {
}
