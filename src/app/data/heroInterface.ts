export interface HeroInterface {
    id: string | undefined;
    name: string;
    attaque: number;
    esquive: number;
    degats: number;
    pv: number;
    weaponID?: string;
    [key: string]: any;
  }
  