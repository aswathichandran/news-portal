import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterUserComponent } from './modules/register-user/register-user.component';
import { LoginComponent } from './modules/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ReadLaterComponent } from './modules/read-later/read-later.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    ReadLaterComponent,
    DashboardLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
