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
  { path: 'book-a-table', component: SearchRestaurantsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
