import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import { MapService } from './service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  markers: any;

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = 43.1746;
  lng = -2.4125;
  zoom = 15;

  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit() {
    setTimeout(() => this.buildMap(), 200);
    setTimeout(() => this.uploadMarkersToMap(), 250);
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

  private uploadMarkersToMap(): void {
    this.mapService.getMarkers().forEach((marker) => {
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
        this.getAddressFromMapboxCoordinates(marker.geometry.coordinates+"");
        
    });
  }

  async getAddressFromMapboxCoordinates(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const response = await fetch(
      url + query + '.json?types=address&access_token=' + environment.mapBoxToken
    );
    const data = await response.json();
    return data.features[0].place_name.toString();
  }

  createMarkerMapIcon(marker): HTMLElement {
    let markerIcon = document.createElement('ion-icon');
    markerIcon.name = marker.properties.iconName;
    markerIcon.style.fontSize = "4.5vh";
    markerIcon.style.color = marker.properties.color;
    markerIcon.style.stroke = "black";
    markerIcon.style.strokeWidth = "6";
    return markerIcon;
  }

}