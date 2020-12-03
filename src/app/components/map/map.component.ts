import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import { Category } from 'src/app/Models/category.model';
import { GeoJson } from 'src/app/Models/mapJson.model';
import { MapService } from './service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  markers: any;
  showAddReport: boolean;
  showReportInfo: boolean;
  disabledButton: boolean;
  actualAddress: string;
  userMarkerReport: mapboxgl.Marker;
  userCoordinates: number[];
  userCategory: Category;
  categories: Category[];
  currentMarker: GeoJson;

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = 43.1746;
  lng = -2.4125;
  zoom = 15;

  constructor(
    private mapService: MapService,
  ) {
    this.showAddReport = false;
    this.showReportInfo = false;
    this.disabledButton = true;
    this.actualAddress = "";
    this.categories = new Array<Category>();
   }

  ngOnInit() {
    setTimeout(() => this.buildMap(), 300);
    setTimeout(() => this.uploadMarkersToMap(), 310);
    this.categories = this.mapService.categories;
  }

  clearReport(){

  }

  closeReport(){
    this.showAddReport = false;
    this.showReportInfo = false;
    this.userMarkerReport.remove();
    this.disabledButton = true;
  }

  addCategory(categoryId: string){
    this.userCategory = this.mapService.getCategoryById(categoryId);
    this.disabledButton = false;
  }

  addReport(){
    this.mapService.addMarker(this.userCoordinates, this.userCategory);
    this.uploadMarkersToMap();
    this.closeReport();
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

    this.map.on('click', (e) =>{
      this.map.flyTo({
        zoom: 15,
        center: e.lngLat as LngLatLike
      });

      const longitudeClick = e.lngLat.lng;
      const latitudeClick = e.lngLat.lat;
      
      if(this.userMarkerReport != undefined){
        this.userMarkerReport.remove();
      }

      let markerIcon = document.createElement('ion-icon');
      markerIcon.name = "locate";
      markerIcon.style.fontSize = "40px";
      markerIcon.style.color = "black";
      
      this.userMarkerReport = new mapboxgl.Marker(markerIcon)
        .setLngLat([longitudeClick, latitudeClick] as LngLatLike)
        .addTo(this.map);
      this.userCoordinates = [longitudeClick, latitudeClick];
      this.getAddressFromMapboxCoordinates([longitudeClick, latitudeClick] as LngLatLike + "");
      this.showAddReport = true;
    });
  }

  private uploadMarkersToMap(): void {
    this.mapService.getMarkers().forEach((marker) => {
        const markerIcon = this.createMarkerMapIcon(marker);
        markerIcon.addEventListener('click', () => {
          this.map.flyTo({
            zoom: 12.5,
            center: marker.geometry.coordinates as LngLatLike
          });
          this.currentMarker = marker;
          this.showReportInfo = true;
        });
        new mapboxgl.Marker(markerIcon)
          .setLngLat(marker.geometry.coordinates as LngLatLike)
          .addTo(this.map);

        markerIcon.addEventListener('mouseover', () => {
          markerIcon.style.cursor = 'pointer';
        });
    });
  }

  async getAddressFromMapboxCoordinates(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const response = await fetch(
      url + query + '.json?types=address&access_token=' + environment.mapBoxToken
    );
    const data = await response.json();
    this.actualAddress = data.features[0].place_name.toString();
  }

  createMarkerMapIcon(marker): HTMLElement {
    let markerIcon = document.createElement('ion-icon');
    markerIcon.name = marker.properties.iconName;
    markerIcon.style.fontSize = "20px";
    markerIcon.style.color = marker.properties.color;
    markerIcon.style.stroke = "black";
    markerIcon.style.strokeWidth = "6";
    return markerIcon;
  }

}