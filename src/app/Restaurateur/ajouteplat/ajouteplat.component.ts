import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommandeService } from 'src/app/Services/commande.service';
import { GestionPlatService } from 'src/app/Services/gestion-plat.service';
import { PlatService } from 'src/app/Services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouteplat',
  templateUrl: './ajouteplat.component.html',
  styleUrls: ['./ajouteplat.component.css']
})
export class AjouteplatComponent {
  menus: any[] = [];
  plats: any[] = [];
  selectedPlat: any = {};
  descriptif: string = "";
  image: any = "";
  menu_id: string = "";
  prix: string = "";
  libelle: string = "";
  user_id: string = "";
  newPlat: string = '';
  editingPlat: any = {};
  editedPlatNom: string = '';
  menusTitre: any;
  updatedPlat: [] = [];
  // editedArticle: Article = { id: 0, titre: '', photo: '', description: '' };
  platId: string = "";
  details: any;
  Commandes: any[] = [];
  ajoutArticle!: FormGroup;
  constructor(private formBuilder: FormBuilder, private platservice: GestionPlatService, private recupererMenu: PlatService, private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.loadPlats();
    this.getAllmenu();
    this.loadPlatsTotal();

    this.ajoutArticle = this.formBuilder.group({
      libelle: ['', Validators.required],
      descriptif: ['', Validators.required],
      image: ['', [Validators.required, this.validateImage]],
      prix: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      menu_id: [null, Validators.required]
    });
  }


  validateImage = (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;
  
    if (!file) {
      // Aucun fichier sélectionné
      return { required: true };
    }
  
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
    if (fileExtension === undefined) {
      // Extension de fichier non définie
      return { invalidExtension: true };
    }
  
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Ajoutez les extensions autorisées
  
    if (allowedExtensions.indexOf(fileExtension) === -1) {
      // Extension de fichier non autorisée
      return { invalidExtension: true };
    }
  
    // Image valide
    return null;
  };
  
  

  // tous les plats
  getAllmenu() {

    this.recupererMenu.getMenus().subscribe(
      (menu: any) => {
        console.log('Menus récupérés avec succès !', menu);
        this.menus = menu.menus;
      },
      (error) => {
        console.error("Erreur lors de la récupération des menus :", error);
      }
    );
  }

  getMenu() {
    this.recupererMenu.getMenus().subscribe((response: any) => {
      console.log("voir liste", response.menu)
      this.menus = response.menu.menu_id;
    });
  }

  getFile(event: any) {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0];
      this.ajoutArticle.patchValue({
        image: file
      });
    } else {
      console.error('No file selected.');
    }
  }  

  // addPlat() {
  //   if (this.ajoutArticle.valid) {
  //     const platAdd = this.ajoutArticle.value;
  //     console.log("je suis platadd avant l'ajout ", platAdd);
  //     this.platservice.ajouterPlat(platAdd).subscribe(
  //       (response: any) => {
  //         console.log('Plat ajouté avec succès !', response);
  //         this.loadPlats();
  //       },
  //       (error: any) => {
  //         console.error('Erreur lors de l\'ajout du plat :', error);
  //       }
  //     );
  //   }
  // }


  addPlat() {
    if (this.ajoutArticle.valid) {
      const platAdd = this.ajoutArticle.value;
      console.log("je suis platadd avant l'ajout ", platAdd);
  
      // Ajoutez une vérification pour vous assurer que l'image est correctement définie
      if (platAdd.image instanceof File) {
        // Effectuez l'appel API uniquement si l'image est une instance de File
        this.platservice.ajouterPlat(platAdd).subscribe(
          (response: any) => {
            console.log('Plat ajouté avec succès !', response);
            this.loadPlats();
          },
          (error: any) => {
            console.error('Erreur lors de l\'ajout du plat :', error);
          }
        );
      } else {
        console.error('Erreur : Aucune image sélectionnée.');
      }
    }
  }
  


  onMenuChange() {
    this.loadPlatsForSelectedMenu();
  }

  loadPlats() {
    this.platservice.getPlatsForMenu('').subscribe(
      (plats: any) => {
        this.plats = plats;
        console.log('Plats récupérés avec succès!', this.plats);
      },
    );
  }


  loadPlatsForSelectedMenu() {
    if (this.menu_id) {
      this.platservice.getPlatsForMenu(this.menu_id).subscribe(
        (plats: any) => {
          this.plats = plats.data;
          console.log('Plats récupérés avec succès pour le menu sélectionné!', this.plats);
        },
        (error) => {
          console.error("Erreur lors de la récupération des plats pour le menu sélectionné:", error);
        }
      );
    }
  }
  supprimerPlat(platId: string): void {
    {
      this.platservice.deletePlat(platId).subscribe(
        (response) => {
          // console.log('Plat supprimé avec succès!', response);
          this.loadPlatsForSelectedMenu();
        },
        (error) => {
          console.error("Erreur lors de la suppression du plat :", error);
        }
      );
    }
  }
  detailsplat(platId: number): void {
    this.platservice.getSinglePlat(platId).subscribe(
      (platDetails) => {
        this.showDetailsModal(platDetails);
      },
      (error) => {
        console.error('Error fetching plat details', error);
      }
    );
  }


  showDetailsModal(platId: number): void {
    // console.log("ca",platId)
    this.platservice.getSinglePlat(platId).subscribe((response: any) => {
      // console.log("c'est la reponse du truc", response)
      this.details = response.data
      this.libelle = this.details.libelle;
      this.prix = this.details.prix;
      this.descriptif = this.details.descriptif

    })
  }


  editmenuModal(platId: number) {
    this.platservice.getSinglePlat(platId).subscribe((response: any) => {
      // console.log("c'est la reponse du truc", response)
      this.editingPlat = response.data;
      this.libelle = this.editingPlat.libelle
      this.prix = this.editingPlat.prix
      this.descriptif = this.editingPlat.descriptif
      this.image = this.editingPlat.image
    })
  };
  modifierPlat(platId: string,) {
    this.platservice.updatePlat(platId).subscribe(() => {
      console.log("Plat mis à jour avec succès.", platId);
      this.loadPlats();
    });
  }

  loadPlatsTotal() {
    this.platservice.getPlatsForTotal().subscribe(
      (platsTtal: any) => {
        console.log('Plats récupérés avec succès!', platsTtal);
        this.plats = platsTtal.plats;
      },
    );
  }



}
