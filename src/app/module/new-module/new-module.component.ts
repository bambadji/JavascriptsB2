import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Module } from 'src/app/modeles/module.model';
import { ModuleService } from 'src/app/services/module.service';

import { Niveau } from 'src/app/modeles/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';

@Component({
  selector: 'app-new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit {

  form: FormGroup;
	module:Module;
	allNiveau:Niveau[];
	progressBarQuery:boolean=false;// active progreess barre for query onSubmit

  constructor(private formBuilder: FormBuilder,
              private moduleService:ModuleService,
              private niveauService:NiveauService,
              public snackBar:MatSnackBar) { 
  }


  ngOnInit() : void {
    this.getAllNiveau();
		this.form = this.formBuilder.group({
			libelle: ['', Validators.required],
			description: ['', Validators.required],
			niveau: ['', Validators.required],
			// telephone: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.minLength(9)])],
			// email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}

	openSnackBar(message: string, action: string, duree: number){
		this.snackBar.open(message,action,{
			duration: duree,
		});
	}

  getAllNiveau(){
		this.niveauService.getAllNiveau().subscribe(
			(data)=>{
				this.allNiveau = data;
			},
			(erreur)=>{
				this.progressBarQuery = false;
				console.log("erreur : "+JSON.stringify(erreur));
					switch (erreur.status) {
			          case 0:
			          	this.openSnackBar("Erreur : connexion refuser. Veiller verifier votre connexion internet svp","X",15000);
			            break;
			          case 403:
			            this.openSnackBar("Accés interdit : vous ne disposez pas des droits suffisants","X",15000);
			            //this.authenticationService.goBack();
			            break;
			          default:
			            this.openSnackBar("Erreur ! : impossible de recuperer les no. dossiers. Veiller reessayer","X",15000);
			            break;
			        }
			}
		);
	}

	onSubmit(valueForm) {
		//console.log(valueForm);
		this.module = new Module();
		this.module.libelle = valueForm.libelle;
		this.module.description = valueForm.description;
		this.module.niveau = new Niveau();
		let niveau = this.allNiveau.find(p => p.id == valueForm.niveau);
		this.module.niveau.id = +niveau.id;
		// active progreess barre for query save
		this.progressBarQuery = true;
		this.moduleService.saveModule(this.module).subscribe(
			(data)=>{
				this.progressBarQuery = false;
				this.module = data;
        console.log(this.module);
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
		            this.openSnackBar("Erreur !!! : impossible d'enreg la module. Veiller reessayer","X",15000);
		            break;
		        }
			}
		);
	}// end onSubmit(valueForm)

}
