import { Injectable } from '@angular/core';
import { Hero } from '../data/hero';
import { collection, collectionData, doc, docData, DocumentData } from '@angular/fire/firestore';
import { map, Observable, of  } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // URL d'accès aux documents sur Firebase
  private static url = 'heroes';

  constructor(private firestore: Firestore) { }

  getHeroes(): Observable<Hero[]> {
    const heroCollection = collection(this.firestore, HeroService.url);
    return collectionData(heroCollection, {idField: 'id' }).pipe(
      map( (documents : DocumentData[]) => {
        return documents.map((heroDocumentData) => {
          return HeroService.transformationToHero(heroDocumentData);
        });
      })) as Observable<Hero[]>;
  }

  getHero(id: string): Observable<Hero> {

    const heroDocument = doc(this.firestore, HeroService.url + "/" + id);

    return docData(heroDocument, { idField: 'id' }).pipe(
      map( (heroDocumentData: DocumentData) => {
        return HeroService.transformationToHero(heroDocumentData);
      })) as Observable<Hero>;
  }

  private static transformationToHero(heroDocumentData: DocumentData): Hero {

    // Conversion du document data en chaine JSON puis chargment de l'objet par défaut Hero
    let heroTmp: Hero = new Hero();
    heroTmp.fromJSON(JSON.stringify(heroDocumentData));
    return heroTmp;
  }

  private static transformationToJSON(hero: Hero): any {

    // Il n'est pas nécessaire d'evnoyer l'id dans le corps du document donc suppression de cette information
    // Création d'un JSON object en supprimant la propriété id
    let newHeroJSON = Object.assign({}, hero);   
    delete newHeroJSON.id;

    return newHeroJSON;
  }
}
