import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  admi = false;
  constructor(
    private router: Router,
    private menu: MenuController,private auth:AngularFireAuth,
    public alertController: AlertController) { 
    }

  ngOnInit() {
  }

  toggleMenu() {
    this.menu.toggle();
  }
  toLogin(){
    this.router.navigateByUrl("/login");
  }
  onLogout(){
    if(this.auth.signOut()){
      this.router.navigateByUrl("/login");
      this.admi=false;
    }else{
      console.log('no se sale');
    }
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modo Avanzado',
      inputs: [
        {
          name: 'Contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        },
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            
            console.log('Confirm Ok');
            if(alertData="root"){
              console.log("si entra");
              this.admi=true;
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
