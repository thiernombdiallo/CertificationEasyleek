import { Component } from '@angular/core';
import { PlatService } from 'src/app/Services/plat.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  titre: string = "";
  selectedMenu: any = {};
  menus: any[] = [];
  newmenu: string = '';
  editingMenu: any = {};
  editedTitre: string = '';
  plats:any[] = [];


constructor(private menusservice: PlatService) {}

  ngOnInit(): void {
    this.getMenu(); 
  }
  fetchPlats() {
    console.log()
    this.menusservice.getRestaurantList().subscribe(
      (response: any) => {
        console.log("Liste des plats :", response);
        this.plats = response; // Adjust if the response structure is different
      },
    );
  }

  
  // menu 
  deletemenu(menuId: string) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Êtes-vous sûr de vouloir supprimer ce menu ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menusservice.deleteMenu(menuId).subscribe(() => {
          this.getMenu();
          Swal.fire('Menu supprimé!', 'Le menu a été supprimé avec succès.', 'success');
        });
      }
    });
  }
  
  addmenu() {
    if (!this.newmenu || this.newmenu.trim() === '' || this.newmenu.trim().length < 5) {
      Swal.fire('Erreur!', 'Le champ du nouveau menu doit contenir au moins 5 caractères.', 'error');
      return;
    }
    console.log("Ajout de catégorie en cours...", this.newmenu);
    this.menusservice.addMenu(this.newmenu).subscribe((response) => {
      console.log(response)
      console.log("Réponse de l'API :", response);
      this.getMenu();
      this.newmenu = ''; 
      document.getElementById("close-modal")?.click();
      
      Swal.fire('Menu ajouter!', 'Le menu a été ajouter avec succès.', 'success');
    });
  }
  

  editmenu(menuId: string, newTitre: string) {
    if (!newTitre || newTitre.trim() === '' || newTitre.trim().length < 5) {
      Swal.fire('Erreur!', 'Le champ du titre du menu doit contenir au moins 5 caractères.', 'error');
      return;
    }
    this.menusservice.editMenu(menuId, newTitre).subscribe(() => {
      this.getMenu();
      Swal.fire('Menu modifié!', 'Le menu a été modifié avec succès.', 'success');
    });
  }

  editmenuModal(menuId: string, menuTitre: string) {
    this.editingMenu.id = menuId;
    this.editedTitre = menuTitre;
  }

  getMenu() {

    this.menusservice.getMenus().subscribe((response :any) => {
      // console.log("voir liste", response.menu)
      this.menus = response.menu;
    });
  }
  detail(menuId: any) {
    this.menusservice.getMenuDetails(menuId).subscribe(
      (response :any) => {
        console.log("je suis reponse",response)
        this.selectedMenu = response;

      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du menu', error);
        // Handle error as needed
      }
    );
  }
}

