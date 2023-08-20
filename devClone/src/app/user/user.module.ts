import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { UserfooterComponent } from './components/userfooter/userfooter.component';
import { RouterModule } from '@angular/router';
import { NewpostComponent } from './components/pages/newpost/newpost.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UploadpostService } from './services/uploadpost.service';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { PostModalComponent } from './components/pages/profile/post-modal/post-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { SearchComponent } from './components/pages/search/search.component';



@NgModule({
  declarations: [
    UserComponent,
    UserHomeComponent,
    UserNavComponent,
    UserfooterComponent,
    NewpostComponent,
    ProfileComponent,
    PostModalComponent,
    UserProfileComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class UserModule { 
  
}
