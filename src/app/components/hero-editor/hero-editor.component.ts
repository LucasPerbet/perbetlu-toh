import { Component, OnInit, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { HeroInterface } from '../../data/heroInterface';
import { Hero } from '../../data/hero';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './hero-editor.component.html',
  styleUrl: './hero-editor.component.css'
})
export class HeroEditorComponent implements OnInit {


  hero: HeroInterface | undefined;
  heroesAsync?: Observable<Hero[]>;
  private heroService: HeroService = inject(HeroService);
  heroForm = new FormGroup({
    name: new FormControl<string>(''), // Type string
    attaque: new FormControl<number | null>(null), // Type number
    esquive: new FormControl<number | null>(null),
    degats: new FormControl<number | null>(null),
    pv: new FormControl<number | null>(null),
  });
  


  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== "null") {
      // Cas d'édition : Charger les données du héros existant
      this.getHero();
    } else {
      // Cas de création : Formulaire vide
      this.heroForm.reset(); // Initialise le formulaire avec des champs vides
    }
  }
  

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
  
      // Met à jour le formulaire avec les données du héros
      if (this.hero) {
        this.heroForm.patchValue({
          name: this.hero.name,
          attaque: this.hero.attaque,
          esquive: this.hero.esquive,
          degats: this.hero.degats,
          pv: this.hero.pv,
        });
      }
    });
  }

  addHero() {
    this.heroService.addHero();
  }

  updateHero() {
    this.heroService.updateHero();
  }
}

