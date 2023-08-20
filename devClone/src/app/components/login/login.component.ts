import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  sCode:number = 0
  msg: string = ''

  constructor(private loginService: LoginService, private router: Router ) { }

  submit(loginForm: any) {
    
    this.loginService.userLogin(loginForm).subscribe((res: { statusCode: number, msg: string , userId : string }) => {
      
      this.sCode = res.statusCode
      this.msg = res.msg

      
      if (res.statusCode != 201) {
        let errorMessage = document.getElementById('error') as HTMLElement;
        errorMessage.innerHTML = res.msg
      }
      else{
        localStorage.setItem('sessionUser',loginForm.username)
        localStorage.setItem('userId',res.userId)
        this.router.navigateByUrl('/user/feed')
      }

    })
  }
}
