import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageDoesntExistComponent } from './components/page-doesnt-exist/page-doesnt-exist.component';
import { AuthGuardService } from './user/services/auth-guard.service';
import { UserGuardGuard } from './user/services/user-guard.guard';
import { SearchComponent } from './user/components/pages/search/search.component';

const routes: Routes = [
  { path : '' , redirectTo : 'home' , pathMatch : 'full'},
  {path : 'home' , component : HomeComponent},
  {path : 'login' ,component : LoginComponent},
  { path : 'signup' , component : SignupComponent},
  { path : 'search' , component: SearchComponent},
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },


  {path : '**' , component : PageDoesntExistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
