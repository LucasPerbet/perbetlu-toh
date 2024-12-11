import { Component, inject, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon.service';
import { map, Observable } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink, FormsModule],
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.css'
})
export class WeaponComponent implements OnInit {

  weapon?: Weapon;
  weaponsAsync?: Observable<Weapon[]>;
  private weaponService: WeaponService = inject(WeaponService);
  filterName: string = ''; // Filtrer par nom
  sortBy: string = ''; // Critère de tri (ex: 'name', 'attaque', etc.)
  sortOrder: 'asc' | 'desc' = 'asc'; // Ordre de tri ('asc' ou 'desc')
  displayedWeapon?: Observable<Weapon[]>;

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponsAsync = this.weaponService.getWeapons();
    this.displayedWeapon = this.weaponService.getWeapons();
  }

  async deleteWeapon(id: string): Promise<void> {
    if (confirm('Voulez-vous vraiment supprimer cette arme ?')) {
      try {
        await this.weaponService.deleteWeapon(id);
        console.log(`Arme avec l'ID ${id} supprimé avec succès.`);
      } catch (error) {
        console.error(`Erreur lors de la suppression de l'arme avec l'ID ${id}`, error);
      }
    }
  }

  applyFilters(): void {
    if (this.weaponsAsync) {
      this.displayedWeapon = this.weaponsAsync.pipe(
        map((weapons: Weapon[]) => {
          let filteredWeapon = weapons;
  
          // Appliquer le filtre
          if (this.filterName) {
            filteredWeapon = filteredWeapon.filter(hero =>
              hero.name.toLowerCase().includes(this.filterName.toLowerCase())
            );
          }
  
          // Appliquer le tri
          if (this.sortBy) {
            filteredWeapon = filteredWeapon.sort((a, b) => {
              const fieldA = a[this.sortBy as keyof Weapon] ?? '';
              const fieldB = b[this.sortBy as keyof Weapon] ?? '';
  
              if (fieldA < fieldB) return this.sortOrder === 'asc' ? -1 : 1;
              if (fieldA > fieldB) return this.sortOrder === 'asc' ? 1 : -1;
              return 0;
            });
          }
  
          return filteredWeapon;
        })
      );
    }
  }
  resetFilters(): void {
    this.filterName = ''; // Réinitialise le filtre de nom
    this.sortBy = '';     // Réinitialise le champ de tri
    this.sortOrder = 'asc'; // Réinitialise l'ordre de tri
    this.displayedWeapon = this.weaponsAsync; 
  }
}
