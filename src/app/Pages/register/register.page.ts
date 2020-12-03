import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    constructor(
      private router: Router,
      private fb: FormBuilder, private auth:AngularFireAuth
    ) /*private menu: MenuController*/ {
      // this.menu.enable(false,"first");
    }

    ngOnInit() {
      this.registerForm = this.fb.group({
        email: new FormControl("", Validators.required),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      });
    }
  
  goHome(){
    this.router.navigateByUrl('/home');

  }

  createUser(){
    const {email,password} = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email,password).then(user =>{

      console.log('RegisterComponent -> createUser ->user',user);
      this.router.navigateByUrl('/home');
    });
  }

}
