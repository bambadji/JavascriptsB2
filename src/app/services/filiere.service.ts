import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Filiere } from '../modeles/filiere.model';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

	partieAfficheInAbout="normal";
	filiereSearch:any;

  constructor(private httpClient:HttpClient) { }

	getAllFiliere() {
		return this.httpClient.get<Filiere[]>("http://localhost:8080/api/filiere");
	}

	getFiliere(motCle:string,currentPage:number,size:number) {
		return this.httpClient
		.get<any[]>("http://localhost:8080/api/chercherFiliere?mc="+motCle+"&size="+size+"&page="+currentPage);
	}

	getOneFiliere(id:number) {
		return this.httpClient.get<Filiere>("http://localhost:8080/api/filiere/"+id);
	}

	saveFiliere(filiere:Filiere) {
		return this.httpClient.post<Filiere>("http://localhost:8080/api/filiere",filiere);
	}

	updateFiliere(filiere:Filiere) {
		return this.httpClient.put<Filiere>("http://localhost:8080/api/filiere/"+filiere.id,filiere);
	}

	deleteFiliere(id:number) {
		return this.httpClient.delete<boolean>("http://localhost:8080/api/filiere/"+id);
	}
}
