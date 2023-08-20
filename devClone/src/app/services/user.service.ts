import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private username: any;
  private results:any
  baseUrl = 'http://127.0.0.1:8000/'
  constructor(private http: HttpClient) { }


  userSignup(signUpForm: any): Observable<any> {
    return this.http.post(this.baseUrl + 'user/signup',signUpForm)
  }
  addToEmailList(emailForm : any): Observable<any>{
    return this.http.post(this.baseUrl + 'user/email_list', emailForm)
  }

  likePost(userId:any, postId :any): Observable<any>{
    return this.http.post(this.baseUrl + "likepost",userId , postId)
  }

  sendUsernameToProfile(username:string){
    this.username = username
  }
  getUsername(){ 
    return this.username;
  }

  searchResults(results:any){
    this.results = results
  }

  sendSearchResults(){
    
    return this.results
  }

  deletePost(id:number){
    return this.http.post(this.baseUrl + 'user/delete_post', id)
  }
  follow(follower: any, following: any): Observable<any> {
    const requestData = { follower, following };
    return this.http.post(`${this.baseUrl}user/follow`, requestData);
  }

   
}
