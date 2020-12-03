import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPageModule } from './login.module';

import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {

  error = "Exito";
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth:AngularFireAuth,
    public alertController: AlertController
  )  {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "",
      header: "Alerta",
      subHeader: this.error,
      message: "",
      buttons: ["OK"],
    });

    await alert.present();
  }

  onLogin() {
    const {email,password} = this.loginForm.value;
    if ((email === "") || (password == "")) {
      this.error = "Llenar campos necesarios";
      console.log("Llenar campos necesarios");
    }else if(!email.includes("@")){
      this.error = "Email invalido";
      console.log("Email invalido");
    } else {
    this.auth.signInWithEmailAndPassword(email.trim(),password).then((user) => {
      this.error = "Exito";
      this.router.navigateByUrl("/home");
      
    }).catch(function(error) {
    // Handle Errors here.
    if(error.message.includes("The password is invalid or")){
      this.error = "Contra incorrecta";
    }
    if(error.message.includes("corresponding to this identifier")){
      this.error = "No existe Usuario";

    }
  });

  }}
}
