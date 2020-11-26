import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ServicesService } from '../../Services/services.service';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit  {

  intervale:any;
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  constructor(private mapService:ServicesService, 
              private router:Router,
              private menu:MenuController) {
              }
  
  ngOnInit() {
    this.ionViewDidEnter();
    this.menu.enable(true,"first");

  }
  
  ionViewDidEnter() {
    this.mapService.buildMap();
    this.intervale = setTimeout(() => {
      this.uploadMarkersToMap();
    }, 1500);
  }

  
  toggleMenu(){
    this.menu.toggle();
  }
  createMarkerMapIcon(marker): HTMLElement {
    let markerIcon = document.createElement('i');
    markerIcon.style.fontSize = "401px";
    markerIcon.style.color = marker.geometry.marker.category.color;
    markerIcon.className = 'fas fa-map-marker-alt';   
    return markerIcon;
  }

  private uploadMarkersToMap(): void {
    this.mapService.getGeoJsonMarkers().features.forEach((marker, index) => {
      if(index > 0){
        const markerIcon = this.createMarkerMapIcon(marker);
        markerIcon.addEventListener('click', () => {
          this.map.flyTo({
            zoom: 12.5,
            center: [
              marker.geometry.marker.latitude,
              marker.geometry.marker.longitude] as LngLatLike
          });
        });
        new mapboxgl.Marker(markerIcon)
          .setLngLat([
            marker.geometry.marker.latitude,
            marker.geometry.marker.longitude] as LngLatLike)
          .addTo(this.map);
      }
    });
  }
  
}
