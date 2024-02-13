import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Module/header/header.component';
import { FooterComponent } from './Module/footer/footer.component';
import { LoginComponent } from './Module/login/login.component';
import { AccueilComponent } from './Utilisateur/accueil/accueil.component';
import { ProposComponent } from './Utilisateur/propos/propos.component';
import { ContactComponent } from './Utilisateur/contact/contact.component';
import { ConfidentialiteComponent } from './Utilisateur/confidentialite/confidentialite.component';
import { GuideComponent } from './Utilisateur/guide/guide.component';
import { RestaurantComponent } from './Utilisateur/restaurant/restaurant.component';
import { ProfilComponent } from './Utilisateur/profil/profil.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './Restaurateur/menu/menu.component';
import { CommandeComponent } from './Restaurateur/commande/commande.component';
import { CommentaireComponent } from './Restaurateur/commentaire/commentaire.component';
import { AccueilAdminComponent } from './Administrateur/accueil-admin/accueil-admin.component';
import { ClientComponent } from './Administrateur/client/client.component';
import { CategorieComponent } from './Administrateur/categorie/categorie.component';
import { MessageComponent } from './Administrateur/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsRestaurantComponent } from './Utilisateur/details-restaurant/details-restaurant.component';
import { PanierComponent } from './Utilisateur/panier/panier.component';
import { DashboardAdminComponent } from './Module/dashboard-admin/dashboard-admin.component';
import { RestaurateurComponent } from './Administrateur/restaurateur/restaurateur.component';
import { AjouteplatComponent } from './Restaurateur/ajouteplat/ajouteplat.component';
import { DasboardRestoComponent } from './Module/dasboard-resto/dasboard-resto.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdminComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AccueilComponent,
    ProposComponent,
    ContactComponent,
    ConfidentialiteComponent,
    GuideComponent,
    RestaurantComponent,
    ProfilComponent,
    MenuComponent,
    CommandeComponent,
    CommentaireComponent,
    AccueilAdminComponent,
    ClientComponent,
    RestaurateurComponent,
    CategorieComponent,
    MessageComponent,
    DetailsRestaurantComponent,
    PanierComponent,
    AjouteplatComponent,
    DasboardRestoComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
