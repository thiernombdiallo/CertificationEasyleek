import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { CommandeService } from 'src/app/Services/commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
 
  etatSelectionne: string = 'acceptee';
  Commandes :any[]=[] ;
  platId :string="";

  ngOnInit(): void {
    // this.loadCommande(); 
    this.getAllCommande();
    
  }

constructor(private commandeService: CommandeService) {}

  getAllCommande(){
    this.commandeService.getRestoCommandes().subscribe(
      (commandes :any) => {
        console.log('JNDFGJNDGLDNGIKNGKNNGGBJLGDFNFGJNDKLDFKF?', commandes)
      this.Commandes = commandes.commandes;
      console.log('cest la reponse du utilisateur', this.Commandes)
  
    },
    (error) => {
      console.error('Erreur lors de la récupération des commandes utilisateur:', error);
    }
  );
  }

  annulerCommande(commadeId : any){
    this.commandeService.annuleruneCommande(commadeId).subscribe(
      (responses:any)=>{
        console.log("c'est la reponse du reponse", responses);
      }
    )
  }
  };
