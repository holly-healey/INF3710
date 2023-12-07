import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { MedecinsComponent } from "../components/medecins/medecins.component";
import { CreateMedecinComponent } from "../components/create-medecin/create-medecin.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: 'medecins', component: MedecinsComponent },
  { path: 'medecins/ajouter', component: CreateMedecinComponent },
  { path: 'medecins/modifier/:id', component: CreateMedecinComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
