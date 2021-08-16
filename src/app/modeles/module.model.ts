import { Matiere } from "./matiere.model";
import { Niveau } from "./niveau.model";

export class Module {
    id:number=null;
	libelle:string="";
	description:string="";
	niveau:Niveau=null;
    matiere:Matiere[];
}
