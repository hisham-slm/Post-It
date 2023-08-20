import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UploadpostService } from 'src/app/user/services/uploadpost.service';
import { PostModalComponent } from '../profile/post-modal/post-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  receivedUsername: any = localStorage.getItem('lastVisitedProfile');
  details: any
  media: any[] = []
  numberOfPosts: number = 0
  id: any = localStorage.getItem('userId')

  images: any[] = []

  constructor(private userService: UserService, private http: HttpClient, private profileDetails: UploadpostService, public dialog: MatDialog) { }

  ngOnInit() {
    this.receivedUsername = this.userService.getUsername()
    localStorage.setItem('lastVisitedProfile', this.receivedUsername);



    this.getProfileDetails(this.receivedUsername)

    console.log(this.images)
  }

  getProfileDetails(receivedUsername: any) {
    console.log('started')
    this.profileDetails.getProfileDetails(receivedUsername).subscribe((res: { statusCode: number, msg: string, profileData: any, mediaData: any, postCount: any }) => {
      console.log(res.profileData)
      console.log(res.mediaData)


      this.details = res.profileData
      this.media = res.mediaData
      this.numberOfPosts = res.postCount
      this.images = res.mediaData.media

    })


  }

  openModal(data: any): void {
    console.log(data)
    const dialogRef = this.dialog.open(PostModalComponent, {
      width: '400px',
      data: { imageData: data }
    });
  }

  follow(){
    console.log('follow clicked')
    let follower = localStorage.getItem('sessionUser')
    let following = this.details.username
    const followButton = document.querySelector('.button') as HTMLButtonElement;
    
    this.userService.follow(follower,following).subscribe((res: {statusCode :number , msg :string})=>{

      if (res.statusCode == 200){

        followButton.classList.add('following')
        followButton.innerHTML = 'Following'
      }

      if (res.statusCode == 403){
        followButton.classList.add('button')
        followButton.classList.remove('following')
        followButton.innerHTML= 'Follow'
      }
    })


  }




}


