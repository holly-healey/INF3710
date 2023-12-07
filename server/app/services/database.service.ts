import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {Medecin, values} from "../interface/medecin";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "HOPITAL",
    password: "19excell",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "localhost",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // public client = await this.pool.connect();

  // public pool: pg.Pool = new pg.Pool(this.connectionConfig);
  
  // === Retirer un médécin ===
  public async deleteDoctor(idmedecin: number): Promise<pg.QueryResult> {
    const queryText: string = `DELETE FROM MEDECINS WHERE idMedecin = $1;`;
    const client = await this.pool.connect();
    
    // Utilisez un tableau pour spécifier les valeurs à remplacer dans la requête
    const medecinId = [idmedecin];
    const res = await client.query(queryText, medecinId);
    return res;
  }
  
  // === Modifier les informations d'un médécin ===
    public async modifydoctor(oldid : number): Promise<pg.QueryResult> {

      const medecin = await this.getDoctorById(oldid);

      if (medecin.length === 0) {
        throw new Error(`Médecin avec l'ID ${oldid} introuvable.`);
      }
      
      const values: values = [medecin.idmedecin, medecin.prenom, medecin.nom, medecin.specialite, medecin.anneesExperience, medecin.idService];
      const queryText: string = `UPDATE MEDECINS SET idmedecin =$1, prenom = $2, nom = $3, specialite = $4, anneesExperience = $5, idService = $6 WHERE idmedecin = $7;`;

      const client = await this.pool.connect();
      const res = await client.query(queryText, [...values, oldid]);
      client.release();
      return res;
    }

    
  // === Avoir la liste des médecins ===
    public async getdoctors(): Promise<pg.QueryResultRow> {
      const client = await this.pool.connect();
      const res = await client.query(`SELECT * FROM MEDECINS;`);
      console.log('Liste des médecins retournées');
      client.release();
      return res.rows;
    }

  // == Avoir un médécin par son identifiant ===
  public async getDoctorById(idmedecin: number): Promise<pg.QueryResultRow> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM MEDECINS WHERE idMedecin = $1;`;
    const res = await client.query(queryText, [idmedecin]);
    client.release();
    return res.rows;
  }

  // === Ajouter un medecin ===
    public async createDoctor(medecin: Medecin):Promise<pg.QueryResult> {
      const client = await this.pool.connect();
      const values: values = [medecin.idmedecin, medecin.prenom, medecin.nom, medecin.specialite, medecin.anneesExperience, medecin.idService];
      const queryText: string = `INSERT INTO MEDECINS VALUES ($1, $2, $3, $4, $5, $6);`;
      const res = await client.query(queryText, values);
      client.release();
      return res;
    }
}

const databaseService = new DatabaseService();

// Appelez la fonction poolDemo pour vérifier la connexion
const med = new Medecin(15, "Jean", "Dupont", "Chirurgien", 10, 1);
databaseService.createDoctor(med)
  .then((result) => {
    console.log("Connexion à la base de données réussie. Résultat de la requête : ", result);
  })
  .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données : ", error);
  });
databaseService.getdoctors();

