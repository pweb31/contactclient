import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EditcontactComponent } from './editcontact/editcontact.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { NewcontactComponent } from './newcontact/newcontact.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { DetailcontactComponent } from './detailcontact/detailcontact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditcontactComponent,
    ContactComponent,
    AboutComponent,
    HeaderComponent,
    NewcontactComponent,
    RegisterComponent,
    LogoutComponent,
    DetailcontactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
