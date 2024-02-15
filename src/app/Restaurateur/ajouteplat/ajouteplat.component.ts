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
  descriptif:string = "";
  image:any="";
  menu_id: string = "";
  prix: string = "";
  libelle: string = "";
  user_id:string="";
  newPlat: string = '';
  editingPlat: any = {};
  editedPlatNom: string = '';
  menusTitre: any;
  updatedPlat :[]=[];
  // editedArticle: Article = { id: 0, titre: '', photo: '', description: '' };
  platId:string="";
  details: any;

  constructor(private platservice: GestionPlatService , private recupererMenu:PlatService) {}

  ngOnInit(): void {
    this.loadPlats(); 
    this.getAllmenu();
  }



  
  // tous les plats
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
   
    
    addPlat() {
      let formData = new FormData();
      formData.append("libelle", this.libelle);
      formData.append("prix", this.prix);
      formData.append("descriptif", this.descriptif);
      formData.append("menu_id", this.menu_id);
      formData.append("image", this.image as Blob);
    
      console.log("voici le formdata" , formData)
      this.platservice.ajouterPlat(formData).subscribe(
        (response: any) => {
          console.log('Plat ajouté avec succès !', response);
          this.loadPlats();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout du plat :', error);
      
          // Gérer les erreurs spécifiques ici
          if (error.status === 422) {
            console.error('Erreur 422 : Données invalides.');
            console.error('Détails de l\'erreur :', error.error.errors);
          }
        }
      );
}      
    

 getFile(event: any) {
      this.image = event.target.files[0] as File;
      console.log(typeof(this.image));
      console.warn(event.target.files[0]);
      console.warn(this.image);

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
        (error) => {
          console.error("Erreur lors de la récupération des plats :", error);
        }
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
            console.log('Plat supprimé avec succès!', response);
            this.loadPlatsForSelectedMenu();
          },
          (error) => {
            console.error("Erreur lors de la suppression du plat :", error);
          }
        );
      }
    }
    detailsplat(platId: number): void{
      this.platservice.getSinglePlat(platId).subscribe(
        (platDetails) => {
          console.log("ca c'est le truc du details" ,platDetails)
          this.showDetailsModal(platDetails);
        },
        (error) => {
          console.error('Error fetching plat details', error);
        }
      );
    }

    
    showDetailsModal(platId:number): void {
      console.log("ca",platId)
      this.platservice.getSinglePlat(platId).subscribe((response:any)=>{
        console.log("c'est la reponse du truc", response)
        this.details = response.data
        this.libelle=this.details.libelle;
        this.prix=this.details.prix;
        this.descriptif=this.details.descriptif

      })
    }


editmenuModal(platId:number){
  this.platservice.getSinglePlat(platId).subscribe((response:any)=>{
    console.log("c'est la reponse du truc", response)
    this.editingPlat= response.data;
    this.libelle=this.editingPlat.libelle
    this.prix=this.editingPlat.prix
    this.descriptif=this.editingPlat.descriptif
    this.image=this.editingPlat.image 

  })
};

modifierPlat(platId:string, editingPlat :any){

this.platservice.updatePlat(editingPlat).subscribe(()=>{
  console.log("c'est l'autre ca " ,editingPlat)
  this.loadPlats()
})
};
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

    // let platAdd = {
      //   libelle: this.libelle,
      //   prix: this.prix,
      //   image: this.image as File ,
      //   descriptif: this.descriptif,
      //   menu_id: this.menu_id
      // }
      //     const platAdd = new FormData();
// // alert(this.libelle)
//     platAdd.append('libelle', "dhdh");
//     platAdd.append("prix", "1232");
//     platAdd.append("descriptif", "hfhfhfh");
//     platAdd.append("menu_id", "1");
//     platAdd.append("image",this.image as Blob );
//     console.log("Le plat formdata: ", platAdd)

    // console.log(platAdd[])
    
    // console.log("image affichage ",this.image);
    // console.log( "voirrrrrr", platAdd);