import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { UserService } from '../../services/user.service.client'
import { User } from '../../models/user.model.client'
import {Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service.client'
import { SharedService} from "../../services/shared.service.client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
@ViewChild('f') loginForm: NgForm;

username: string;
password: string;
errorFlag: boolean;
errorMsg = 'Invaild username or password!';


  constructor(private sharedService: SharedService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router, ) { }

  ngOnInit() {

  }

  login(){

 	this.username = this.loginForm.value.username;
 	this.password = this.loginForm.value.password;
 this.userService.login(this.username, this.password).subscribe(
 	(data: any) =>{
 		console.log("hello")
 		this.sharedService.user = data;
 		console.log(this.sharedService.user)
 		this.router.navigate(['']);
 	}) 


}
}
