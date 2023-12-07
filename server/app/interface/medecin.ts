export class Medecin {
    idmedecin: number;
    prenom: string;
    nom: string;
    specialite: string;
    anneesExperience: number;
    idService : number;

    constructor( idmedecin: number,
        prenom: string,
        nom: string,
        specialite: string,
        anneesExperience: number,
        idService : number){
            this.idmedecin = idmedecin;
            this.prenom = prenom;
            this.nom = nom;
            this.specialite = specialite;
            this.anneesExperience = anneesExperience;
            this.idService = idService;
        }
}


export type values = [number, string, string, string, number, number];
