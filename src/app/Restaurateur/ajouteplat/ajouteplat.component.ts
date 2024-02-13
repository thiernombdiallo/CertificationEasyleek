import { Component } from '@angular/core';
import { GestionPlatService } from 'src/app/Services/gestion-plat.service';
import { PlatService } from 'src/app/Services/plat.service';

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
  image!:File;
  menu_id: string = "";
  prix: any = "";
  libelle: string = "";
  newPlat: string = '';
  editingPlat: any = {};
  editedPlatNom: string = '';
  menusTitre: any;

  constructor(private platservice: GestionPlatService , private recupererMenu:PlatService) {}

  ngOnInit(): void {
    this.loadPlats(); 
    this.getAllmenu();
  }



  // getFile(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  
  //   reader.onloadend = () => {
  //     this.image = reader.result as Blob; // Conserver le type Blob
  //   };
  
  //   reader.readAsDataURL(file);
  // }
  
  // getFile(event: any) {
  //   //console.warn(event.target.files[0]);
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.image = file;
  //   }
  //   this.image= event.target.files[0] as File;
  // }
  
  
  // getFile(event: any) {
  //   let reader = new FileReader();
  //   this.image = event.target.files[0];
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = () => {
  //    this.image = reader.result;
  //   };
  
  // tous les plats
  loadPlats() {
    this.platservice.getPlatsForMenu().subscribe(
      (response: any) => {
        console.log('Plats récupérés avec succès !', response);
        this.plats = response.plat;
      },
      error => {
        console.error('Erreur lors de la récupération des plats :', error);
      }
    );
  }
  getAllmenu() {
    
    this.recupererMenu.getMenus().subscribe(
      (menu: any) => {
        this.menus = menu.menu;
        console.log('Menus récupérés avec succès !', this.menus);
      },
      (error) => {
        console.error("Erreur lors de la récupération des menus :", error);
      }
      );
    }
    
    getMenu() {
      
      this.recupererMenu.getMenus().subscribe((response :any) => {
        // console.log("voir liste", response.menu)
        this.menus = response.menu.menu_id;
      });
    }
    getFile(event: any) {
      this.image = event.target.files[0] as File;
      console.warn(event.target.files[0]);
    }
   
    addPlat() {
      
    console.log(this.libelle);
    console.log(this.prix);
    console.log(this.image.name);
    console.log(this.descriptif);
    console.log(this.menu_id);

    let platAdd = {
      libelle: this.libelle,
      prix: this.prix,
      image: this.image as File ,
      descriptif: this.descriptif,
      menu_id: this.menu_id
    }
    console.log("image affichage ",this.image);
    console.log( "voirrrrrr", platAdd);
    this.platservice.ajouterPlat(platAdd).subscribe(
      (response :any) => {
        console.log(response);
        console.log('Plat ajouté avec succès !', response);
        this.plats =response.data
        
      },
      error => {
        console.error('Erreur lors de l\'ajout du plat :', error);
      }
      );
    }
      
  showPlatDetails(plat:any){};
  editPlat(plat:any){};
  deletePlat(plat:any){};
}
// let formData=new FormData();
// alert(this.libelle)
//     formData.append('libelle',this.libelle);
//     formData.append("prix",this.prix);
//     formData.append("image",this.image);
//     formData.append("descriptif",this.descriptif);
//     formData.append("menu_id", this.menu_id);


// let formData=new FormData();
    // formData.append("libelle",this.libelle);
    // formData.append("prix",this.prix);
    // formData.append("image",this.image);
    // formData.append("descriptif",this.descriptif);
    // formData.append("menu_id", this.menu_id);

    // console.log("formdata affichage ",formData);