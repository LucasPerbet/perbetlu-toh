import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';


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
  filterName: string = ''; // Filtrer par nom
  sortBy: string = ''; // Critère de tri (ex: 'name', 'attaque', etc.)
  sortOrder: 'asc' | 'desc' = 'asc'; // Ordre de tri ('asc' ou 'desc')
  displayedHeroes?: Observable<Hero[]>;
  
  constructor() {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesAsync = this.heroService.getHeroes();
    this.displayedHeroes = this.heroService.getHeroes();
  }

  async deleteHero(id: string): Promise<void> {
    if (confirm('Voulez-vous vraiment supprimer ce héros ?')) {
      try {
        await this.heroService.deleteHero(id);
        console.log(`Héros avec l'ID ${id} supprimé avec succès.`);
      } catch (error) {
        console.error(`Erreur lors de la suppression du héros avec l'ID ${id}`, error);
      }
    }
  }
  applyFilters(): void {
    if (this.heroesAsync) {
      this.displayedHeroes = this.heroesAsync.pipe(
        map((heroes: Hero[]) => {
          let filteredHeroes = heroes;
  
          // Appliquer le filtre
          if (this.filterName) {
            filteredHeroes = filteredHeroes.filter(hero =>
              hero.name.toLowerCase().includes(this.filterName.toLowerCase())
            );
          }
  
          // Appliquer le tri
          if (this.sortBy) {
            filteredHeroes = filteredHeroes.sort((a, b) => {
              const fieldA = a[this.sortBy as keyof Hero] ?? '';
              const fieldB = b[this.sortBy as keyof Hero] ?? '';
  
              if (fieldA < fieldB) return this.sortOrder === 'asc' ? -1 : 1;
              if (fieldA > fieldB) return this.sortOrder === 'asc' ? 1 : -1;
              return 0;
            });
          }
  
          return filteredHeroes;
        })
      );
    }
  }
  resetFilters(): void {
    this.filterName = ''; // Réinitialise le filtre de nom
    this.sortBy = '';     // Réinitialise le champ de tri
    this.sortOrder = 'asc'; // Réinitialise l'ordre de tri
    this.displayedHeroes = this.heroesAsync; // Réaffiche tous les héros
  }
  
  
}
