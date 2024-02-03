import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './Utilisateur/accueil/accueil.component';
import { RestaurantComponent } from './Utilisateur/restaurant/restaurant.component';
import { ProposComponent } from './Utilisateur/propos/propos.component';
import { GuideComponent } from './Utilisateur/guide/guide.component';
import { ConfidentialiteComponent } from './Utilisateur/confidentialite/confidentialite.component';
import { ContactComponent } from './Utilisateur/contact/contact.component';
import { ProfilComponent } from './Utilisateur/profil/profil.component';
import { LoginComponent } from './Module/login/login.component';
import { HeaderComponent } from './Module/header/header.component';
import { FooterComponent } from './Module/footer/footer.component';
import { MenuComponent } from './Restaurateur/menu/menu.component';
import { CommandeComponent } from './Restaurateur/commande/commande.component';
import { CommentaireComponent } from './Restaurateur/commentaire/commentaire.component';
import { AccueilAdminComponent } from './Administrateur/accueil-admin/accueil-admin.component';
import { CategorieComponent } from './Administrateur/categorie/categorie.component';
import { DetailsRestaurantComponent } from './Utilisateur/details-restaurant/details-restaurant.component';
import { PanierComponent } from './Utilisateur/panier/panier.component';
import { RestaurateurComponent } from './Administrateur/restaurateur/restaurateur.component';
import { ClientComponent } from './Administrateur/client/client.component';
import { MessageComponent } from './Administrateur/message/message.component';
import { DashboardAdminComponent } from './Module/dashboard-admin/dashboard-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'sidebar', component: DashboardAdminComponent},
  
  { path: 'accueil', component: AccueilComponent},
  { path: 'restaurant', component: RestaurantComponent},
  { path: 'detailsrestaurant', component: DetailsRestaurantComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'propos', component: ProposComponent},
  { path: 'guide', component: GuideComponent},
  { path: 'confidentialite', component:ConfidentialiteComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'profil', component: ProfilComponent },

  { path: 'menuResto', component: MenuComponent},
  { path: 'commandeResto', component: CommandeComponent},
  { path: 'commentairesResto', component: CommentaireComponent},
  
  { path: 'adminSysteme', component: AccueilAdminComponent} ,
  { path: 'adminMessage', component: MessageComponent},
  { path: 'adminCategorie', component: CategorieComponent},
  { path: 'adminRestaurant', component: RestaurateurComponent},
  { path: 'adminClient', component: ClientComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
