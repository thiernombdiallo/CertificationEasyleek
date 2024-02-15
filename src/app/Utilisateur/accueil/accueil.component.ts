import { Component } from '@angular/core';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  categories: any[] = [];
  restaurants: any[] = [];

constructor(private categorieService: CategorieService ,private restaurantService:AjoutRestaurateurService) {}

ngOnInit() {
  this.getAllCategories();
  this.getListeRestaurateurs()
  console.log("c'est le reponse du fou",this.getListeRestaurateurs)

}

getListeRestaurateurs() {
  this.restaurantService.getListeRestaurateursPourtous().subscribe((response: any) => {
    console.log("Regarder", response)
    this.restaurants = response.data;
  });
}

getAllCategories() {
  this.categorieService.getAllCategories().subscribe((response: any) => {
    console.log("voir liste", response.data)
    this.categories = response.data;
  });
}
}
