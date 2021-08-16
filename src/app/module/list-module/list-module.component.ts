import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ModuleService } from 'src/app/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

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
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.css']
})
export class ListModuleComponent implements OnInit {

  chargement:boolean=true;// active progreess spinner for loading list
	suppression:boolean=false;// active glyphicon refrech for delete

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	//displayedColumns = ['id', 'nom', 'patient', 'action'];
	displayedColumns = ['id', 'libelle', 'description', 'action'];
	//dataSource = new MatTableDataSource();
	dataSource:MatTableDataSource<any>;
	
	constructor(private moduleService:ModuleService,  
              private router:Router, 
              public dialog : MatDialog, 
              public snackBar:MatSnackBar,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

                iconRegistry.addSvgIconLiteral('thumbs-up1', sanitizer.bypassSecurityTrustHtml(ICON_EDIT));
                iconRegistry.addSvgIconLiteral('thumbs-up2', sanitizer.bypassSecurityTrustHtml(ICON_DELL));
        }

  ngOnInit(): void {
		this.doGetAll();
	}

	doGetAll(){
		this.moduleService.getAllModule().subscribe(
			(data)=>{
				console.log(data);
				//this.dataSource.data = data;
				this.chargement =false;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			(erreur)=>{
				this.chargement =false;
				console.log("erreur : "+JSON.stringify(erreur));
				switch (erreur.status) {
		          case 0:
		            this.openSnackBar("Erreur !!! : Pas de reponse. Veiller verifier votre connexion svp","X",15000);
		            break;
		          case 403:
		            this.openSnackBar("Accés interdit : vous ne disposez pas des droits suffisants","X",15000);
		            break;
		          default:
		            this.openSnackBar("Erreur !!! : impossible de recuperer les modules. Veiller reessayer","X",15000);
		            break;
		        }
			}
		);
		
	}

	goToPageEdit(id:number){
		this.router.navigate(["edit-module",id]);
	}

	openSnackBar(message: string, action: string, duree: number){
		this.snackBar.open(message,action,{
			duration: duree,
		});
	}

	onDelete(id:number){
		let title = "ATTENTION !!!";
		let message = "Voulez vous vraiment supprimer ce Module"
		this.showAlertDelete(id, title, message);
	}

	showAlertDelete(id:number, myTitle:string,myMessage:string) : void {
		const dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {title: myTitle, message: myMessage},
			width : '350px'
		});
		dialogRef.afterClosed().subscribe(
	        data => {
	        	console.log("Dialog output:", data);
	        	if (data == true) {
	        		this.suppression =true;
	        		this.moduleService.deleteModule(id).subscribe(
						(data)=>{
							this.suppression =false;
							this.doGetAll();
							this.openSnackBar("Succés : Module supprimer","OK",3000);
						},
						(erreur)=>{
							this.suppression =false;
							console.log("erreur : "+JSON.stringify(erreur));
							switch (erreur.status) {
					          case 0:
					            this.openSnackBar("Erreur !!! : Pas de reponse. Veiller verifier votre connexion svp","X",15000);
					            break;
					          case 403:
					            this.openSnackBar("Demande refusé : vous ne disposez pas des droits suffisants","X",15000);
					            break;
					          case 500:
					          	let message = erreur.error.message;
					          	let word = "ConstraintViolationException";
					          	if (message.includes(word)) {
					          		this.openSnackBar("Impossible de supprimer ou de mettre à jour une ligne: une contrainte de clé étrangère échoue","X",15000);
					          	}else{
					          		this.openSnackBar("Attention ! : nous n'avons pas pu exécuter l'instruction","X",15000);
					          	}
					            break;
					          default:
					            this.openSnackBar("Erreur !!! : impossible de supprimer cet module. Veiller reessayer","X",15000);
					            break;
		        			}
						}
					);

	        	}
	        }
	    );    
	}


	

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

	rowClicked(row: any): void {
	    console.log(row);
	}

}
