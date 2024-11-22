import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, AsyncPipe, RouterLink, NgIf],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  
  hero?: Hero;
  heroesAsync?: Observable<Hero[]>;
  private heroService: HeroService = inject(HeroService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesAsync = this.heroService.getHeroes();
  }

  deleteHero(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce héros ?')) {
      this.heroService.deleteHero(id).then(() => {
        console.log(`Héros avec l'ID ${id} supprimé avec succès.`);
        this.getHeroes(); // Rafraîchit la liste après suppression
      }).catch((error) => {
        console.error(`Erreur lors de la suppression du héros avec l'ID ${id}`, error);
      });
    }
  }
  
}
