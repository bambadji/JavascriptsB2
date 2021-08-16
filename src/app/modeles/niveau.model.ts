import { Filiere } from "./filiere.model";
import { Module } from "./module.model";

export class Niveau {
    id:number=null;
	libelle:string="";
	description:string="";
	filiere:Filiere=null;
	module:Module[];
}
