import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Medecin } from 'src/app/interface/medecin';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.css']
})
export class MedecinsComponent implements OnInit {
medecinList$ : Observable<Medecin[]>;
  constructor(private communicationService: CommunicationService) { }

  ngOnInit(): void {     
    this.medecinList$ = this.communicationService.getMedecins();
  }

  deleteMedecin(id: number): void {
    if (window.confirm("Voulez-vous vraiment supprimer ce médecin?")) {
      this.communicationService.deleteMedecin(id).subscribe();
    }
  }


}
