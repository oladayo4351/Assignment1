import { Injectable } from '@angular/core';
import { User } from '../models/user.model.client';
import { map } from 'rxjs/operators'
import {Http, Response, RequestOptions} from '@angular/http';
import { environment } from '../../environments/environment';
import {Router } from '@angular/router';
import { SharedService } from '../services/shared.service.client'

@Injectable()
export class UserService {
  constructor(private http: Http, private sharedService: SharedService, private router: Router) { }

 baseUrl = environment.baseUrl;

   options: RequestOptions = new RequestOptions();

users = [
        {_id: "123", username: "alice", password: "alice", Name: "Alice Wonder", email: "alice@gmail.com"},
        {_id: "234", username: "bob", password: "bob", Name: "Bob Marley", email: "bob@whatever.com"},
        {_id: "345", username: "charly", password: "charly", Name: "Charly Garcia", email: "charly@hotmail.com"},
        {_id: "456", username: "shiyu", password: "shiyu", Name: "Shiyu Wang", email: "swang@ulem.org"}
        ];


  // createUser(user: any) {
  //   user._id = Math.random();
  //   this.users.push(user);
  //   return user;

  // }

  loggedIn() {
 this.options.withCredentials = true;
 return this.http.post(this.baseUrl + '/api/loggedIn', '', this.options).pipe(map(
     (res: Response) => {
       const user = res.json();
       if (user !== 0) {
         this.sharedService.user = user; // setting user so as to share with all components
         return true;
       } else {
         this.router.navigate(['/login']);
         return false;

       }

     }
   ));

 
 

}


  login(username: String, password: String) {
 this.options.withCredentials = true; // jga
 const body = {
   username : username,
   password : password
 };

 return this.http.post(this.baseUrl + '/api/login', body, this.options).pipe(map(
     (res: Response) => {
       return res.json();
     }
   ));
}

  findUserByCredentials(username: string, password: string) { 
      const url = this.baseUrl +'/api/user?username='+ username + '&password=' + password
      return this.http.get(url).pipe(map(
        (response: Response) =>{
          return response
        }
        ))
      }
      
 register(username: String, password: String) {
 this.options.withCredentials = true;
 const user = {
   username : username,
   password : password
 };
 return this.http.post(this.baseUrl + '/api/register', user, this.options).pipe(map(
     (res: Response) => {
       const data = res.json();
       return data;
     }
   ));

    }
createUser(user: User) {
    const url = this.baseUrl + '/api/user';
    return this.http.post(url, user).pipe(map(
      (response: Response) => {
        return response.json();
      }

      ))
  }

findUserById(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get(url).pipe(map(
      (response: Response) => {
      return response.json() }
       ))

  }

  findUserByUsername(username: string) {
    const url = this.baseUrl + '/api/user?username='+username;
    return this.http.get(url).pipe(map(
      (response: Response) => {
      return response.json() }
       ))

  } 

  }


  // findUserById(userId: string) {
  //   for (let x = 0; x < this.users.length; x++) {
  //     if (this.users[x]._id === userId) {  return this.users[x]; }
  //   }
  // }


  // findUserByUsername(username: string) { … }
  // findUserByCredentials(username: string, password: string) { … }
  // updateUser(userId, user) { … }
  // deleteUser(userId) { … }

