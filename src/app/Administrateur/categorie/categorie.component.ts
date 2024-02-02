import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: any[] = [];
  newcategorie: string = '';
  editingCategory: any = {}; 

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe((response: any) => {
      console.log("voir liste", response.data)
      this.categories = response.data;
    });
  }

  addcategorie() {
    console.log("Ajout de catégorie en cours...", this.newcategorie);
    this.categorieService.addcategorie(this.newcategorie).subscribe(
      (response) => {
        console.log("Réponse de l'API :", response);
        console.log("Catégorie ajoutée avec succès !");
        this.getAllCategories();
        this.newcategorie = '';
        document.getElementById("close-modal")?.click();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de catégorie :", error);
      }
    );
    }
  

    editcategorieModal(categorieId: number, currentType: string) {
      this.categorieService.getSingleCategory(categorieId).subscribe((response: any) => {
        this.editingCategory = response.data;
      });
    }

  editcategorie(categorieId: number, newType: string) {
    this.categorieService.editcategorie(categorieId, newType).subscribe(() => {
      this.getAllCategories();
    });
  }

  deletecategorie(categorieId: number) {
      this.categorieService.deletecategorie(categorieId).subscribe(() => {
        this.getAllCategories();
      });
    }
  }
