import { Component, OnInit, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { HeroInterface } from '../../data/heroInterface';
import { Hero } from '../../data/hero';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../data/customValidators';

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './hero-editor.component.html',
  styleUrl: './hero-editor.component.css'
})
export class HeroEditorComponent implements OnInit {


  hero: HeroInterface | undefined;
  heroesAsync?: Observable<Hero[]>;
  private heroService: HeroService = inject(HeroService);
  private customValidators = new CustomValidators();
  
  heroForm = new FormGroup({
    name: new FormControl<string>('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    attaque: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    
    esquive: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    degats: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    pv: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  },
  { validators: this.customValidators.totalNotExceeding(40)}
);

  get name() {
    return this.heroForm.get('name');
  }
  
  get attaque() {
    return this.heroForm.get('attaque');
  }

  get esquive() {
    return this.heroForm.get('esquive');
  }

  get degats() {
    return this.heroForm.get('degats');
  }
  get pv() {
    return this.heroForm.get('pv');
  }

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

