import { Component, OnInit, ViewChild, AfterViewInit, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Filiere } from 'src/app/modeles/filiere.model';
import { FiliereService } from 'src/app/services/filiere.service';


@Component({
  selector: 'app-new-filiere',
  templateUrl: './new-filiere.component.html',
  styleUrls: ['./new-filiere.component.css']
})
export class NewFiliereComponent implements OnInit {

	form: FormGroup;
	filiere:Filiere;
	progressBar:boolean=true;// active progreess barre for loading page
	progressBarQuery:boolean=false;// active progreess barre for query onSubmit

	monImage: string;

	account_validation_messages = {
		'libelle': [
		{ type: 'required', message: 'Le libelle est requis' }
		],
		'description': [
		{ type: 'required', message: 'la description est requis' }
		],
		'duree': [
		{ type: 'required', message: 'duree requis' },
		{ type: 'maxlength', message: '21 chiffre depasser' },
		{ type: 'minlength', message: '18 chiffre au minimum' }
		],
		'terms': [
		{ type: 'pattern', message: 'Vous devez accepter les termes et conditions' }
		]
	}

	constructor(private formBuilder: FormBuilder,
				private filiereService:FiliereService,
				public snackBar:MatSnackBar) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			libelle: ['', Validators.required],
			description: ['', Validators.required],
			duree: ['', Validators.required],
			// telephone: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.minLength(9)])],
			// email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}

	openSnackBar(message: string, action: string, duree: number){
		this.snackBar.open(message,action,{
			duration: duree,
		});
	}

	onSubmit(valueForm) {
		//console.log(valueForm);
		this.filiere = new Filiere();
		this.filiere.libelle = valueForm.libelle;
		this.filiere.description = valueForm.description;
		this.filiere.duree = valueForm.duree;
		// active progreess barre for query save
		this.progressBarQuery = true;
		this.filiereService.saveFiliere(this.filiere).subscribe(
			(data)=>{
				this.progressBarQuery = false;
				this.filiere = data;
				this.openSnackBar("enregistrement reussi","OK",7000);
				//this.router.navigate(["consultation"]);
			},
			(erreur)=>{
				this.progressBarQuery = false;
				console.log("erreur : "+JSON.stringify(erreur));
				switch (erreur.status) {
		          case 0:
		            this.openSnackBar("Erreur !!! : Pas de reponse. Veiller verifier le serveur svp","X",15000);
		            break;
		          case 403:
		            this.openSnackBar("Demande refusé : vous ne disposez pas des droits suffisants","X",15000);
		            break;
		          default:
		            this.openSnackBar("Erreur !!! : impossible d'enreg la filiere. Veiller reessayer","X",15000);
		            break;
		        }
			}
		);
	}// end onSubmit(valueForm)


	

}
