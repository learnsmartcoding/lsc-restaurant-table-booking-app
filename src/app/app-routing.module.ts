import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EventsComponent } from './events/events.component';
import { ChefsComponent } from './chefs/chefs.component';
import { SearchRestaurantsComponent } from './search-restaurants/search-restaurants.component';
import { ClaimsDetailsComponent } from './claims-details/claims-details.component';
import { RoleAuthGuard } from './core/role-auth.guard';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { SuperAdminAuthGuard } from './core/super-admin.guard copy';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'menu', component: MenuComponent
  },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'chefs', component: ChefsComponent },
  {
    path: 'about', component: AboutComponent
  }, {
    path: 'contact', component: ContactComponent
  }, {
    path: 'gallery', component: GalleryComponent
  },
  {
    path: 'claims', component: ClaimsDetailsComponent,
    canActivate: [RoleAuthGuard] // Apply the RoleAuthGuard to this route
  },
  {
    path: 'reservations', component: ReservationDetailsComponent
    ,canActivate: [SuperAdminAuthGuard] // Apply the RoleAuthGuard to this route
  },
  { path: 'book-a-table', component: SearchRestaurantsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
