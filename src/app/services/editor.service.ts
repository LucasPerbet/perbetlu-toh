import { Injectable } from '@angular/core';
import { Firestore , collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private firestore : Firestore) { }

  async assignWeaponToHero(heroId: string, weaponId: string): Promise<void> {
    try {
      // Récupérer le héros
      const heroRef = this.firestore.collection('heroes').doc(heroId);
      await heroRef.update({
        weaponId: weaponId // Ajout de l'ID de l'arme au document du héros
      });
      console.log(`Arme ${weaponId} assignée au héros ${heroId}`);
    } catch (error) {
      console.error('Erreur lors de l\'assignation de l\'arme au héros', error);
    }
  }

  async getHeroWithWeapon(heroId: string): Promise<void> {
    try {
      // Récupérer les informations du héros
      const heroDoc = await this.firestore.collection('heroes').doc(heroId).get().toPromise();
      const hero = heroDoc.data();
  
      if (hero && hero.weaponId) {
        // Récupérer l'arme associée au héros
        const weaponDoc = await this.firestore.collection('weapons').doc(hero.weaponId).get().toPromise();
        const weapon = weaponDoc.data();
        
        console.log('Héros:', hero);
        console.log('Arme:', weapon);
      } else {
        console.log('Aucune arme assignée à ce héros');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du héros et de son arme', error);
    }
  }
  
  
}
