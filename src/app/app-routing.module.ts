import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EditcontactComponent } from './editcontact/editcontact.component';
import { NewcontactComponent } from './newcontact/newcontact.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './services/authentication.guard';
import { DetailcontactComponent } from './detailcontact/detailcontact.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'contacts', canActivate:[AuthenticationGuard],component: ContactComponent},
  {path: 'newContact', component: NewcontactComponent},
  {path: 'editContact/:id', component: EditcontactComponent},
  {path: 'detailContact/:id', component: DetailcontactComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login',pathMatch: 'full'}
  // {path: '', redirectTo: '/contacts',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AppRoutingModule { }
