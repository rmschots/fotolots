import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DienstenComponent } from './diensten/diensten.component';
import { ContactComponent } from './contact/contact.component';
import { OverMijComponent } from './over-mij/over-mij.component';

const routes: Routes = [{
  path: '',
  component: PublicComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'Home',
      component: HomeComponent
    }, {
      path: 'portfolio',
      title: 'Portfolio',
      component: PortfolioComponent
    },
    {
      path: 'over-mij',
      title: 'Over mij',
      component: OverMijComponent
    },
    {
      path: 'diensten',
      title: 'Diensten',
      component: DienstenComponent
    },
    {
      path: 'contact',
      title: 'Contact',
      component: ContactComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
