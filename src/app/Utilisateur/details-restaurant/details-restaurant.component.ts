import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { GestionPlatService } from 'src/app/Services/gestion-plat.service';
import { PanierService } from 'src/app/Services/panier.service';
import { PlatService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-details-restaurant',
  templateUrl: './details-restaurant.component.html',
  styleUrls: ['./details-restaurant.component.css']
})
export class DetailsRestaurantComponent {
  restaurateurs:any []=[];
  plats :any [] = [];
  menus: any [] = [];
  selectedMenuId: string ="";
  restaurantId :any ="" ; 
  restaurant: any;

  constructor(private platService: PlatService , private panierService: PanierService , private ajoutRestaurateurService: AjoutRestaurateurService ,private route: ActivatedRoute,) {}


  ngOnInit(): void {
    this.loadMenus();
    this.loadPlats();
    this.getListeRestaurateurs() ;

    // this.route.params.subscribe(params => {
    //   console.log("ca c'est le in id " ,params)
    //   this.restaurantId = +params['id'];
    //   // Charger les données du restaurant en utilisant this.restaurantId
    //   this.ajoutRestaurateurService.getRestaurantDetailsUtilisateur(this.restaurantId).subscribe(
    //     (restaurant:any) => {
    //       this.restaurant = restaurant;
    //     },
    //     (error) => {
    //       console.error('Erreur lors de la récupération des détails du restaurant:', error);
    //     }
    //   );
    // });
  }

  getListeRestaurateurs() {
    this.ajoutRestaurateurService.getRestaurantDetailsUtilisateur(this.restaurantId).subscribe((response: any) => {
      console.log("Regarder", response)
      this.restaurateurs = response.data;
    });
  }

  loadMenus() {
    this.platService.getMenusUtilisateur().subscribe(
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
  
  ajouterAuPanier(plat: any) {
    console.log("me voila panier ", plat)
    this.panierService.ajouterAuPanier(plat);
  }
}



 

