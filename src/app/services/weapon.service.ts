import { Injectable } from '@angular/core';
import { collection, collectionData, DocumentData, Firestore, doc, docData, deleteDoc, addDoc, setDoc } from '@angular/fire/firestore';
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

  getWeapon(id: string): Observable<Weapon> {
    // Firebase connection and return document data
    const weaponDocument = doc(this.firestore, WeaponService.url + "/" + id);
    return docData(weaponDocument, { idField: 'id' }).pipe(
      map( (weaponDocumentData: DocumentData) => {
        return WeaponService.transformationToWeapon(weaponDocumentData); // transformation to an object weapon
      })) as Observable<Weapon>;
  }

  async deleteWeapon(id: string): Promise<void> {
    // Find the weapon in firebase thanks to the URL
    const weaponDocument = doc(this.firestore, `${WeaponService.url}/${id}`);
    
    try {
      // Delete the document
      await deleteDoc(weaponDocument);
    } catch (error) {
      // Throw the error if something goes wrong
      throw error;
    }
  }
  

  async addWeapon(weapon: Weapon): Promise<Weapon> {
    const weaponCollection = collection(this.firestore, WeaponService.url);
  
    try {
      // Ajoute un document dans la collection
      const docRef = await addDoc(weaponCollection, WeaponService.transformationToJSON(weapon));
      
      // Ajoute l'ID généré par Firestore à l'objet weapon
      weapon.id = docRef.id;
  
      // Retourne l'arme 'avec l'ID ajouté
      return weapon;
    } catch (error) {
      console.error('Error adding weapon: ', error);
      throw error; // Lève l'exception si une erreur se produit
    }
  }

  async updateWeapon(weapon: Weapon): Promise<void> {
    const weaponDocument = doc(this.firestore, `${WeaponService.url}/${weapon.id}`);
  
    try {
      // Mise à jour du document avec le héros
      await setDoc(weaponDocument, WeaponService.transformationToJSON(weapon), { merge: true });
    } catch (error) {
      console.error('Error updating weapon: ', error);
      throw error; // Lève l'exception si une erreur se produit
    }
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

private static transformationToJSON(weapon: Weapon): any {

  let newWeaponJSON = Object.assign({}, weapon);   
  delete newWeaponJSON.id;
  return newWeaponJSON;
}
}
