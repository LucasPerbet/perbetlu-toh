import {HeroInterface} from "./heroInterface";

export class Hero implements HeroInterface{

  id: string | undefined;
  name: string;
  attaque: number;
  esquive: number;
  degats: number;
  pv: number;
  weaponID: string;

  constructor(id: string = "id_test", name: string = "Doe", attaque: number = 10, esquive: number = 10, degats: number = 10, pv: number = 10, weaponID: string ="") {
    this.id = id;
    this.name = name;
    this.attaque = attaque;
    this.esquive = esquive;
    this.degats = degats;
    this.pv = pv;
    this.weaponID = weaponID;
  }

  ajoutDegat() {
    this.degats = this.degats + 10;
  }

  ajoutpv() {
    this.pv = this.pv + 10;
  }

  isValide(): boolean {
    return  (this.attaque >= 1)
            && (this.esquive >= 1)
            && (this.degats >= 1)
            && (this.pv >= 1)
            && (this.attaque + this.esquive + this.degats + this.pv) <= 40 ;
  }


  fromJSON(jsonStr: string): void {

    let jsonObj = JSON.parse(jsonStr);
    for (const propName in jsonObj) {
      (this as any)[propName] = jsonObj[propName];
    }
  }
}
