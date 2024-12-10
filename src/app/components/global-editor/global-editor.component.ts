import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Ajoutez ceci
import { Hero } from '../../data/hero';
import { Observable } from 'rxjs';
import { EditorService } from '../../services/editor.service';
import { HeroService } from '../../services/hero.service';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-global-editor',
  standalone: true,
  imports: [NgFor, AsyncPipe, FormsModule], // Ajoutez FormsModule
  templateUrl: './global-editor.component.html',
  styleUrl: './global-editor.component.css'
})
export class GlobalEditorComponent implements OnInit {
  selectedHeroId: string | null = null;
  selectedWeaponId: string | null = null;
  heroesAsync?: Observable<Hero[]>;
  weaponsAsync?: Observable<Weapon[]>
  private editorService: EditorService = inject(EditorService);
  private heroService: HeroService = inject(HeroService);
  private weaponService: WeaponService = inject(WeaponService);

  ngOnInit(): void {
    this.getHeroes();
    this.getWeapons();
  }

  getHeroes(): void {
    this.heroesAsync = this.heroService.getHeroes();
  }
  
  getWeapons(): void {
    this.weaponsAsync = this.weaponService.getWeapons();
  }

  onAssignWeapon() {
    if (this.selectedHeroId && this.selectedWeaponId) {
      this.editorService.assignWeaponToHero(this.selectedHeroId, this.selectedWeaponId)
        .then(() => {
          console.log('Arme assignée avec succès');
          // Réinitialiser les sélections après l'assignation
          this.selectedHeroId = null;
          this.selectedWeaponId = null;
        })
        .catch(error => {
          console.error('Erreur lors de l\'assignation de l\'arme', error);
        });
    }
  }
}