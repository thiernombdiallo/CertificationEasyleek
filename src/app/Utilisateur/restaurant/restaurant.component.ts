import { Component } from '@angular/core';
import { Restaurant } from 'src/app/Model/restaurant/restaurant.model';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {

  constructor(private categorieService: CategorieService ,private restaurantService:AjoutRestaurateurService) {}

  ngOnInit() {
    this.getAllCategories();
    this.getAllRestaurants()
  
  }
// Tableau restaurant
restaurants: any[] = []; 
categories :any [] =[];
categorie_id:string="";

// Attribut pour faire les recherche
// searchRestaurant = '';
// itemSearchs: any;


// Propriétés de pagination
// itemsPerPage: number = 6;
// currentPage: number = 1;

  //methode pour gerer la pagination
  // get paginatedRestaurant(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   return this.itemSearchs ? this.itemSearchs.slice(startIndex, endIndex) : this.restaurants.slice(startIndex, endIndex);
  // }

  // methodes qui gerent les page pour la pagination

  // changePage(page: number): void {
  //   if (page >= 1 && page <= this.getTotalPages()) {
  //     this.currentPage = page;
  //   }
  // }

  // getTotalPages(): number {
  //   return Math.ceil((this.itemSearchs ? this.itemSearchs.length : this.restaurants.length) / this.itemsPerPage);
  // }

  // getPages(): number[] {
  //   return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  // }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((response: any) => {
      console.log("voir liste", response.data)
      this.categories = response.data;
    });
  }

  getAllRestaurants() {
    this.restaurantService.getListeRestaurateursPourtous().subscribe((response: any) => {
      console.log("Regarder", response)
      this.restaurants = response.data;
    });
  }

  onRestoChange() {
    // Call the function to filter restaurants based on the selected category
    this.loadRestaurantsForSelectedCategory();
  }

  loadRestaurantsForSelectedCategory() {
    if (this.categorie_id) {
      this.categorieService.getSingleCategoryPourTous(this.categorie_id).subscribe(
        (restaurants: any) => {
          this.restaurants = restaurants.data;
          console.log('Restaurants récupérés avec succès pour la catégorie sélectionnée!', this.restaurants);
        },
        (error) => {
          console.error("Erreur lors de la récupération des restaurants pour la catégorie sélectionnée:", error);
        }
      );
    } else {
      // If no category selected, show all restaurants
      this.getAllRestaurants();
    }
  }
}
  

