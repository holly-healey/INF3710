import { Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import {Medecin} from "../interface/medecin";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {
}

  public get router(): Router {
    const router: Router = Router();

    // Route to get all doctors
    router.get("/", async (req, res) => {
      try {
        const doctors = await this.databaseService.getdoctors();
        res.json(doctors);
      } catch (error) {
        
      }
    });


    router.get("/:id", async (req, res) => {
      try {
        const idMedecin = parseInt(req.params.id, 10);
        const doctor = await this.databaseService.getDoctorById(idMedecin);
        console.log(doctor);
        res.json(doctor).status(200);
      } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }
    });

    // Route to add a new doctor
    router.post("/", async (req, res) => {
      try {
        const newDoctor: Medecin = req.body;
        const result = await this.databaseService.createDoctor(newDoctor);
        res.json(result);
      } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
      }
    });

    // Route to remove a doctor
    router.delete("/:id/", async (req, res, next) => {
      try {
        const idMedecin = parseInt(req.params.id, 10);
        const result = await this.databaseService.deleteDoctor(idMedecin);
        res.json(result);
      } catch (error) {
        next(error);
      }
    });

    // Route to modify a doctor
    router.put("/:id", async (req, res, next) => {
      try {
        const idMedecin = parseInt(req.params.id, 10);
       // const modifiedDoctor: Medecin = req.body;
        const result = await this.databaseService.modifydoctor(idMedecin);
        res.json(result);
      } catch (error) {
        next(error);
      }
    });

  return router;
}
}