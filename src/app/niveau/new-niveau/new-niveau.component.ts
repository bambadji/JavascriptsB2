import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Niveau } from 'src/app/modeles/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';

import { Filiere } from 'src/app/modeles/filiere.model';
import { FiliereService } from 'src/app/services/filiere.service';

@Component({
  selector: 'app-new-niveau',
  templateUrl: './new-niveau.component.html',
  styleUrls: ['./new-niveau.component.css']
})
export class NewNiveauComponent implements OnInit, AfterContentInit {

  form: FormGroup;
	niveau:Niveau;
	allFiliere:Filiere[];
	progressBarQuery:boolean=false;// active progreess barre for query onSubmit

  constructor(private formBuilder: FormBuilder,
              private niveauService:NiveauService,
              private filiereService:FiliereService,
              public snackBar:MatSnackBar) { 
    
      this.progressBarQuery=true;////////////
  }


  ngOnInit() : void {
    this.getAllFiliere();
		this.form = this.formBuilder.group({
			libelle: ['', Validators.required],
			description: ['', Validators.required],
			filiere: ['', Validators.required],
			// telephone: ['', Validators.compose([Validators.required, Validators.maxLength(9), Validators.minLength(9)])],
			// email: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}

  ngAfterContentInit(): void {
    this.progressBarQuery=false;
  }

	openSnackBar(message: string, action: string, duree: number){
		this.snackBar.open(message,action,{
			duration: duree,
		});
	}

  getAllFiliere(){
		this.filiereService.getAllFiliere().subscribe(
			(data)=>{
				this.allFiliere = data;
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
		this.niveau = new Niveau();
		this.niveau.libelle = valueForm.libelle;
		this.niveau.description = valueForm.description;
		this.niveau.filiere = new Filiere();
		let filiere = this.allFiliere.find(p => p.id == valueForm.filiere);
		this.niveau.filiere.id = +filiere.id;
		// active progreess barre for query save
		this.progressBarQuery = true;
		this.niveauService.saveNiveau(this.niveau).subscribe(
			(data)=>{
				this.progressBarQuery = false;
				this.niveau = data;
        console.log(this.niveau);
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
		            this.openSnackBar("Erreur !!! : impossible d'enreg la niveau. Veiller reessayer","X",15000);
		            break;
		        }
			}
		);
	}// end onSubmit(valueForm)

}
