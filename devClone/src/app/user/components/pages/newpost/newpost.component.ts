import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadpostService } from 'src/app/user/services/uploadpost.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent {
  location: any;


  constructor(private uploadPostService:UploadpostService,private router:Router){ }


  // userName = localStorage.getItem('sessionUser')
  userId : any

  caption:any;
  file:any

  handleFileInput(event: any) {
    this.file = event.target.files[0];

    const allowedTypes = ['image/jpeg', 'image/png'];


    if (this.file && allowedTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const filePreview = document.getElementById('filePreview') as HTMLElement;
        filePreview.innerHTML = `<img src="${e.target.result}"  alt="File Preview" class="preview-image" style="max-width:100%; max-height:100%; object-fit:cover; position: relative; top: 0; left: 0; ">`
        // 
      };
      const error = document.getElementById('error') as HTMLInputElement
      const fileInput = document.getElementById('input') as HTMLInputElement
      fileInput.remove

      

      

      reader.readAsDataURL(this.file);


      error.innerHTML = ''
      console.log('Selected image file:', this.file);
    } else {
      let error = document.getElementById('error') as HTMLInputElement
      error.innerHTML = 'Please select images only' 
      console.log('Please select a valid image file.');
    }

  }

  ngOnInit(){
    this.userId = localStorage.getItem('userId')
  }

  
  submit(postForm :any){
    console.log(postForm.value)
    // this.uploadPostService.uploadPost(postForm.value).subscribe((res: { statusCode: Number, msg: string }) => {
    //   console.log(res)
    // })

    let userId = localStorage.getItem('userId')
    let formData = new FormData()


    formData.append('username' ,this.userId)
    formData.append('media',this.file)
    formData.append('caption' , postForm['caption'])
    
    this.uploadPostService.uploadPost(formData).subscribe((res: { statusCode: Number, msg: string, username_id :Number }) => {
      console.log(res)
    })
    console.log(formData)
    this.router.navigateByUrl('user/feed', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }


}
