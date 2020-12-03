import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    MenuComponent,
    MapComponent
  ],
  exports:[
    MenuComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
