import { Component, OnInit, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../data/hero';
import { firstValueFrom, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../data/customValidators';

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.css']
})
export class HeroEditorComponent implements OnInit {
  hero: Hero | undefined;
  heroesAsync?: Observable<Hero[]>;
  private heroService: HeroService = inject(HeroService);
  private customValidators = new CustomValidators();
  successMessage: string = '';

  heroForm = new FormGroup({
    name: new FormControl<string>('', [
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
  }, { validators: this.customValidators.totalNotExceeding(40) });

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== "null") {
      // Cas d'édition : Charger les données du héro existant
      this.getHero();
    } else {
      // Cas de création : Formulaire vide
      this.heroForm.reset(); // Initialise le formulaire avec des champs vides
    }
  }

  async getHero(): Promise<void> {
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    try {
      // Convertit l'Observable en Promesse en utilisant firstValueFrom
      const hero = await firstValueFrom(this.heroService.getHero(id));
      this.hero = hero;
  
      // Met à jour le formulaire avec les données du héro
      if (this.hero) {
        this.heroForm.patchValue({
          name: this.hero.name,
          attaque: this.hero.attaque,
          esquive: this.hero.esquive,
          degats: this.hero.degats,
          pv: this.hero.pv,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du héro', error);
    }
  }

// Méthode qui gère l'ajout d'un héro
async addHero() {
  const newHero = new Hero(
    "",  // ID sera généré lors de l'ajout dans Firestore
    this.heroForm.value.name ?? "",  // Conversion de `null` ou `undefined` en chaîne vide
    this.heroForm.value.attaque ?? 0,
    this.heroForm.value.esquive ?? 0,
    this.heroForm.value.degats ?? 0,
    this.heroForm.value.pv ?? 0
  );
  
  try {
    await this.heroService.addHero(newHero);
    this.successMessage = "Héro créé avec succès !";  // Affichage du message de succès

    // Redirection après l'ajout du héro
    setTimeout(() => {
      this.router.navigate(['/heroes']);  
    }, 1500);  // Redirige après 2 secondes pour laisser le temps à l'alerte de s'afficher
  } catch (error) {
    console.error('Erreur lors de l\'ajout du héro:', error);
  }
}


// Méthode qui gère la mise à jour d'un héro existant
async updateHero() {
  if (this.hero) {
    const updatedHero = new Hero(
      this.hero.id!,  // Utilise l'ID du héro existant
      this.heroForm.value.name ?? "",  // Conversion de `null` ou `undefined` en chaîne vide
      this.heroForm.value.attaque ?? 0,
      this.heroForm.value.esquive ?? 0,
      this.heroForm.value.degats ?? 0,
      this.heroForm.value.pv ?? 0
    );
  
    try {
      await this.heroService.updateHero(updatedHero);
      this.successMessage = "Héro mis à jour avec succès !";  // Affichage du message de succès

      // Redirection après la mise à jour du héro
      setTimeout(() => {
        this.router.navigate(['/heroes']);  // Redirige vers la liste des héros
      }, 1500);  // Redirige après 2 secondes pour laisser le temps à l'alerte de s'afficher
    } catch (error) {
      console.error('Erreur lors de la mise à jour du héro:', error);
    }
  }
}

}
