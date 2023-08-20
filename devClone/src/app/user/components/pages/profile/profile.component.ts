import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UploadpostService } from 'src/app/user/services/uploadpost.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostModalComponent } from './post-modal/post-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: any
  media : any[] = [] 
  numberOfPosts: number = 0
  id:any = localStorage.getItem('userId')

  images :any [] = []
  constructor(private http: HttpClient, private profileDetails: UploadpostService, public dialog:MatDialog) { }

  ngOnInit(){

    this.getProfileDetails(this.id)

    console.log(this.images)    
  }

  getProfileDetails(id: any) {
    console.log('started')
    this.profileDetails.getProfileDetails(id).subscribe((res: {statusCode: number, msg: string, profileData: any, mediaData: any, postCount: any} )=> {
      console.log(res.profileData)
      console.log(res.mediaData)
      

      this.details =  res.profileData
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
  
}
