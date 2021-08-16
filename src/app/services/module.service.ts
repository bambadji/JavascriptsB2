import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Module } from '../modeles/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

	constructor(private httpClient:HttpClient) { }

	getAllModule() {
		return this.httpClient.get<Module[]>("http://localhost:8080/api/module");
	}

	getModule(motCle:string,currentPage:number,size:number) {
		return this.httpClient
		.get<Module[]>("http://localhost:8080/api/chercherModule?mc="+motCle+"&size="+size+"&page="+currentPage);
	}


	saveModule(module:Module) {
		return this.httpClient.post<Module>("http://localhost:8080/api/module",module);
	}

	getOneModule(id:number) {
		return this.httpClient.get<Module>("http://localhost:8080/api/module/"+id);
	}

	updateModule(module:Module) {
		return this.httpClient.put<Module>("http://localhost:8080/api/module/"+module.id,module);
	}

	deleteModule(id:number) {
		return this.httpClient.delete<boolean>("http://localhost:8080/api/module/"+id);
	}

}
