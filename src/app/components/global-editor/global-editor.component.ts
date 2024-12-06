import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { Observable } from 'rxjs';
import { EditorService } from '../../services/editor.service';
import { HeroService } from '../../services/hero.service';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon.service';

@Component({
  selector: 'app-global-editor',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './global-editor.component.html',
  styleUrl: './global-editor.component.css'
})
export class GlobalEditorComponent implements OnInit {
  hero?: Hero;
  heroesAsync?: Observable<Hero[]>;
  weapon?: Weapon;
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

  assignWeaponToHero(heroId: string, weaponId: string) {
    this.editorService.assignWeaponToHero(heroId,weaponId);
  }



}
