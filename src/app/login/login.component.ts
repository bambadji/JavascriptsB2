import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { User } from "../modeles/user.model";

import {MatSnackBar} from '@angular/material/snack-bar';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

// MES ICON 
const ICON_EDIT = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
`;

const ICON_DELL = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private user:User;
  mode:number=0;
  progressBarQuery:boolean=false;// active progreess barre for query onSubmit
  hide = true;


  constructor(private authService:AuthService,
              private router : Router,
              public snackBar:MatSnackBar,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

    iconRegistry.addSvgIconLiteral('thumbs-up1', sanitizer.bypassSecurityTrustHtml(ICON_EDIT));
    iconRegistry.addSvgIconLiteral('thumbs-up2', sanitizer.bypassSecurityTrustHtml(ICON_DELL));
  }

  ngOnInit(): void {
  }

  myFunction() {
    this.hide = !this.hide;
  }


  onLogin(dataForm) {
    //console.log(dataForm);
    this.user = new User();
    this.user.login = dataForm.login;
    this.user.password = dataForm.password;
    //console.log(this.user);
    this.progressBarQuery = true;
    this.authService.login(this.user);
    if (this.authService.login(this.user)) {
      this.router.navigate(["home"]);
    } else {
      this.progressBarQuery = false;
      this.openSnackBar("Login ou password Invalide","X",5000);
      
    }
  }

  openSnackBar(message: string, action: string, duree: number){
		this.snackBar.open(message,action,{
			duration: duree,
		});
	}


}
