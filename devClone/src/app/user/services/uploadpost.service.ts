import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserComponent } from '../user.component';

@Injectable({
  providedIn: 'root'
})
export class UploadpostService {

  constructor(private http : HttpClient) { }

  baseUrl = 'http://127.0.0.1:8000/'

  uploadPost(formdata: any): Observable<any> {
    return this.http.post(this.baseUrl + 'user/post',formdata)
  }

  viewPost(username:string): Observable<any>{
    return this.http.get(this.baseUrl + 'user/get_post')
  }

  getProfilePicture(id:any) : Observable<any>{
    return this.http.post(this.baseUrl + 'user/get_profile_picture/'+id ,id)
  }

  getProfileDetails(id:any) :Observable<any>{
    return this.http.get(this.baseUrl + 'user/profile/'+id,id)
  }

  addComment(id:any): Observable<any>{
    return this.http.post(this.baseUrl+'user/addcomment',id)
  }

  searchProfile(searchKey:any): Observable<any>{
    return this.http.get(this.baseUrl + 'user/search/'+ searchKey,searchKey)
  }

  likePost(userId: any, postId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const requestData = {
      userId: userId,
      postId: postId,
    };

    return this.http.post(this.baseUrl + 'user/likepost/' + userId + '/' + postId, requestData, { headers: headers });
  }

  follow(following: any):Observable<any>{
    return this.http.post(this.baseUrl + 'user/follow',following)
  }

  
}