import { Niveau } from "./niveau.model";

export class Filiere {
    id:number = null;
	libelle:string="";
	description:string="";
	duree:string="";
	niveau:Niveau[];
}
