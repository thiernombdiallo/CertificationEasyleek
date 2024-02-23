import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { PanierService } from 'src/app/Services/panier.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentTemplate = 'template1';

  constructor(private authService: AuthService
    , private userService: UserService , private panierService :PanierService) {}

  logout(): void {
    this.authService.logout();
  }


  showTemplate1() {
    this.currentTemplate = 'template1';
  }

  showTemplate2() {
    this.currentTemplate = 'template2';
  }

  name: string = '';
  phone: string = '';
  Commandes: any[] = [];


  ngOnInit() {
    this.getAllUser();
    this.getAllCommande();
  }

  // getAllCategories() {
  //   this.categorieService.getAllCategories().subscribe((response: any) => {
  //     console.log("voir liste", response.data)
  //     this.categories = response.data;
  //   });
  // }

  getAllUser(){
    this.userService.getUserProfile().subscribe(
    (userData) => {
      console.log('cest la reponse du utilisateur', userData)
      this.name = userData.name;
      this.phone = userData.phone;
    },
    (error) => {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
    }
  );
}
   getAllCommande(){
    this.panierService.getUserCommandes().subscribe(
    (commandes :any) => {
      console.log('cest la reponse du utilisateur', commandes.data)
      this.Commandes = commandes.data;

    },
    (error) => {
      console.error('Erreur lors de la récupération des commandes utilisateur:', error);
    }
  );
}
} 
  
