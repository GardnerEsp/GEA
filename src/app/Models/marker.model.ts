import { Category } from './category.model';

export interface MarkerInMap{
    id: string,
    latitude: number,
    longitude: number,
    category: Category
}