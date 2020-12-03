export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IGeoJson {
    type: string;
    id: string;
    date: Date;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;
  id: string;
  date: Date;

  constructor(id, date: Date, coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
    this.id = id;
    this.date = date;
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) {}
}