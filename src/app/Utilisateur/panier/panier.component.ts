import { Component } from '@angular/core';
import { PanierService } from 'src/app/Services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  constructor(private panierService: PanierService) {}


  // panier.component.ts
get panier(): any[] {
  return this.panierService.getPanier();
}

diminuerQuantite(plat: any) {
  this.panierService.diminuerQuantite(plat);
}

augmenterQuantite(plat: any) {
  this.panierService.augmenterQuantite(plat);
}
supprimerDuPanier(plat: any) {
  this.panierService.supprimerDuPanier(plat);
}
}
