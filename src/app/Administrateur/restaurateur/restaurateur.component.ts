import { Component, OnInit } from '@angular/core';
import { AjoutRestaurateurService } from 'src/app/Services/ajout-restaurateur.service';
import { apiUrl } from 'src/app/Services/apiUrl';
import { CategorieService } from 'src/app/Services/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-restaurateur',
  templateUrl: './restaurateur.component.html',
  styleUrls: ['./restaurateur.component.css'],
})
export class RestaurateurComponent implements OnInit {
  restaurateurs: any[] = [];
  detailrestaurateur: any = {};
  categories: any;
  users: any;
  restaurantApimage = apiUrl;
 
    name : string = '';
    adresse: string = '';
    email: string ='';
    phone: string = '';
    password:string= '';
    categories_id: string= '';
    image :any= '';
  
    restaurateur: {
      id: string;
      name: string;
      isBlocked: boolean;
    } = {
      id: '',
      name: '',
      isBlocked: false
    };
  categorieTypes: string[] = [];

  constructor(private ajoutRestaurateurService: AjoutRestaurateurService , private categorieService :CategorieService) {}

  ngOnInit(): void {
    this.getListeRestaurateurs();
    this.getAllCategories();
  }
   // Validate email format
validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(70|75|76|77|78)[0-9]{7}$/;
  return phoneRegex.test(phone);
}
  getListeRestaurateurs() {
    this.ajoutRestaurateurService.getListeRestaurateurs().subscribe((response: any) => {
      // console.log("Regarder", response)
      this.restaurateurs = response.data;
    });
  }
  getImageUrl(imageName: string): string {
    if (imageName) {
      return `${this. restaurantApimage}/public/images/${imageName}`;
    } else {
      return `${this. restaurantApimage}/public/images/${imageName}`;
    }
  }
  
  getAllCategories() {
    this.categorieService.getAllCategories().subscribe(
      (categories: any) => {
        this.categories = categories.data;
        // console.log( 'revoire ok',categories.data)
        this.categorieTypes = categories.map((categorie: any) => categorie.type);
        // console.log(categories.type)
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des catégories :",
          error
        );
      }
    );
  }
  ajouterRestaurant() {
    if (!this.name || !this.email || !this.adresse || !this.phone || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez remplir tous les champs.',
      });
      return;
    }
  
    // Validate name length
    if (this.name.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Le nom doit contenir au moins 3 caractères.',
      });
      return;
    }
  
    // Validate email format
    if (!this.validateEmail(this.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez saisir une adresse e-mail valide.',
      });
      return;
    }
  
    // Validate phone number format
    if (!this.validatePhoneNumber(this.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez saisir un numéro de téléphone valide (format : 70xxxxxxx, 75xxxxxxx, 76xxxxxxx, 77xxxxxxx, 78xxxxxxx).',
      });
      return;
    }
  
    // Validate password length
    if (this.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Le mot de passe doit contenir au moins 8 caractères.',
      });
      return;
    }
    const data = {
      name: this.name,
      email: this.email,
      adresse: this.adresse,
      phone: this.phone,
      password: this.password,
      categorie:this.categories_id,
      image: this.image,
    };

    

    this.ajoutRestaurateurService.ajouterRestaurateur(data.name, data.email, data.adresse , data.phone, data.password ,data.categorie ).subscribe(
      (response) => {
        console.log('Réponse d\'inscription:', response);
        this.restaurateurs = response.data;
        this.getListeRestaurateurs();
        document.getElementById("close-modal")?.click();
      },
    );
    }

    getDetailsRestaurant(restaurateur: any): void {
      // console.log('Restaurateur:', restaurateur);
      this.ajoutRestaurateurService.getRestaurantDetails(restaurateur.id).subscribe(
         (details) => {
          // console.log("la reponse du detail",details)
            this.name = details.data.name;
            this.adresse = details.data.adresse;
            this.phone = details.data.phone;
         },
         (error) => {
            console.error('Erreur lors de la récupération des détails du restaurant', error);
         }
      );
   }
   
desactiverRestaurant(restaurateur: any): void {
      Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir désactiver ce restaurant ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, désactiver',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // Appel de la méthode de désactivation du service
          this.ajoutRestaurateurService.desactiverRestaurant(restaurateur.id).subscribe(
            (response) => {
              // console.log('Restaurant désactivé avec succès', response);
              // Ajoutez ici le code pour mettre à jour la liste des restaurateurs ou effectuer d'autres actions si nécessaire.
            },
            (error) => {
              console.error('Erreur lors de la désactivation du restaurant', error);
              // Ajoutez ici le code pour gérer l'erreur, par exemple, afficher un message à l'utilisateur.
            }
          );
        }
      });
    }


activerRestaurant(restaurateur: any): void {
      Swal.fire({
        title: 'Êtes-vous sûr(e) de vouloir débloquer ce restaurant ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, débloquer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the method to unlock the restaurant
          this.ajoutRestaurateurService.activerRestaurant(restaurateur.id).subscribe(
            (response) => {
              // console.log('Restaurant débloqué avec succès', response);
              // Update the icon or perform other actions if needed
              restaurateur.isBlocked = false; // Assuming there's a property to track if the restaurant is blocked
            },
            (error) => {
              console.error('Erreur lors du déblocage du restaurant', error);
              // Handle error as needed
            }
          );
        }
      });
    }

    toggleBlockStatus(): void {
      this.restaurateur.isBlocked = !this.restaurateur.isBlocked;
    }
  }
