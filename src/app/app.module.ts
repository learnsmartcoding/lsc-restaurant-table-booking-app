import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { EventsComponent } from './events/events.component';
import { ChefsComponent } from './chefs/chefs.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { BookATableComponent } from './book-a-table/book-a-table.component';
import { StatsCounterComponent } from './stats-counter/stats-counter.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchRestaurantsComponent } from './search-restaurants/search-restaurants.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DaySuffixPipe } from './shared/constants/pipes/day-suffix.pipe';
import { CollectUserInfoComponent } from './collect-user-info/collect-user-info.component';
import { HttpInterceptorService } from './service/spinner-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalRedirectComponent, MsalService, ProtectedResourceScopes } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { msalConfig, protectedResources, loginRequest } from './auth-config';
import { ClaimsDetailsComponent } from './claims-details/claims-details.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';


/**
 * Here we pass the configuration parameters to create an MSAL instance.
 * For more info, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md
 */
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
* MSAL Angular will automatically retrieve tokens for resources
* added to protectedResourceMap. For more info, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md#get-tokens-for-web-api-calls
*/
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string | ProtectedResourceScopes> | null>();

  protectedResourceMap.set(protectedResources.api.endpoint, [
      {
          httpMethod: 'GET',
          scopes: [...protectedResources.api.scopes.read]
      },
      {
          httpMethod: 'POST',
          scopes: [...protectedResources.api.scopes.write]
      },
      {
          httpMethod: 'PUT',
          scopes: [...protectedResources.api.scopes.write]
      },
      {
          httpMethod: 'DELETE',
          scopes: [...protectedResources.api.scopes.write]
      }
  ]);

  return {
      interactionType: InteractionType.Popup,
      protectedResourceMap,
  };
}

/**
* Set your default interaction type for MSALGuard here. If you have any
* additional scopes you want the user to consent upon login, add them here as well.
*/
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
      interactionType: InteractionType.Redirect,
      authRequest: loginRequest
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    EventsComponent,
    ChefsComponent,
    GalleryComponent,
    ContactComponent,
    TestimonialComponent,
    BookATableComponent,
    StatsCounterComponent,
    WhyUsComponent,
    FooterComponent,
    HeaderComponent,
    SearchRestaurantsComponent,
    DaySuffixPipe,
    CollectUserInfoComponent,
    ClaimsDetailsComponent,
    ReservationDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
  },
  {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
  },
  {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
  },
  {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService,],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
