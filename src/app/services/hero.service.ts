import { Injectable } from '@angular/core';
import { Hero } from '../data/hero';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, DocumentData } from '@angular/fire/firestore';
import { map, Observable, of  } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // URL to access firebase documents
  private static url = 'heroes';

  constructor(private firestore: Firestore) { }

/**
 * Retrieves a list of Hero documents from Firebase and returns them as an observable.
 * 
 * This method connects to Firestore, retrieves all documents from the Hero collection, 
 * and transforms each document into a `Hero` instance using the `transformationToHero` method. 
 * The result is returned as an `Observable` that emits an array of `Hero` objects.
 * 
 * @returns {Observable<Hero[]>} - An `Observable` that emits an array of `Hero` objects, 
 *                                 each transformed from the raw Firestore document data.
 * 
 * @throws {Error} - Throws an error if there is an issue retrieving the documents from Firestore, 
 *                   such as network issues, permission issues, or if the collection is empty.
 */
getHeroes(): Observable<Hero[]> {
  // Firebase connection and return collection data, then map a document
  const heroCollection = collection(this.firestore, HeroService.url);
  return collectionData(heroCollection, { idField: 'id' }).pipe(
    map((documents: DocumentData[]) => {
      return documents.map((heroDocumentData) => {
        return HeroService.transformationToHero(heroDocumentData); // transformation to an object Hero
      });
    })) as Observable<Hero[]>; 
}


/**
 * Retrieves a Hero document from Firebase using its `id` and returns it as an observable.
 * 
 * This method connects to Firestore using the provided `id`, retrieves the document data, 
 * and transforms it into a `Hero` instance using the `transformationToHero` method. The 
 * result is returned as an `Observable` that emits the transformed `Hero` object.
 * 
 * @param {string} id - The `id` of the Hero document to retrieve from the Firestore collection.
 * 
 * @returns {Observable<Hero>} - An `Observable` that emits a single `Hero` object with the 
 *                               data retrieved from Firestore, including the `id` field.
 * 
 * @throws {Error} - Throws an error if there is an issue retrieving the document from Firestore
 *                   (e.g., document not found, network issues, etc.).
 */
getHero(id: string): Observable<Hero> {
  // Firebase connection and return document data
  const heroDocument = doc(this.firestore, HeroService.url + "/" + id);
  return docData(heroDocument, { idField: 'id' }).pipe(
    map( (heroDocumentData: DocumentData) => {
      return HeroService.transformationToHero(heroDocumentData); // transformation to an object Hero
    })) as Observable<Hero>;
}

  
/**
 * Asynchronously deletes a Hero document from the Firebase collection.
 * 
 * This method accepts the `id` of the `Hero` document to be deleted, locates the 
 * document in Firestore, and attempts to delete it. If the operation is successful, 
 * the document is removed from the collection. If there is an error, it throws an exception.
 * 
 * @param {string} id - The `id` of the Hero document to be deleted from the Firestore collection.
 * 
 * @returns {Promise<void>} - A promise that resolves once the document is successfully deleted.
 *                             It does not return any value.
 * 
 * @throws {Error} - Throws an error if there is an issue deleting the document from Firestore,
 *                   such as network or permission issues, or if the document cannot be found.
 */
async deleteHero(id: string): Promise<void> {
  // Find the hero in firebase thanks to the URL
  const heroDocument = doc(this.firestore, `${HeroService.url}/${id}`);
  
  try {
    // Delete the document
    await deleteDoc(heroDocument);
  } catch (error) {
    // Throw the error if something goes wrong
    throw error;
  }
}

 /**
 * Asynchronously adds a new Hero document to the Firebase collection.
 * 
 * This method creates a new instance of the `Hero` class, transforms it into
 * a plain JavaScript object (excluding the `id` property), and adds it to the
 * Firestore collection. Once the document is successfully added, it sets the 
 * `id` property of the `Hero` instance to the generated document ID from Firestore.
 * 
 * @returns {Promise<Hero>} - A promise that resolves to the newly created `Hero` 
 *                             instance, including its generated `id` from Firestore.
 * 
 * @throws {Error} - Throws an error if there is an issue adding the document to 
 *                   Firestore or if the operation fails for any reason.
 */
async addHero(): Promise<Hero> {
  // Connect to the firebase collection
  const heroCollection = collection(this.firestore, HeroService.url);
  
  // Initialize a new hero
  let hero: Hero = new Hero();
  
  try {
    // Add the document to Firestore
    const heroDocument = await addDoc(heroCollection, HeroService.transformationToJSON(hero));
    
    // Set the ID of the new hero
    hero.id = heroDocument.id;
    return hero;
  } catch (error) {
    // Throw the error if something goes wrong
    throw error;
  }
}
  
/**
 * Transforms a Firebase document into a Hero instance.
 * 
 * This private method takes raw document data from Firebase and converts it into 
 * a `Hero` instance. It first ensures that the provided data is a valid object, 
 * then attempts to parse the data into a `Hero` object using the `fromJSON` method.
 * 
 * @param {DocumentData} heroDocumentData - The raw document data from Firebase,
 *                                          typically retrieved from a HeroService method.
 * @returns {Hero} - An instance of the `Hero` class populated with the data
 *                   from the provided `heroDocumentData`.
 * 
 * @throws {Error} - Throws an error if the provided document data is invalid or
 *                   if there is a failure in transforming the data into a Hero object.
 */
private static transformationToHero(heroDocumentData: DocumentData): Hero {
  // Ensure that heroDocumentData is a valid object
  if (!heroDocumentData || typeof heroDocumentData !== 'object') {
      throw new Error('Invalid hero document data provided');
  }

  // Create a new Hero instance
  const heroTmp: Hero = new Hero();

  // Convert to JSON string and apply transformation
  try {
      // Convert the data to a JSON string (because fromJSON (in hero.ts) expects a string)
      const jsonString = JSON.stringify(heroDocumentData);
      heroTmp.fromJSON(jsonString);
  } catch (error) {
      throw new Error('Failed to transform document data to Hero object: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }

  return heroTmp;
}

/**
 * Transforms a Hero object into a plain JavaScript object (JSON).
 * Excludes the `id` property from the serialized object.
 *
 * This method creates a shallow copy of the provided `Hero` object and removes
 * the `id` property, which is typically not needed when sending data to the
 * database or API.
 * 
 * @param {Hero} hero - The Hero object to be transformed into a JSON object.
 * @returns {any} - A plain JavaScript object (JSON) representing the Hero,
 *                  excluding the `id` property.
 * 
 * @throws {Error} - Throws an error if the provided `hero` is not a valid
 *                   object.
 */
private static transformationToJSON(hero: Hero): any {

  let newHeroJSON = Object.assign({}, hero);   
  delete newHeroJSON.id;
  return newHeroJSON;
}

}
