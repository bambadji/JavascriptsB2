import { Component, OnInit, ViewChild, AfterViewInit, ElementRef  } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Filiere } from 'src/app/modeles/filiere.model';
import { FiliereService } from 'src/app/services/filiere.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-filiere',
  templateUrl: './edit-filiere.component.html',
  styleUrls: ['./edit-filiere.component.css']
})
export class EditFiliereComponent implements OnInit {

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
				private activatedRoute:ActivatedRoute, 
				private router:Router,
        private location: Location,
				public snackBar:MatSnackBar) { 
          
          this.createForm();
  }

  createForm(){
		this.form = this.formBuilder.group({
			id: ['', Validators.required],
			libelle: ['', Validators.required],
			description: ['', Validators.required],
      duree: ['', Validators.required]
		});
	}

	ngOnInit() {
		const id = this.activatedRoute.snapshot.params['id'];
		this.filiereService.getOneFiliere(id).subscribe(
			(data)=>{
				//console.log(data);
				this.createFormWithDefaultData(data);
			},
			(erreur)=>{
				console.log("erreur : "+JSON.stringify(erreur));
				switch (erreur.status) {
		          case 0:
		            this.openSnackBar("Erreur : connexion refuser.Veiller verifier votre connexion internet svp","X",15000);
		            break;
		          case 403:
		            this.openSnackBar("Accés interdit : vous ne disposez pas des droits suffisants","X",15000);
		            break;
		          default:
		            this.openSnackBar("Erreur ! : impossible de recuperer l'allergie.Veiller reessayer","X",15000);
		            break;
		        }
			}
		);
		
	}

	createFormWithDefaultData(a: Filiere) {
		//this.cForm.patchValue(c); 	  
		this.form.patchValue({
			id: a.id,
			libelle: a.libelle,
			description: a.description,
      duree: a.duree,
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
    this.filiere.id = valueForm.id;
		this.filiere.libelle = valueForm.libelle;
		this.filiere.description = valueForm.description;
		this.filiere.duree = valueForm.duree;
		// active progreess barre for query save
		this.progressBarQuery = true;
		this.filiereService.updateFiliere(this.filiere).subscribe(
			(data)=>{
				this.progressBarQuery = false;
				this.openSnackBar("Succés : modification réussi","OK",7000);
				this.router.navigate(["list-filiere"]);
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

  goBack() {
		this.location.back(); // <-- go back to previous location on cancel
	}

}
