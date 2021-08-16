import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { EditFiliereComponent } from './filiere/edit-filiere/edit-filiere.component';
import { ListFiliereComponent } from './filiere/list-filiere/list-filiere.component';
import { NewFiliereComponent } from './filiere/new-filiere/new-filiere.component';
import { DetailFiliereComponent } from './filiere/detail-filiere/detail-filiere.component';
import { EditMatiereComponent } from './matiere/edit-matiere/edit-matiere.component';
import { ListMatiereComponent } from './matiere/list-matiere/list-matiere.component';
import { NewMatiereComponent } from './matiere/new-matiere/new-matiere.component';
import { EditModuleComponent } from './module/edit-module/edit-module.component';
import { ListModuleComponent } from './module/list-module/list-module.component';
import { NewModuleComponent } from './module/new-module/new-module.component';
import { EditNiveauComponent } from './niveau/edit-niveau/edit-niveau.component';
import { ListNiveauComponent } from './niveau/list-niveau/list-niveau.component';
import { NewNiveauComponent } from './niveau/new-niveau/new-niveau.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: AboutComponent, canActivate: [AuthGuard] },
  // route filiere
	{ path: 'list-filiere', component: ListFiliereComponent, canActivate: [AuthGuard]},
  { path: 'new-filiere', component: NewFiliereComponent, canActivate: [AuthGuard] },
  { path: 'edit-filiere/:id', component: EditFiliereComponent, canActivate: [AuthGuard] },
  { path: 'detail-filiere/:search', component: DetailFiliereComponent, canActivate: [AuthGuard] },
  // route niveau
  { path: 'list-niveau', component: ListNiveauComponent, canActivate: [AuthGuard] },
  { path: 'new-niveau', component: NewNiveauComponent, canActivate: [AuthGuard] },
  { path: 'edit-niveau/:id', component: EditNiveauComponent, canActivate: [AuthGuard] },
  // route module
  { path: 'list-module', component: ListModuleComponent },
  { path: 'new-module', component: NewModuleComponent },
  { path: 'edit-module/:id', component: EditModuleComponent },
  // route matiere
  { path: 'list-matiere', component: ListMatiereComponent },
  { path: 'new-matiere', component: NewMatiereComponent },
  { path: 'edit-matiere/:id', component: EditMatiereComponent },
  
	
	{ path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
