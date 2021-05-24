import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/homepage/homepage.component';
import { GalleryComponent } from './core/gallery/gallery.component';

const routes: Routes = [
    {
        component: HomepageComponent,
        path: '',
        pathMatch: 'full',
    },{
        component: GalleryComponent,
        path: 'gallery',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
