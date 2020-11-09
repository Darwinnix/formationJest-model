import {Fonction} from './fonction';

export class Employee {
  id: number;
  nom: string;
  prenom: string;
  fonction: Fonction = new Fonction();
  dateArrivee: Date;
  dateDepart: Date;
  sexe: string;
}
