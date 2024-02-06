import { Component } from '@angular/core';
import { PlatService } from 'src/app/Services/plat.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 
  plats: any[] = [];
  newcategorie: string = '';
  editingCategory: any = {}; 
  editedType: string = ''
  isMenuandPlats: boolean = true;
  constructor(private platservice: PlatService) {}

  ngOnInit(): void {
    this.getAllPlats();
  }

  getAllPlats() {
    this.platservice.getPlatsByRestaurant().subscribe((response: any) => {
      console.log("voir liste", response.data)
      this.plats = response.data;
    });
  }

  addcategorie() {
    console.log("Ajout de catégorie en cours...", this.newcategorie);
    this.platservice.ajouterPlat(this.newcategorie).subscribe(
      (response) => {
        console.log("Réponse de l'API :", response);
        console.log("Catégorie ajoutée avec succès !");
        this.getAllPlats();
        this.newcategorie = '';
        document.getElementById("close-modal")?.click();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de catégorie :", error);
      }
    );
    }
  
    showPlatDetails(){}
    deletePlat(){}
    editPlat(){}
    toggleForm() {
      this.isMenuandPlats = !this.isMenuandPlats;
    }
  }
    // deletecategorie(categorieId: number) {
    //     this.platservice.deletecategorie(categorieId).subscribe(() => {
    //       console.log("Catégorie supprimée avec succès !");
    //       this.getAllplats();
    //     });
      
    // }
    
    // editcategorieModal(categorieId: number, currentType: string) {
    //   this.platservice.getSingleCategory(categorieId).subscribe((response: any) => {
    //     this.editingCategory = response.data;
    //     this.editedType = this.editingCategory.type;
    //   });
    // }
  
    // editcategorie(categorieId: number, newType: string) {
    //   this.platservice.editcategorie(categorieId, newType).subscribe((response) =>  {
    //     console.log("Catégorie modifiée avec succès !");
    //     this.getAllplats(); console.log("Réponse de l'API :", response);
    //     console.log("Catégorie ajoutée avec succès !");
    //     this.getAllplats();
    //   });
    // }

