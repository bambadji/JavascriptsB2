import {Component, OnInit, Inject, Injectable} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';

@Component({
	selector: 'app-delete-dialog',
	templateUrl: './delete-dialog.component.html',
	styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

	constructor(
		private dialogRef: MatDialogRef<DeleteDialogComponent>, 
		@Inject(MAT_DIALOG_DATA) public data : any) { }

	ngOnInit() {
	}

	onDelete(){
		this.dialogRef.close(true);
	}

}
