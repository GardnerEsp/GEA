import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import { environment } from '@env/environment';
import { GeoJson, FeatureCollection } from '../../Models/mapJson.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  intervale: any;
  markers: any;

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = 43.1746;
  lng = -2.4125;
  zoom = 15;

  constructor(
    private mapService: ServicesService,
    private router: Router,
    private menu: MenuController) { }

  ngOnInit() {
    this.ionViewDidEnter();
    this.menu.enable(true, "first");
  }

  ionViewDidEnter() {
    this.buildMap();
    this.intervale = setTimeout(() => {
      this.uploadMarkersToMap();
    }, 1000);
  }

  buildMap() {
    this.mapbox.accessToken = environment.mapBoxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [-109.9459475, 27.5432134],
      zoom: 12,
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.resize();
  }

  toggleMenu() {
    this.menu.toggle();
  }

  private uploadMarkersToMap(): void {
    this.mapService.getMarkers().forEach((marker, index) => {
        const markerIcon = this.createMarkerMapIcon(marker);
        markerIcon.addEventListener('click', () => {
          this.map.flyTo({
            zoom: 12.5,
            center: marker.geometry.coordinates as LngLatLike
          });
        });
        
        new mapboxgl.Marker(markerIcon)
          .setLngLat( marker.geometry.coordinates as LngLatLike)
          .addTo(this.map);
    });
  }

  createMarkerMapIcon(marker): HTMLElement {
    let markerIcon = document.createElement('ion-icon');
    markerIcon.name = "pin-sharp"
    markerIcon.style.fontSize = "40px";
    markerIcon.style.color = marker.properties.color;
    return markerIcon;
  }

}
