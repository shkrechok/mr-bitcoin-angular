import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { contactResolver } from './resolvers/contact-resolver';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  { path: 'contact', component: ContactPageComponent },
  { path: 'contact/edit/:id', component: ContactEditPageComponent, resolve: { contact: contactResolver } },
  { path: 'contact/edit', component: ContactEditPageComponent},
  { path: 'contact/:id', component: ContactDetailsPageComponent, resolve: { contact: contactResolver } },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'statistics', component: StatisticsPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
