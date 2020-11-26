import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { MarkerInMap } from 'src/app/models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  markersInDatabase: MarkerInMap[];
  categories: Category[];

  constructor() { 
    this.markersInDatabase = new Array<MarkerInMap>();
    this.categories = new Array<Category>();
    this.getCategories();
    this.getMarkers();
  }

  private getCategories(){
    this.categories.push({id: "aaa1", name: "Bache", color: "#E02828"});
    this.categories.push({id: "bbb2", name: "Coladera", color: "#3E7CEE"});
    this.categories.push({id: "ccc3", name: "Poste de Luz", color: "#EED53E"});
  }

  private getMarkers(){
    this.markersInDatabase.push({id: "001", latitude: -109.9312972, longitude: 27.4597014, category: this.categories[0]});
    this.markersInDatabase.push({id: "002", latitude: -109.929409, longitude: 27.4497619, category: this.categories[1]});
    this.markersInDatabase.push({id: "003", latitude: -109.9422836, longitude: 27.4653752, category: this.categories[2]});
  }

  public getGeoJsonMarkers(): any {
    const modelMarker = ({id:'', latitude:0, longitude:0, category: null});
    var geojsonMarkers = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
          },
          'geometry': {
            'type': 'Point',
            'marker': modelMarker
          }
        }
      ]
    };
    this.markersInDatabase.forEach((marker) =>{
      geojsonMarkers.features.push({
        'type': 'Feature',
        'properties': {
        },
        'geometry': {
          'type': 'Point',
          'marker': marker
        }
      });
    });
    return geojsonMarkers;
  }
}