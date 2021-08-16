import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Niveau } from 'src/app/modeles/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';
import { Filiere } from 'src/app/modeles/filiere.model';
import { FiliereService } from 'src/app/services/filiere.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-niveau',
  templateUrl: './edit-niveau.component.html',
  styleUrls: ['./edit-niveau.component.css']
})
export class EditNiveauComponent implements OnInit {


  form: FormGroup;
	niveau:Niveau;
	allFiliere:Filiere[];
	progressBarQuery:boolean=false;// active progreess barre for query onSubmit

	constructor(private formBuilder: FormBuilder,
              private niveauService:NiveauService,
              private filiereService:FiliereService,
              private activatedRoute:ActivatedRoute, 
              private router:Router,
              private location: Location,
              public snackBar:MatSnackBar) { 
          
          this.createForm();
          this.getAllFiliere();
  }

  createForm(){
		this.form = this.formBuilder.group({
			id: ['', Validators.required],
			libelle: ['', Validators.required],
			description: ['', Validators.required],
      filiere: ['', Validators.required]
		});
	}

  getAllFiliere(){
		this.filiereService.getAllFiliere().subscribe(
			(data)=>{
				this.allFiliere = data;
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
		this.niveauService.getOneNiveau(id).subscribe(
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



	createFormWithDefaultData(a: Niveau) {
		//this.cForm.patchValue(c); 	  
		this.form.patchValue({
			id: a.id,
			libelle: a.libelle,
			description: a.description,
      filiere: a.filiere.id
		}); 
	}

	openSnackBar(message: string, action: string, duree: number){
		this.snackBar.open(message,action,{
			duration: duree,
		});
	}

	onSubmit(valueForm) {
		//console.log(valueForm);
		this.niveau = new Niveau();
    this.niveau.id = valueForm.id;
		this.niveau.libelle = valueForm.libelle;
		this.niveau.description = valueForm.description;
		this.niveau.filiere = new Filiere();
		let filiere = this.allFiliere.find(p => p.id == valueForm.filiere);
		this.niveau.filiere.id = +filiere.id;
		// active progreess barre for query save
		this.progressBarQuery = true;
		this.niveauService.updateNiveau(this.niveau).subscribe(
			(data)=>{
				this.progressBarQuery = false;
				this.openSnackBar("Succés : modification réussi","OK",7000);
				this.router.navigate(["list-niveau"]);
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
		            this.openSnackBar("Erreur !!! : impossible d'enreg la niveau. Veiller reessayer","X",15000);
		            break;
		        }
			}
		);
	}// end onSubmit(valueForm)

  goBack() {
		this.location.back(); // <-- go back to previous location on cancel
	}

}
