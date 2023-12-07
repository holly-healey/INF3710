import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medecin } from 'src/app/interface/medecin';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-create-medecin',
  templateUrl: './create-medecin.component.html',
  styleUrls: ['./create-medecin.component.css']
})
export class CreateMedecinComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  medecin: Medecin = {idmedecin:-1, prenom:"prenom", nom:"nom", specialite:"spécialité", anneesExperience:-1, idService:-1};
  constructor(private route: ActivatedRoute,
    private communicationService: CommunicationService) { }

  ngOnInit(): void {
    if(this.id)
    this.communicationService.getMedecinById(Number(this.id)).subscribe((medecin) => {
      this.medecin = medecin[0];
      //window.alert(JSON.stringify(medecin));
    });

  }

  resetMedecin(): void {
    this.medecin = {
      idmedecin: -1,
      prenom: "prenom",
      nom: "nom",
      specialite: "spécialité",
      anneesExperience: -1,
      idService: -1
    };}

  createMedecin(): void {
    this.communicationService.createMedecin(this.medecin).subscribe(() => this.resetMedecin());
  }

  updateMedecin(): void {
    window.alert(JSON.stringify(this.id));
     this.communicationService.updateMedecin(Number(this.id), this.medecin).subscribe(() => this.resetMedecin());
  }

  chooseAction(): void {  
    if (this.id) {
      this.updateMedecin();
    } else {
      this.createMedecin();
    }
  }
}
