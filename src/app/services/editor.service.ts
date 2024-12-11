import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor(
    private firestore: Firestore, 
    private heroService: HeroService
  ) {}

  async assignWeaponToHero(heroId: string, weaponId: string): Promise<void> {
    try {
      // Référence au document du héros directement dans la collection des héros
      const heroRef = doc(this.firestore, 'heroes', heroId);
      
      // Mettre à jour le document du héros avec l'ID de l'arme
      await updateDoc(heroRef, { weaponID: weaponId });
      
      console.log(`Arme ${weaponId} assignée au héros ${heroId}`);
    } catch (error) {
      console.error('Erreur lors de l\'assignation de l\'arme:', error);
      throw error;
    }
  }
}