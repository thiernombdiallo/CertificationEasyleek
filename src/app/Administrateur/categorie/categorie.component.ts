import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/Services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: any[] = [];
  newcategorie: string = '';
  editingCategory: any = {}; 
  editedType: string = ''
  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((response: any) => {
      // console.log("voir liste", response.data)
      this.categories = response.data;
    });
  }

  addcategorie() {
    if (!this.newcategorie || this.newcategorie.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez saisir le nom de la catégorie.',
      });
      return;
    }
    // console.log("Ajout de catégorie en cours...", this.newcategorie);
    this.categorieService.addcategorie(this.newcategorie).subscribe(
      (response) => {
        // console.log("Réponse de l'API :", response);
        // console.log("Catégorie ajoutée avec succès !");
        this.getAllCategories();
        this.newcategorie = '';
        document.getElementById("close-modal")?.click();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de catégorie :", error);
      }
    );
    }
  

    deletecategorie(categorieId: number) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          this.categorieService.deletecategorie(categorieId).subscribe(() => {
            // console.log("Catégorie supprimée avec succès !");
            this.getAllCategories();
          });
        }
      });
    }
    
    editcategorieModal(categorieId: number, currentType: string) {
      this.categorieService.getSingleCategory(categorieId).subscribe((response: any) => {
        this.editingCategory = response.data;
        this.editedType = this.editingCategory.type;
      });
    }
  
    editcategorie(categorieId: number, newType: string) {
      if (!newType || newType.trim() === '') {
        Swal.fire({
          icon: 'error',
          title: 'Erreur!',
          text: 'Veuillez saisir le nouveau nom de la catégorie.',
        });
        return;
      }
      this.categorieService.editcategorie(categorieId, newType).subscribe((response) =>  {
        // console.log("Catégorie modifiée avec succès !");
        // this.getAllCategories(); console.log("Réponse de l'API :", response);
        // console.log("Catégorie ajoutée avec succès !");
        this.getAllCategories();
      });
    }
  }