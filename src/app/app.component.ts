import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Filiere } from 'src/app/modeles/filiere.model';
import { FiliereService } from 'src/app/services/filiere.service';
import { AuthService } from './services/auth.service';

import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;
	filiereSearch:any;
	progressBar:boolean=true;// active progreess barre for loading page
	progressBarQuery:boolean=false;// active progreess barre for query onSubmit

  constructor(private formBuilder: FormBuilder,
              private filiereService:FiliereService,
              public snackBar:MatSnackBar,
              private router:Router, 
              public authService: AuthService, ) {
  }

    ngOnInit() {
      this.form = this.formBuilder.group({
        search: ['', Validators.required]
      });
    }

    /* openSnackBar(message: string, action: string, duree: number){
      this.snackBar.open(message,action,{
        duration: duree,
      });
    } */
  
    onSubmit(valueForm) {
      //console.log(valueForm);
      const search = valueForm.search;
      this.router.navigate(["detail-filiere",search]);
    }// end onSubmit(valueForm)


 

  
}
