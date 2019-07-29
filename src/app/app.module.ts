import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, CommonModule, PlatformLocation} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomepageComponent} from './main/homepage.component';
import {NavBarComponent} from './navbar/navbar.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {LocaleSelectorComponent} from './navbar/locale-selector/locale-selector.component';
import {RedirectComponent} from './redirect/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    LocaleSelectorComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    },
  ],
  entryComponents: [],
  exports: [
  ]
})
export class AppModule {
}
