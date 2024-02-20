import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestoRoutingModule } from './resto.routing';
import { DasboardRestoComponent } from 'src/app/Module/dasboard-resto/dasboard-resto.component';
import { MenuComponent } from '../menu/menu.component';
import { AjouteplatComponent } from '../ajouteplat/ajouteplat.component';
import { CommandeComponent } from '../commande/commande.component';
import { CommentaireComponent } from '../commentaire/commentaire.component';

@NgModule({
  declarations: [
    // DasboardRestoComponent,
    // MenuComponent,
    // AjouteplatComponent,
    // CommandeComponent,
    // CommentaireComponent,
  ],
  imports: [CommonModule, RestoRoutingModule],
})
export class RestoModule { }
