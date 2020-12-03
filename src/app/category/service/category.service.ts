import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Category } from 'src/app/Models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryList: AngularFireList<any>;
  selectCategory: Category;
  constructor(private firebase: AngularFireDatabase) { }
  getCategory(){
    return this.categoryList = this.firebase.list('category')
  }
  insertCategory(category: Category){
   this.categoryList.push({
    id: category.id,
    nombre: category.name,
    color: category.color,
    nicon: category.iconName
   });
  }
  updateCategory(category: Category){
    this.categoryList.update(category.id,{
     id: category.id,
     nombre: category.name,
     color: category.color,
     nicon: category.iconName

    });
   }

   deleteCategory(id: string){
    this.categoryList.remove(id);
   }
}
