import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(private router: Router){ }
  ngOnInit(){
    if(!!localStorage.getItem('sessionUser')){
      console.log('logged in')
    }
    else{
      console.log('not logged in')
      this.router.navigateByUrl('/login')
    }
  }

}
