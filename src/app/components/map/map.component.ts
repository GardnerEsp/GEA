import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import { Category } from 'src/app/Models/category.model';
import { GeoJson } from 'src/app/Models/mapJson.model';
import { MarkerInMap } from 'src/app/Models/marker.model';
import { MapService } from './service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  markers: MarkerInMap[];
  showAddReport: boolean;
  showReportInfo: boolean;
  disabledButton: boolean;
  actualAddress: string;
  userMarkerReport: mapboxgl.Marker;
  userCoordinates: number[];
  userCategory: Category;
  categories: Category[];
  currentMarker: MarkerInMap;

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
    this.markers = new Array<MarkerInMap>();
  }

  ngOnInit() {
    setTimeout(() => this.buildMap(), 300);
    setTimeout(() => this.uploadMarkersToMap(), 410);
    setTimeout(() => this.map.resize(), 415);
    this.categories = this.mapService.categories;
  }

  clearReport() {
    this.mapService.deleteMarkerinmap(this.currentMarker.id);
    this.uploadMarkersToMap();
    this.closeReport();
  }

  closeReport() {
    this.showAddReport = false;
    this.showReportInfo = false;
    this.userMarkerReport.remove();
    this.disabledButton = true;
  }

  addCategory(categoryId: string) {
    this.userCategory = this.mapService.getCategoryById(categoryId);
    this.disabledButton = false;
  }

  addReport() {
    this.mapService.insertMarkerinmap(this.userCoordinates, this.userCategory);
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

    this.map.on('click', (e) => {
      this.map.flyTo({
        zoom: 15,
        center: e.lngLat as LngLatLike
      });

      const longitudeClick = e.lngLat.lng;
      const latitudeClick = e.lngLat.lat;

      if (this.userMarkerReport != undefined) {
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
    this.mapService.getMarkerinmap()
      .snapshotChanges()
      .subscribe(item => {
        item.forEach(element => {
          let x = JSON.parse(JSON.stringify(element.payload));
          x["id"] = element.key;
          this.markers.push(x as MarkerInMap);
          this.uploadMarkerToMap(x as MarkerInMap)
        });
      });
  }

  private uploadMarkerToMap(marker: MarkerInMap) {
    const markerIcon = this.createMarkerMapIcon(marker);
    markerIcon.addEventListener('click', () => {
      this.map.flyTo({
        zoom: 12.5,
        center: [marker.latitude, marker.longuitude] as LngLatLike
      });
      this.currentMarker = marker;
      this.showReportInfo = true;
    });
    new mapboxgl.Marker(markerIcon)
        .setLngLat([marker.latitude, marker.longuitude] as LngLatLike)
        .addTo(this.map);

      markerIcon.addEventListener('mouseover', () => {
        markerIcon.style.cursor = 'pointer';
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
    markerIcon.name = marker.category.iconName;
    markerIcon.style.fontSize = "20px";
    markerIcon.style.color = marker.category.color;
    markerIcon.style.stroke = "black";
    markerIcon.style.strokeWidth = "6";
    return markerIcon;
  }

}