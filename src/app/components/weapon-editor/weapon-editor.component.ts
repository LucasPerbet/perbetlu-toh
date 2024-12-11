import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { firstValueFrom, Observable } from 'rxjs';
import { WeaponService } from '../../services/weapon.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weapon-editor',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './weapon-editor.component.html',
  styleUrl: './weapon-editor.component.css'
})
export class WeaponEditorComponent implements OnInit{

  weapon: Weapon | undefined;
  weaponsAsync?: Observable<Weapon[]>;
  private weaponService: WeaponService = inject(WeaponService);
  successMessage: string ='';

  weaponForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    attack_boost: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(50),
    ])
  })

  get name() {
    return this.weaponForm.get('name');
  }

  get attack_boost() {
    return this.weaponForm.get('attack_boost');
  }

  
  constructor(private route: ActivatedRoute, private router: Router,   private location: Location) {}

  ngOnInit():void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== "null") {
      // Cas d'édition : Charger les données d'une arme'existante
      this.getWeapon();
    } else {
      // Cas de création : Formulaire vide
      this.weaponForm.reset(); // Initialise le formulaire avec des champs vides
    }
  }

  async getWeapon(): Promise<void> {
    const id = String(this.route.snapshot.paramMap.get('id'));
  
    try {
      // Convertit l'Observable en Promesse en utilisant firstValueFrom
      const weapon = await firstValueFrom(this.weaponService.getWeapon(id));
      this.weapon = weapon;
  
      // Met à jour le formulaire avec les données de l'arme
      if (this.weapon) {
        this.weaponForm.patchValue({
          name: this.weapon.name,
          attack_boost: this.weapon.attack_boost,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'arme', error);
    }
  }

// Méthode qui gère l'ajout d'une arme
async addWeapon() {
  const newWeapon = new Weapon(
    "",  // ID sera généré lors de l'ajout dans Firestore
    this.weaponForm.value.name ?? "",  // Conversion de `null` ou `undefined` en chaîne vide
    this.weaponForm.value.attack_boost ?? 0,

  );
  
  try {
    await this.weaponService.addWeapon(newWeapon);
    this.successMessage = "Arme créée avec succès !";  // Affichage du message de succès

    // Redirection après l'ajout de l'arme
    setTimeout(() => {
      this.router.navigate(['/weapon']);  
    }, 1500);  
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'arme:', error);
  }
}

// Méthode qui gère la mise à jour d'une arme existante
async updateWeapon() {
  if (this.weapon) {
    const updatedWeapon = new Weapon(
      this.weapon.id!,  // Utilise l'ID de l'arme existant
      this.weaponForm.value.name ?? "",  // Conversion de `null` ou `undefined` en chaîne vide
      this.weaponForm.value.attack_boost ?? 0,

    );
  
    try {
      await this.weaponService.updateWeapon(updatedWeapon);
      this.successMessage = "Arme mis à jour avec succès !";  // Affichage du message de succès

      // Redirection après la mise à jour de l'arme
      setTimeout(() => {
        this.router.navigate(['/weapon']);  // Redirige vers la liste des armes
      }, 1500);  
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'arme:', error);
    }
  }
}

goBack(): void {
  this.location.back();
}

}
