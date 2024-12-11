import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { Weapon } from '../../data/weapon';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe, NgIf } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { WeaponService } from '../../services/weapon.service';
import { combineLatest, map, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

interface HeroWithWeapon extends Hero {
  weapon?: Weapon;
  totalAttack?: number;
}

type SortableHeroFields = 'name' | 'attaque' | 'esquive' | 'degats' | 'pv' | 'totalAttack';

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
  private weaponService: WeaponService = inject(WeaponService);
  
  filterName: string = ''; 
  sortBy: SortableHeroFields = 'name'; 
  sortOrder: 'asc' | 'desc' = 'asc'; 
  displayedHeroes?: Observable<HeroWithWeapon[]>;
  
  constructor() {}

  ngOnInit(): void {
    this.heroesAsync = this.heroService.getHeroes();
    this.getHeroesWithWeapons();
  }

  // Méthode pour convertir un héros simple en HeroWithWeapon
  private convertToHeroWithWeapon(hero: Hero, weapon?: Weapon): HeroWithWeapon {
    const heroWithWeapon: HeroWithWeapon = {
      ...hero,
      weapon: weapon,
      totalAttack: this.calculateTotalAttack(hero, weapon),
      // Ajout des méthodes manquantes de la classe Hero
      ajoutDegat: () => {
        hero.ajoutDegat();
        heroWithWeapon.degats = hero.degats;
      },
      ajoutpv: () => {
        hero.ajoutpv();
        heroWithWeapon.pv = hero.pv;
      },
      isValide: () => hero.isValide(),
      fromJSON: (jsonStr: string) => {
        hero.fromJSON(jsonStr);
        Object.assign(heroWithWeapon, hero);
      }
    };
    return heroWithWeapon;
  }

  getHeroesWithWeapons(): void {
    this.displayedHeroes = combineLatest([
      this.heroService.getHeroes(), 
      this.weaponService.getWeapons()
    ]).pipe(
      map(([heroes, weapons]) => {
        return heroes.map(hero => {
          const weapon = weapons.find(weapon => weapon.id === hero.weaponID);
          return this.convertToHeroWithWeapon(hero, weapon);
        });
      })
    );
  }

  calculateTotalAttack(hero: Hero, weapon?: Weapon): number {
    return hero.attaque + (weapon?.attack_boost || 0);
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
    this.displayedHeroes = this.displayedHeroes?.pipe(
      map(heroes => {
        let filteredHeroes = heroes;
  
        // Filtre par nom
        if (this.filterName) {
          filteredHeroes = filteredHeroes.filter(hero =>
            hero.name.toLowerCase().includes(this.filterName.toLowerCase())
          );
        }
  
        // Tri
        if (this.sortBy) {
          filteredHeroes = filteredHeroes.sort((a, b) => {
            const fieldA = this.sortBy === 'totalAttack' 
              ? (a.totalAttack ?? 0) 
              : (a[this.sortBy] ?? 0); // Valeur par défaut pour undefined
            const fieldB = this.sortBy === 'totalAttack' 
              ? (b.totalAttack ?? 0) 
              : (b[this.sortBy] ?? 0); // Valeur par défaut pour undefined
          
            return (fieldA < fieldB ? -1 : 1) * (this.sortOrder === 'asc' ? 1 : -1);
          });
          
        }
  
        return filteredHeroes;
      })
    );
  }
  

  resetFilters(): void {
    this.filterName = '';
    this.sortBy = 'name';
    this.sortOrder = 'asc';
    this.getHeroesWithWeapons(); // Recharge les données initiales.
  }
  
}