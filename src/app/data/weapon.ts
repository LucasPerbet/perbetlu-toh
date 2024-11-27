import { WeaponInterface } from "./weaponInterface";

export class Weapon implements WeaponInterface {

    id: string | undefined;
    name: string;
    attack_boost: number;

    constructor(id: string = "id_test", name: string = "Faux", attack_boost: number = 10){
        this.id = id;
        this.name = name;
        this.attack_boost = attack_boost;
    }
    

    fromJSON(jsonStr: string): void {

        let jsonObj = JSON.parse(jsonStr);
        for (const propName in jsonObj) {
            (this as any)[propName] = jsonObj[propName];
        }
    }
}