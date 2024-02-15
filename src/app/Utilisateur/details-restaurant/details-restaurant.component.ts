import { Component } from '@angular/core';

@Component({
  selector: 'app-details-restaurant',
  templateUrl: './details-restaurant.component.html',
  styleUrls: ['./details-restaurant.component.css']
})
export class DetailsRestaurantComponent {

  // onMenuChange() {
  //   this.loadPlatsForSelectedMenu();
  // }

  // loadPlats() {
  //   this.platservice.getPlatsForMenu('').subscribe(
  //     (plats: any) => {
  //       this.plats = plats;
  //       console.log('Plats récupérés avec succès!', this.plats);
  //     },
  //     (error) => {
  //       console.error("Erreur lors de la récupération des plats :", error);
  //     }
  //   );
  // }

  // loadPlatsForSelectedMenu() {
  //   if (this.menu_id) {
  //     this.platservice.getPlatsForMenu(this.menu_id).subscribe(
  //       (plats: any) => {
  //         this.plats = plats.data;
  //         console.log('Plats récupérés avec succès pour le menu sélectionné!', this.plats);
  //       },
  //       (error) => {
  //         console.error("Erreur lors de la récupération des plats pour le menu sélectionné:", error);
  //       }
  //     );
  //   }
  // }

}
