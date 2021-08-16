import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FiliereService } from './services/filiere.service';
import { UserService } from './services/user.service';
import { MatiereService } from './services/matiere.service';
import { ModuleService } from './services/module.service';
import { NiveauService } from './services/niveau.service';
import { AuthService } from './services/auth.service';
import { ListMatiereComponent } from './matiere/list-matiere/list-matiere.component';
import { NewMatiereComponent } from './matiere/new-matiere/new-matiere.component';
import { EditMatiereComponent } from './matiere/edit-matiere/edit-matiere.component';
import { ListFiliereComponent } from './filiere/list-filiere/list-filiere.component';
import { NewFiliereComponent } from './filiere/new-filiere/new-filiere.component';
import { EditFiliereComponent } from './filiere/edit-filiere/edit-filiere.component';
import { ListModuleComponent } from './module/list-module/list-module.component';
import { NewModuleComponent } from './module/new-module/new-module.component';
import { EditModuleComponent } from './module/edit-module/edit-module.component';
import { ListNiveauComponent } from './niveau/list-niveau/list-niveau.component';
import { NewNiveauComponent } from './niveau/new-niveau/new-niveau.component';
import { EditNiveauComponent } from './niveau/edit-niveau/edit-niveau.component';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module'
import { HttpClientModule } from '@angular/common/http';
import { DetailFiliereComponent } from './filiere/detail-filiere/detail-filiere.component';
import { LoginComponent } from './login/login.component';

@NgModule({

  entryComponents: [ 
    DeleteDialogComponent,
    // AlergieDialogEditComponent,
    // FdrDialogEditComponent
  ],

  declarations: [
    DeleteDialogComponent,
    AppComponent,
    AboutComponent,
    ContactsComponent,
    ListMatiereComponent,
    NewMatiereComponent,
    EditMatiereComponent,
    ListFiliereComponent,
    NewFiliereComponent,
    EditFiliereComponent,
    ListModuleComponent,
    NewModuleComponent,
    EditModuleComponent,
    ListNiveauComponent,
    NewNiveauComponent,
    EditNiveauComponent,
    DetailFiliereComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    FiliereService, 
    MatiereService, 
    ModuleService, 
    NiveauService, 
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
