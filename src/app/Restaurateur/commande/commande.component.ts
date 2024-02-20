import { Component } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
 


  ngOnInit(): void {
    // this.loadCommande(); 
    this.getAllCommande();
    
  }

  Commandes :any[]=[] ;
  platId :string="";
constructor(private commandeService: CommandeService) {}

  getAllCommande(){
    this.commandeService.getRestoCommandes(this.platId).subscribe(
      (commandes :any) => {
        console.log('JNDFGJNDGLDNGIKNGKNNGGBJLGDFNFGJNDKLDFKF?', commandes)
      this.Commandes = commandes.data;
      console.log('cest la reponse du utilisateur', this.Commandes)
  
    },
    (error) => {
      console.error('Erreur lors de la récupération des commandes utilisateur:', error);
    }
  );
  }
  };
