import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserNavComponent } from '../../user-nav/user-nav.component';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  results: any[] = []
  currentUser = localStorage.getItem('sessionUser')
  

  constructor( private userService : UserService){}

  ngOnInit(){
    
    
    this.results = this.userService.sendSearchResults()
    console.log(this.results)

  if (this.results == this.results){
    const header = document.getElementById('header') as HTMLElement
    
    header.innerHTML = "No Results Found"
  }

  

    for (let result of this.results) {
      if (result.username === this.currentUser) {
        const indexToRemove = this.results.indexOf(result);
        if (indexToRemove !== -1) {
          this.results.splice(indexToRemove, 1);
          
        }
      }
    }
    
    
  }

  sendUsername(username: any){
    this.userService.sendUsernameToProfile(username)
    console.log('the data is',username)
  }

}
