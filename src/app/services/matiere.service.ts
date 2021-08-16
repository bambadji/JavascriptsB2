import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Matiere } from '../modeles/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
	
	constructor(private httpClient:HttpClient) { }

	getAllMatiere() {
		return this.httpClient.get<Matiere[]>("http://localhost:8080/api/Matiere");
	}

	getMatiere(motCle:string,currentPage:number,size:number) {
		return this.httpClient
		.get<Matiere[]>("http://localhost:8080/api/chercherMatiere?mc="+motCle+"&size="+size+"&page="+currentPage);
	}


	saveMatiere(matiere:Matiere) {
		return this.httpClient.post<Matiere>("http://localhost:8080/api/matiere",matiere);
	}

	getOneMatiere(id:number) {
		return this.httpClient.get<Matiere>("http://localhost:8080/api/matiere/"+id);
	}

	updateMatiere(matiere:Matiere) {
		return this.httpClient.put<Matiere>("http://localhost:8080/api/matiere/"+matiere.id,matiere);
	}

	deleteMatiere(id:number) {
		return this.httpClient.delete<boolean>("http://localhost:8080/api/matiere/"+id);
	}

}
