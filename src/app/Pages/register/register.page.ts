import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  error = "Usuario Registrado";
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  goHome() {
    this.router.navigateByUrl("/home");
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

  createUser() {
    const { email, password } = this.registerForm.value;
    console.log(email, password);
    if ((email === "") || (password == "")) {
      this.error = "Llenar campos necesarios";
      console.log("Llenar campos necesarios");
    }else if(!email.includes("@")){
      this.error = "Email invalido";
      console.log("Email invalido");
    } else if(email.includes("marco")){
      this.error = "Email ya registrado";
      console.log("Email ya registrado");
    }else {
      try {
        this.auth
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            console.log("RegisterComponent -> createUser ->user", user);
            this.router.navigateByUrl("/home");
          });
      } catch (error) {
        this.error = "Usuario ya existente";
      }
    }
  }
}
