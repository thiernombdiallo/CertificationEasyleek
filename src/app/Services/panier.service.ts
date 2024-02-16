import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor() { this.chargerPanier(); }

  private panier: any[] = [];

  ajouterAuPanier(plat: any) {
    console.log( "je suis ce que je suis ", plat)
    this.panier.push(plat);
  }

  getPanier(): any[] {
    return this.panier;
  }

  private sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(this.panier));
  }

  private chargerPanier() {
    const panierString = localStorage.getItem('panier');
    if (panierString) {
      this.panier = JSON.parse(panierString);
    }
  }

  diminuerQuantite(plat: any) {
    const index = this.panier.findIndex((item) => item.id === plat.id);

    if (index !== -1) {
      if (this.panier[index].quantite > 1) {
        this.panier[index].quantite--;
        this.sauvegarderPanier();
      } else {
        this.supprimerDuPanier(plat);
      }
    }
  }

  augmenterQuantite(plat: any) {
    const index = this.panier.findIndex((item) => item.id === plat.id);

    if (index !== -1) {
      this.panier[index].quantite++;
      this.sauvegarderPanier();
    }
  }

  supprimerDuPanier(plat: any) {
    this.panier = this.panier.filter((item) => item.id !== plat.id);
    this.sauvegarderPanier();
  }

}
  

