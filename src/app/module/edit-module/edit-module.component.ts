import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Module } from 'src/app/modeles/module.model';
import { ModuleService } from 'src/app/services/module.service';
import { Niveau } from 'src/app/modeles/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {

  form: FormGroup;
	module:Module;
	allNiveau:Niveau[];
	progressBarQuery:boolean=false;// active progreess barre for query onSubmit

	constructor(private formBuilder: FormBuilder,
              private moduleService:ModuleService,
              private niveauService:NiveauService,
              private activatedRoute:ActivatedRoute, 
              private router:Router,
              private location: Location,
              public snackBar:MatSnackBar) { 
          
          this.createForm();
          this.getAllNiveau();
  }

  createForm(){
		this.form = this.formBuilder.group({
			id: ['', Validators.required],
			libelle: ['', Validators.required],
			description: ['', Validators.required],
      niveau: ['', Validators.required]
		});
	}

  getAllNiveau(){
		this.niveauService.getAllNiveau().subscribe(
			(data)=>{
				this.allNiveau = data;
			},
			(erreur)=>{
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

	ngOnInit() {
		const id = this.activatedRoute.snapshot.params['id'];
		this.moduleService.getOneModule(id).subscribe(
			(data)=>{
				console.log(data);
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



	createFormWithDefaultData(a: Module) {
		//this.cForm.patchValue(c); 	  
		this.form.patchValue({
			id: a.id,
			libelle: a.libelle,
			description: a.description,
      niveau: a.niveau.id
		}); 
	}

	openSnackBar(message: string, action: string, duree: number){
		this.snackBar.open(message,action,{
			duration: duree,
		});
	}

	onSubmit(valueForm) {
		//console.log(valueForm);
		this.module = new Module();
    this.module.id = valueForm.id;
		this.module.libelle = valueForm.libelle;
		this.module.description = valueForm.description;
		this.module.niveau = new Niveau();
		let niveau = this.allNiveau.find(p => p.id == valueForm.niveau);
		this.module.niveau.id = +niveau.id;
		// active progreess barre for query save
		this.progressBarQuery = true;
		this.moduleService.updateModule(this.module).subscribe(
			(data)=>{
				this.progressBarQuery = false;
				this.openSnackBar("Succés : modification réussi","OK",7000);
				this.router.navigate(["list-module"]);
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

  goBack() {
		this.location.back(); // <-- go back to previous location on cancel
	}

}
