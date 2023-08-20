import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UploadpostService } from 'src/app/user/services/uploadpost.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent {
  imageURL:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PostModalComponent>, private uploadPostService : UploadpostService, private userService: UserService
  ) {
    this.imageURL = data;
    console.log('image url is',this.imageURL)
    
  }

  close(): void {
    this.dialogRef.close();
  }
  
  
  

  deletePost(id:any){
    this.userService.deletePost(id).subscribe()
    location.reload()
  }

  addComment() {
    let comment: any = document.getElementById('comment') as HTMLInputElement;
    console.log(comment.value);
    let currentUser: any = localStorage.getItem('userId');
    let imageId: any = this.imageURL.imageData.id;
    console.log(currentUser);
  
    let formData = new FormData();
  
    formData.append('comment', comment.value); 
    formData.append('user', currentUser);
    formData.append('post', imageId);
  
    console.log(formData);
  
    this.uploadPostService.addComment(formData).subscribe((res: { statusCode: Number, msg: string, username_id: Number }) => {
      console.log(res);
    });
  }
  
}
