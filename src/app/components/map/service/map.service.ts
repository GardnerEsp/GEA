import { Injectable } from '@angular/core';
import { Category } from 'src/app/Models/category.model';
import { GeoJson } from 'src/app/Models/mapJson.model';
import { Guid } from "guid-typescript";
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  markers: GeoJson[];
  markerinmapList: AngularFireList<any>;
  categories: Category[];
  
  constructor(
    private firebase: AngularFireDatabase
  ) {
    this.categories = new Array<Category>();
    this.markers = new Array<GeoJson>();
    this.uploadInfo();
   }

   getMarkerinmap(){
    return this.markerinmapList = this.firebase.list('id')
  }

  insertMarkerinmap(markerinmap: GeoJson){
    this.markerinmapList.push({
      id: markerinmap.id,
      latitude: markerinmap.geometry.coordinates[0],
      longuitude: markerinmap.geometry.coordinates[1],
      category: markerinmap.properties,
      date: markerinmap.date
    });
   }

   updateMarkerinmap(markerinmap: GeoJson){
    this.markerinmapList.update(markerinmap.id,{
      id: markerinmap.id,
      latitude: markerinmap.geometry.coordinates[0],
      longuitude: markerinmap.geometry.coordinates[1],
      category: markerinmap.properties,
      date: markerinmap.date
    });
   }

   deleteMarkerinmap(id: string){
    this.markerinmapList.remove(id);
   }

  private uploadInfo(){
    this.getCategories();
    this.markers.push(new GeoJson("0000-1111-2222-3333", new Date(), [-109.9312972, 27.4597014], this.categories[0]));
    this.markers.push(new GeoJson("0000-2222-3333-4444", new Date(), [-109.929409, 27.4497619], this.categories[1]));
    this.markers.push(new GeoJson("0000-3333-4444-5555", new Date(), [-109.9422836, 27.4653752], this.categories[2]));
    
  }

  public getCategories(): Category[] {
    this.categories.push({ id: "aaa1", name: "Bache", color: "#E02828", iconName: "close-circle" });
    this.categories.push({ id: "bbb2", name: "Alcantarilla Abierta", color: "#3E7CEE", iconName: "water" });
    this.categories.push({ id: "ccc3", name: "Poste de Luz", color: "#EED53E", iconName: "flash"});
    return this.categories;
  }

  public getCategoryById(categoryId: string): Category{
    for(let i = 0; i < this.categories.length; i++){
      if(this.categories[i].id == categoryId){
        return this.categories[i];
      }
    }
    return null;
  }

  public getMarkers(): GeoJson[]{
    return this.markers;
  }


}
