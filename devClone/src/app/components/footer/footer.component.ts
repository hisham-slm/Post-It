import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  
  constructor(private userService: UserService , private router : Router){ }
  submit(emailForm: NgForm){
    console.log(emailForm)
    this.userService.addToEmailList(emailForm).subscribe(((res: { statusCode: Number, msg: string }) => {
      let errorMessage = document.getElementById('emailerror') as HTMLElement;
      

      if (res.statusCode == 401) {
        errorMessage.innerHTML = res.msg
        this.router.navigateByUrl('signup')
      }
      else{
        alert(res.msg)
      }

    }))
  }
}
