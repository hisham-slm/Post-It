import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  msg: string = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(){
    window.scroll({top:0,left:0,behavior: 'smooth'})
  }

  passwordVerification() {
    let password = document.getElementById('password') as HTMLInputElement;
    let confirmPassword = document.getElementById('confirmPassword') as HTMLInputElement;
    let errorMessage = document.getElementById('error') as HTMLElement;
    let passwordValidation = true;

    if (password.value !== confirmPassword.value) {
      passwordValidation = false;
      confirmPassword.value = '';
      errorMessage.innerHTML = "Passwords Doesn't Match";
      
    }
    else {
      passwordValidation = true;
      errorMessage.innerHTML = ''
    }
    return passwordValidation
  }


  emailValidation(signUpForm: NgForm) {

    if (signUpForm.controls['email'].dirty == false) {
      return false
    }
    else {
      return true
    }
  }
  usernameSpaceFinder(){
    let username = document.getElementById('username') as HTMLInputElement
    let errorMessage = document.getElementById('error') as HTMLElement;
    let space = false
    length = username.value.length

    for(let i = 1; i<= length; i++){
      if (username.value[i] == ' '){
        space = true 
        break  
      }
      else{
        space = false
      }
    }
    if (space == true){
      errorMessage.innerHTML = 'No space allowed for username';
    }
    return space 
  }





  submit(signUpForm: NgForm) {
    this.usernameSpaceFinder();
    this.passwordVerification();
    this.emailValidation(signUpForm);
    if (this.passwordVerification() == true && this.emailValidation(signUpForm) == true && this.usernameSpaceFinder() == false) {
      this.userService.userSignup(signUpForm.value).subscribe((res: { statusCode: Number, msg: string ,userId : string}) => {
        let errorMessage = document.getElementById('error') as HTMLElement;
        
        if (res.statusCode == 204) {
          localStorage.setItem('sessionUser', signUpForm.value.username)
          localStorage.setItem('userId',res.userId)

          this.router.navigateByUrl('/user/feed')
        }
        else{
          errorMessage.innerHTML = res.msg
        }

      })
    }
  }


}









