"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.DatabaseController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const database_service_1 = require("../services/database.service");
const types_1 = require("../types");
let DatabaseController = class DatabaseController {
    constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    databaseService) {
        this.databaseService = databaseService;
    }
    get router() {
        const router = (0, express_1.Router)();
        // Route to get all doctors
        router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield this.databaseService.getdoctors();
                res.json(doctors);
            }
            catch (error) {
            }
        }));
        router.get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idMedecin = parseInt(req.params.id, 10);
                const doctor = yield this.databaseService.getDoctorById(idMedecin);
                console.log(doctor);
                res.json(doctor).status(200);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error.message);
            }
        }));
        // Route to add a new doctor
        router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newDoctor = req.body;
                const result = yield this.databaseService.createDoctor(newDoctor);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error.message);
            }
        }));
        // Route to remove a doctor
        router.delete("/:id/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idMedecin = parseInt(req.params.id, 10);
                const result = yield this.databaseService.deleteDoctor(idMedecin);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        }));
        // Route to modify a doctor
        router.put("/:id", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idMedecin = parseInt(req.params.id, 10);
                // const modifiedDoctor: Medecin = req.body;
                const result = yield this.databaseService.modifydoctor(idMedecin);
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        }));
        return router;
    }
};
DatabaseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map