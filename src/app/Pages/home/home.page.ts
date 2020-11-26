import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit  {

  constructor(private map:ServicesService, 
              private router:Router,
              private menu:MenuController) {
                
              }
  
  ngOnInit() {
    this.ionViewDidEnter();
    this.menu.enable(true,"first");

  }
  
  ionViewDidEnter() {
    this.map.buildMap();
  }

  goLogin(){
    this.router.navigateByUrl('/login');
  }
  toggleMenu(){
    this.menu.toggle();
  }
}
