import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Medecin } from 'src/app/interface/medecin';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database/";

  private _listeners: Subject<string> = new Subject<string>();

  constructor(private readonly http: HttpClient) {}

  listen(): Observable<string> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getMedecins(): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.BASE_URL}`).pipe(
      catchError(this.handleError<Medecin[]>('getMedecins', []))
    );
  }

  getMedecinById(id: number): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.BASE_URL}/${id}`).pipe(
      catchError(this.handleError<Medecin[]>('getMedecinById'))
    );
  }

  createMedecin(medecin: Medecin): Observable<Medecin> {
    return this.http.post<Medecin>(`${this.BASE_URL}`, medecin).pipe(
      catchError(this.handleError<Medecin>('createMedecin'))
    );
  }

  deleteMedecin(id: number): Observable<number> {
    return this.http.delete<number>(`${this.BASE_URL}/${id}`).pipe(
      catchError(this.handleError<number>('deleteMedecin'))
    );
  }

  updateMedecin(id: number, updatedMedecin: Medecin): Observable<number> {
    return this.http.put<number>(`${this.BASE_URL}/${id}`, updatedMedecin).pipe(
      catchError(this.handleError<number>('updateMedecin'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      window.alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
