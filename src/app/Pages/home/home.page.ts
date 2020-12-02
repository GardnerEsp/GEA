import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { MapComponent } from '../../components/map/map.component';



import * as mapboxgl from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import { environment } from '@env/environment';
import { GeoJson, FeatureCollection } from '../../Models/mapJson.model';
import { ServicesService } from 'src/app/Services/services.service';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(
    private router: Router,
    private menu: MenuController,
    private mapService: ServicesService,
    private mapaC:MapComponent) { 
    }

  ngOnInit() {
    this.mapaC.ionViewDidEnter();
    this.menu.enable(true, "first");
  }

  toggleMenu() {
    this.menu.toggle();
  }
  addReport(){
    this.router.navigateByUrl('/add-report');
  }



  
  
}
