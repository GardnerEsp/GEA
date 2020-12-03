import { Category } from './category.model';

export interface MarkerInMap{
    id: string
    date: Date
    latitude: number
    longuitude: number
    category: Category
}