import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UploadpostService } from '../../services/uploadpost.service';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
encodeURIComponent(arg0: any): any|string {
throw new Error('Method not implemented.');
}
  posts: any[] = []
  postCard = document.getElementById('post-card');
  userId: any = localStorage.getItem('userId')
  username:any = localStorage.getItem('sessionUser')

  constructor(private router: Router, private uploadService: UploadpostService , private userService : UserService) { }

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.uploadService.viewPost(this.username).subscribe((res: { statusCode: Number, msg: string, username_id: Number, data: any }) => {
      this.posts = res.data.reverse()
    })

  }

  tapLike(postId: number) {
    const post = this.posts.find((post) => post.id === postId);

    if (post && post.post_likes !== undefined) {
      let likes = post.post_likes;

      this.uploadService.likePost(this.userId, postId).subscribe((res: { statusCode: number, msg: string }) => {
        if (res.statusCode === 204) {
          post.post_likes = likes + 1;
          let button = document.getElementById(`likeButton_${postId}`) as HTMLElement;
          button.innerHTML = "Dislike"
        }
        else {
          post.post_likes = likes - 1;
          let button = document.getElementById(`likeButton_${postId}`) as HTMLElement;
          button.innerHTML = "Like"
        }
      });
    }
  }


  sendUsername(username: any){
    this.userService.sendUsernameToProfile(username)
  }
}
