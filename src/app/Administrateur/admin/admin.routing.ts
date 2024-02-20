import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilAdminComponent } from '../accueil-admin/accueil-admin.component';
import { MessageComponent } from '../message/message.component';
import { CategorieComponent } from '../categorie/categorie.component';
import { RestaurateurComponent } from '../restaurateur/restaurateur.component';
import { ClientComponent } from '../client/client.component';


const routes: Routes = [
  { path: 'adminSysteme', component: AccueilAdminComponent },
  { path: 'adminMessage', component: MessageComponent },
  { path: 'adminCategorie', component: CategorieComponent },
  { path: 'adminRestaurant', component: RestaurateurComponent },
  { path: 'adminClient', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
