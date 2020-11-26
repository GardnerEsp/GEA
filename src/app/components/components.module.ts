import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    MapComponent,
    MenuComponent
  ],
  exports:[
    MapComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
