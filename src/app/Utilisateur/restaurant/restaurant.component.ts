import { Component } from '@angular/core';
import { Restaurant } from 'src/app/Model/restaurant/restaurant.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {

// Tableau restaurant
// restaurants: Restaurant[] = []; //creont le model pour recuperer le tableau

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

}
