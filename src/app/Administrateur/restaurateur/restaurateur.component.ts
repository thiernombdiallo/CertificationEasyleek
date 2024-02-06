import { Component, OnInit } from '@angular/core';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { apiUrl } from 'src/app/Services/apiUrl';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-ajout-restaurateur',
  templateUrl: './restaurateur.component.html',
  styleUrls: ['./restaurateur.component.css'],
})
export class RestaurateurComponent implements OnInit {
  restaurateurs: any[] = [];
  detailrestaurateur: any = {};
  categories: any;
  users: any;
  restaurantApimage = apiUrl;
 
    name : string = '';
    adresse: string = '';
    email: string ='';
    phone: string = '';
    password:string= '';
    categories_id: string= '';
    image:string= '';
  

  categorieTypes: string[] = [];

  constructor(private ajoutRestaurateurService: AjoutRestaurateurService , private categorieService :CategorieService) {}

  ngOnInit(): void {
    this.getListeRestaurateurs();
    this.getAllCategories();
  }
  
  getListeRestaurateurs() {
    this.ajoutRestaurateurService.getListeRestaurateurs().subscribe((response: any) => {
      console.log("Regarder", response)
      this.restaurateurs = response.data;
    });
  }
  getImageUrl(imageName: string): string {
    if (imageName) {
      return `${this. restaurantApimage}/public/images/${imageName}`;
    } else {
      return `${this. restaurantApimage}/public/images/${imageName}`;
    }
  }
  
  getAllCategories() {
    this.categorieService.getAllCategories().subscribe(
      (categories: any) => {
        this.categories = categories.data;
        console.log( 'revoire ok',categories.data)
        this.categorieTypes = categories.map((categorie: any) => categorie.type);
        console.log(categories.type)
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des catégories :",
          error
        );
      }
    );
  }
  ajouterRestaurant() {
    const data = {
      name: this.name,
      email: this.email,
      adresse: this.adresse,
      phone: this.phone,
      password: this.password,
      categorie:this.categories_id
    };
  
    this.ajoutRestaurateurService.ajouterRestaurateur(data.name, data.email, data.adresse , data.phone, data.password ,data.categorie).subscribe(
      (response) => {
        console.log('Réponse d\'inscription:', response);
        this.restaurateurs = response.data;
        this.getListeRestaurateurs();
        document.getElementById("close-modal")?.click();
      },
    );
    }
    desactiverRestaurant(){}
    getDetailsRestaurant(){}
}
