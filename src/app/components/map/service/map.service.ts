import { Injectable } from '@angular/core';
import { Category } from 'src/app/Models/category.model';
import { GeoJson } from 'src/app/Models/mapJson.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  markers: GeoJson[];
  categories: Category[];
  constructor() { }

  public getCategories(): Category[] {
    this.categories = new Array<Category>();
    this.categories.push({ id: "aaa1", name: "Bache", color: "#E02828", iconName: "close-circle" });
    this.categories.push({ id: "bbb2", name: "Alcantarilla Abierta", color: "#3E7CEE", iconName: "water" });
    this.categories.push({ id: "ccc3", name: "Poste de Luz", color: "#EED53E", iconName: "flash"});
    return this.categories;
  }

  public getMarkers(): GeoJson[]{
    this.getCategories();
    this.markers = new Array<GeoJson>();
    this.markers.push(new GeoJson("0000-1111-2222-3333",[-109.9312972, 27.4597014], this.categories[0]));
    this.markers.push(new GeoJson("0000-2222-3333-4444",[-109.929409, 27.4497619], this.categories[1]));
    this.markers.push(new GeoJson("0000-3333-4444-5555",[-109.9422836, 27.4653752], this.categories[2]));
    return this.markers;
  }
}
