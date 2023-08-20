import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { NewpostComponent } from './components/pages/newpost/newpost.component';
import { UserGuardGuard } from './services/user-guard.guard';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { HttpClient } from '@angular/common/http';
import { UploadpostService } from './services/uploadpost.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from './components/pages/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'feed', component: UserHomeComponent, canActivate:[UserGuardGuard] },
  { path: 'new', component: NewpostComponent },
  { path: 'profile', component: ProfileComponent},
  { path: ':post.username', component: UserProfileComponent},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { 
  
}
