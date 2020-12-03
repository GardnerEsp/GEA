import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) /*private menu: MenuController*/ {
    // this.menu.enable(false,"first");
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }

  map() {
    this.router.navigateByUrl("/home");

    //this.menu.enable(true,"first");
  }
 
}
