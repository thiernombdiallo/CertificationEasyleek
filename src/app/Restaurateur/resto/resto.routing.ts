// restaurateur-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardRestoComponent } from 'src/app/Module/dasboard-resto/dasboard-resto.component';
import { MenuComponent } from '../menu/menu.component';
import { AjouteplatComponent } from '../ajouteplat/ajouteplat.component';
import { CommandeComponent } from '../commande/commande.component';
import { CommentaireComponent } from '../commentaire/commentaire.component';


const routes: Routes = [
  { path: 'dashboardResto', component: DasboardRestoComponent },
  { path: 'menuResto', component: MenuComponent },
  { path: 'gestionPlat', component: AjouteplatComponent },
  { path: 'commandeResto', component: CommandeComponent },
  { path: 'commentairesResto', component: CommentaireComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestoRoutingModule {}
