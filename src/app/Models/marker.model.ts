import { Category } from './category.model';

export interface MarkerInMap{
    id: string
    date: Date
    latitude: number
    longitude: number
    category: Category
}