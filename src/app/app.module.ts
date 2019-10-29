import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { ContactComponent } from './core/contact/contact.component';
import { LoginComponent } from './core/login/login.component';
import { SharedModule } from './shared/shared.module';
import { AuthReducer } from './core/login/auth.store';
import { AuthEffects } from './core/login/auth.effects';
import { HttpInterceptorService } from './http.interceptors';
import { WaitComponent } from './core/wait/wait.component';
import { ProgressComponent } from './core/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    WaitComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({"auth": AuthReducer}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : HttpInterceptorService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
