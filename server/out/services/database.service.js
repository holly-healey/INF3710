"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const inversify_1 = require("inversify");
const pg = require("pg");
require("reflect-metadata");
const medecin_1 = require("../interface/medecin");
let DatabaseService = class DatabaseService {
    constructor() {
        this.connectionConfig = {
            user: "postgres",
            database: "HOPITAL",
            password: "19excell",
            port: 5432,
            host: "localhost",
            keepAlive: true
        };
        this.pool = new pg.Pool(this.connectionConfig);
    }
    // public client = await this.pool.connect();
    // public pool: pg.Pool = new pg.Pool(this.connectionConfig);
    // === Retirer un médécin ===
    deleteDoctor(idmedecin) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryText = `DELETE FROM MEDECINS WHERE idMedecin = $1;`;
            const client = yield this.pool.connect();
            // Utilisez un tableau pour spécifier les valeurs à remplacer dans la requête
            const medecinId = [idmedecin];
            const res = yield client.query(queryText, medecinId);
            return res;
        });
    }
    // === Modifier les informations d'un médécin ===
    modifydoctor(oldid) {
        return __awaiter(this, void 0, void 0, function* () {
            const medecin = yield this.getDoctorById(oldid);
            if (medecin.length === 0) {
                throw new Error(`Médecin avec l'ID ${oldid} introuvable.`);
            }
            const values = [medecin.idmedecin, medecin.prenom, medecin.nom, medecin.specialite, medecin.anneesExperience, medecin.idService];
            const queryText = `UPDATE MEDECINS SET idmedecin =$1, prenom = $2, nom = $3, specialite = $4, anneesExperience = $5, idService = $6 WHERE idmedecin = $7;`;
            const client = yield this.pool.connect();
            const res = yield client.query(queryText, [...values, oldid]);
            client.release();
            return res;
        });
    }
    // === Avoir la liste des médecins ===
    getdoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM MEDECINS;`);
            console.log('Liste des médecins retournées');
            client.release();
            return res.rows;
        });
    }
    // == Avoir un médécin par son identifiant ===
    getDoctorById(idmedecin) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const queryText = `SELECT * FROM MEDECINS WHERE idMedecin = $1;`;
            const res = yield client.query(queryText, [idmedecin]);
            client.release();
            return res.rows;
        });
    }
    // === Ajouter un medecin ===
    createDoctor(medecin) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const values = [medecin.idmedecin, medecin.prenom, medecin.nom, medecin.specialite, medecin.anneesExperience, medecin.idService];
            const queryText = `INSERT INTO MEDECINS VALUES ($1, $2, $3, $4, $5, $6);`;
            const res = yield client.query(queryText, values);
            client.release();
            return res;
        });
    }
};
DatabaseService = __decorate([
    (0, inversify_1.injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
const databaseService = new DatabaseService();
// Appelez la fonction poolDemo pour vérifier la connexion
const med = new medecin_1.Medecin(15, "Jean", "Dupont", "Chirurgien", 10, 1);
databaseService.createDoctor(med)
    .then((result) => {
    console.log("Connexion à la base de données réussie. Résultat de la requête : ", result);
})
    .catch((error) => {
    console.error("Erreur lors de la connexion à la base de données : ", error);
});
databaseService.getdoctors();
//# sourceMappingURL=database.service.js.map