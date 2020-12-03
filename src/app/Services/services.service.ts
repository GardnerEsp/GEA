import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import { MarkerInMap } from 'src/app/Models/marker.model'
import { Category } from 'src/app/Models/category.model';
import { GeoJson, FeatureCollection } from '../Models/mapJson.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  markers: GeoJson[];
  categories: Category[];
  markersInDatabase: any[];

  constructor() {
    // Asignamos el token desde las variables de entorno
    this.markersInDatabase = new Array<any>();
    this.categories = new Array<Category>();
    this.markers = new Array<GeoJson>();
    this.getCategories();
  }

  private getCategories() {
    this.categories.push({ id: "aaa1", name: "Bache", color: "#E02828" });
    this.categories.push({ id: "bbb2", name: "Coladera", color: "#3E7CEE" });
    this.categories.push({ id: "ccc3", name: "Poste de Luz", color: "#EED53E" });
  }

  public getMarkers(): GeoJson[]{
    this.markers.push(new GeoJson("0000-1111-2222-3333",[-109.9312972, 27.4597014], this.categories[0]));
    this.markers.push(new GeoJson("0000-2222-3333-4444",[-109.929409, 27.4497619], this.categories[1]));
    this.markers.push(new GeoJson("0000-3333-4444-5555",[-109.9422836, 27.4653752], this.categories[2]));
    return this.markers;
  }
}

