import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../modeles/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

	getAllUser() {
		return this.httpClient.get<User[]>("http://localhost:8080/api/user");
	}

	getUser(motCle:string,currentPage:number,size:number) {
		return this.httpClient
		.get<User[]>("http://localhost:8080/api/chercherUser?mc="+motCle+"&size="+size+"&page="+currentPage);
	}


	saveUser(user:User) {
		return this.httpClient.post<User>("http://localhost:8080/api/user",user);
	}

	getOneUser(id:number) {
		return this.httpClient.get<User>("http://localhost:8080/api/user/"+id);
	}

	updateUser(user:User) {
		return this.httpClient.put<User>("http://localhost:8080/api/user/"+user.id,user);
	}

	deleteUser(id:number) {
		return this.httpClient.delete<boolean>("http://localhost:8080/api/user/"+id);
	}

}
