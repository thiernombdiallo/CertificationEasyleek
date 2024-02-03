import { Component, OnInit } from '@angular/core';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-ajout-restaurateur',
  templateUrl: './restaurateur.component.html',
  styleUrls: ['./restaurateur.component.css'],
})
export class RestaurateurComponent implements OnInit {
  newrestaurateur: any = {};
  restaurateurs: any[] = []; 
  detailrestaurateur: any = {}; 
  categories: any;
  users: any;

  constructor(private ajoutRestaurateurService: AjoutRestaurateurService , private categorieService :CategorieService) {}

  ngOnInit(): void {
    this.getListeRestaurateurs();
  }
  
  getListeRestaurateurs() {
    this.ajoutRestaurateurService.getListeRestaurateurs().subscribe((response: any) => {
      console.log("Regarder", response)
      this.restaurateurs = response;
    });
  }

  ajouterRestaurant() {
    // Appelez votre méthode de service pour ajouter un nouveau restaurateur
    this.ajoutRestaurateurService.ajouterRestaurateur(this.newrestaurateur).subscribe(
      (response) => {
        console.log('Restaurant ajouté avec succès', response);
        // En option, vous pouvez réinitialiser le formulaire ou effectuer toute autre action en cas de succès
        // this.resetForm();
        // this.getListeRestaurateurs();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du restaurant', error);
        // Gérez l'erreur selon les besoins
      }
    );
  }

  getDetailsRestaurant(){};
  supprimerRestaurant(){};
}