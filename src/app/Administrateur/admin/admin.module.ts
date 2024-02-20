import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilAdminComponent } from '../accueil-admin/accueil-admin.component';
import { MessageComponent } from '../message/message.component';
import { CategorieComponent } from '../categorie/categorie.component';
import { RestaurateurComponent } from '../restaurateur/restaurateur.component';
import { ClientComponent } from '../client/client.component';
import { AdminRoutingModule } from './admin.routing';


@NgModule({
  declarations: [
    AccueilAdminComponent,
    MessageComponent,
    CategorieComponent,
    RestaurateurComponent,
    ClientComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
