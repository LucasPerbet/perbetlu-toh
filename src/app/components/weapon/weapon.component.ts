import { Component, inject, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon.service';
import { Observable } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [NgFor, AsyncPipe, RouterLink],
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.css'
})
export class WeaponComponent implements OnInit {

  weapon?: Weapon;
  weaponsAsync?: Observable<Weapon[]>;
  private weaponService: WeaponService = inject(WeaponService);

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponsAsync = this.weaponService.getWeapons();
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
}
