import { Component } from '@angular/core';
import { CategorieService } from 'src/app/Services/categorie.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  categories: any[] = [];

constructor(private categorieService: CategorieService) {}

ngOnInit() {
  this.getAllCategories();
}

getAllCategories() {
  this.categorieService.getAllCategories().subscribe((response: any) => {
    console.log("voir liste", response.data)
    this.categories = response.data;
  });
}
}
