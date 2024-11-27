import { Injectable } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Weapon } from '../data/weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  // URL d'accès aux documents sur Firebase
  private static url = 'weapons';

  constructor(private firestore: Firestore) { }

  getWeapons() {
    const weaponCollection = collection(this.firestore, WeaponService.url);
    return collectionData(weaponCollection, {idField: 'id' }).pipe(
      map( (documents : DocumentData[]) => {
        return documents.map((weaponDocumentData) => {
          return WeaponService.transformationToWeapon(weaponDocumentData);
        });
      })) as Observable<Weapon[]>;
  }

  private static transformationToWeapon(weaponDocumentData: DocumentData): Weapon {
    // Vérification de l'existence des données
    if (!weaponDocumentData || typeof weaponDocumentData !== 'object') {
        throw new Error('Invalid Weapon document data provided');
    }
    // Création de l'instance Weapon
    const weaponTmp: Weapon = new Weapon();
    // Mapping direct des propriétés si Weapon possède une méthode dédiée
    try {
        weaponTmp.fromJSON(JSON.stringify(weaponDocumentData)); // Si le JSON est correct
    } catch (error) {
        throw new Error('Failed to transform document data to Weapon object');
    }
    return weaponTmp;
}
}
