import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UploadpostService } from '../../services/uploadpost.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {
  data: any
  id: any = localStorage.getItem('userId')
  searchKey: any = ''
  searchResults: any[] = []

  constructor(private router: Router, private uploadPost: UploadpostService, private userService: UserService) { }

  ngOnInit() {
    this.getProfilePicture(this.id)
  }

  search() {
    this.uploadPost.searchProfile(this.searchKey).subscribe((res: { data: [], msg: string, statusCode: number }) => {

      this.userService.searchResults(res.data)

      let currentUser = localStorage.getItem('sessionUser')

      for (let result in this.searchResults) {
      this.searchResults = res.data
      console.log(this.searchResults)
        if (this.searchResults[result].username == currentUser) {
          console.log(this.searchResults[result].username)
          let results = this.searchResults.splice(this.searchResults[result])
        }
      }

      this.router.navigateByUrl('/search')
    })
  }

  goToCreatePost() {
    this.router.navigateByUrl('/user/new')
  }

  logout() {
    localStorage.removeItem('sessionUser')
    localStorage.removeItem('userId')
    this.router.navigateByUrl('')
  }

  getProfilePicture(id: number) {
    this.uploadPost.getProfilePicture(id).subscribe((res: { profilePicture: any }) => {
      this.data = res.profilePicture

    });
  }
}
