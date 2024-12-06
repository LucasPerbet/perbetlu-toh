import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { HeroInterface } from '../data/heroInterface';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private static url = 'editor';

  constructor(private firestore: Firestore) {}

  async assignWeaponToHero(heroId: string, weaponId: string): Promise<void> {

      // Référence au document du héros
      const heroRef = doc(this.firestore, EditorService.url + "/" + heroId);
      // Mise à jour ou création du document avec l'ID de l'arme
      await setDoc(heroRef, { weaponId }, { merge: true }); // merge:true permet d'ajouter ou modifier uniquement cette propriété
      console.log(`Arme ${weaponId} assignée au héros ${heroId}`);
  }
}
