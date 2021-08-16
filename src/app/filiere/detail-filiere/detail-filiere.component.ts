import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FiliereService } from "../../services/filiere.service";
import { interval, Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-filiere',
  templateUrl: './detail-filiere.component.html',
  styleUrls: ['./detail-filiere.component.css']
})
export class DetailFiliereComponent implements OnInit {

  filiereSearch:any;
  search:any; 

  subscription: Subscription;
  intervalId:number;

  constructor(private filiereService:FiliereService,
              public snackBar:MatSnackBar,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const source = interval(15000);
    const text = 'Your Text Here';
    //this.subscription = source.subscribe(val => this.getFiliere(text));
    this.getFiliere(text);
    
  }

  openSnackBar(message: string, action: string, duree: number){
    this.snackBar.open(message,action,{
      duration: duree,
    });
  }

  getFiliere(text) {
    // I've just commented this so that you're not bombarded with an alert.
    // alert(text);
    console.log(text);
    const search = this.activatedRoute.snapshot.params['search'];
    const page = 0;
    const size= 5;
    this.filiereService.getFiliere(search, page, size).subscribe(
      (data)=>{
        this.filiereSearch = data;
        //this.filiereService.filiereSearch = data;
        console.log(data);
      },
      (erreur)=>{
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
  }

  ngOnDestroy() {
    // For method 1
    this.subscription && this.subscription.unsubscribe();
  }


  

}
