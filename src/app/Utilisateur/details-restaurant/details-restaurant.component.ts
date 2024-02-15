import { Component } from '@angular/core';
import { GestionPlatService } from 'src/app/Services/gestion-plat.service';
import { PlatService } from 'src/app/Services/plat.service';

@Component({
  selector: 'app-details-restaurant',
  templateUrl: './details-restaurant.component.html',
  styleUrls: ['./details-restaurant.component.css']
})
export class DetailsRestaurantComponent {
  plats :any [] = [];
  menus: any [] = [];
  selectedMenuId: string ="";

  constructor(private platService: PlatService) {}

  ngOnInit(): void {
    this.loadMenus();
    this.loadPlats();
  }

  loadMenus() {
    this.platService.getMenus().subscribe(
      (menus: any) => {
        console.log("he suis le menu me voila", menus.menu)
        this.menus = menus.menu;
        console.log('Menus retrieved successfully!', this.menus);
      },
      (error) => {
        console.error('Error fetching menus:', error);
      }
    );
  }

  onMenuChange() {
    this.loadPlatsForSelectedMenu();
  }

  loadPlatsForSelectedMenu() {
    if (this.selectedMenuId) {
      this.platService.getPlatsForMenuUtilisateur(this.selectedMenuId).subscribe(
        (plats: any) => {
          console.log('Plats retrieved successfully for the selected menu!', plats.data);
          this.plats = plats.data
          this.loadPlats()
        },
        (error) => {
          console.error('Error fetching plats for the selected menu:', error);
        }
      );
    }
  }

  loadPlats() {
    this.platService.getPlats().subscribe(
      (plats: any) => {
        console.log('Plats récupérés avec succès!', plats);
        this.plats = plats;
      },
      (error) => {
        console.error('Erreur lors de la récupération des plats:', error);
      }
    );
  }
  
}



 

