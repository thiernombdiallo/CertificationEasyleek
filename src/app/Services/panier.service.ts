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
  // postToPanier(produit: any, quantite = 0) {
  //   let produitPanier = {};
  //   if (localStorage.getItem('panier') == null || localStorage.getItem('panier') == undefined) {
  //     if (quantite != 0) {

  //       produitPanier = {
  //         produit: produit,
  //         quantitePanier: quantite
  //       }
  //     } else {

  //       produitPanier = {
  //         produit: produit,
  //         quantitePanier: 1
  //       }
  //     }
  //     localStorage.setItem('panier', JSON.stringify([produitPanier]));
  //     this.message("parfait", "success", "produit ajouté au panier");
  //   } else {
  //     let panier = JSON.parse(localStorage.getItem('panier') ?? '[]');
  //     let a = panier.filter((item: any) => item.produit.id == produit.id);
  //     // console.log(a.length);
  //     if (a.length > 0) {

  //       this.message("oops", "warning", "Ce produit existe déja dans le panier");
  //     } else {
  //       if (quantite != 0) {

  //         produitPanier = {
  //           produit: produit,
  //           quantitePanier: quantite
  //         }
  //       } else {

  //         produitPanier = {
  //           produit: produit,
  //           quantitePanier: 1
  //         }
  //       }

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
  

