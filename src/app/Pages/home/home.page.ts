import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private menu: MenuController) { 
    }

  ngOnInit() {
    this.menu.enable(true, "first");
  }

  toggleMenu() {
    this.menu.toggle();
  }
  addReport(){
    this.router.navigateByUrl('/add-report');
  }

}
