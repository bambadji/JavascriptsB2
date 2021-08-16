import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Niveau } from '../modeles/niveau.model';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

	constructor(private httpClient:HttpClient) { }

	getAllNiveau() {
		return this.httpClient.get<Niveau[]>("http://localhost:8080/api/niveau");
	}

	getNiveau(motCle:string,currentPage:number,size:number) {
		return this.httpClient
		.get<Niveau[]>("http://localhost:8080/api/chercherNiveau?mc="+motCle+"&size="+size+"&page="+currentPage);
	}


	saveNiveau(niveau:Niveau) {
		return this.httpClient.post<Niveau>("http://localhost:8080/api/niveau",niveau);
	}

	getOneNiveau(id:number) {
		return this.httpClient.get<Niveau>("http://localhost:8080/api/niveau/"+id);
	}

	updateNiveau(niveau:Niveau) {
		return this.httpClient.put<Niveau>("http://localhost:8080/api/niveau/"+niveau.id,niveau);
	}

	deleteNiveau(id:number) {
		return this.httpClient.delete<boolean>("http://localhost:8080/api/niveau/"+id);
	}

}
