import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Absence } from './absence';

@Injectable({
  providedIn: 'root'
})

export class AbsenceService {
  private headers: HttpHeaders;
  private accessPointUrl: string = 'http://localhost:63983/api/Absence';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }

  public getAbsences(): Observable<Absence[]> {
    const url = `${this.accessPointUrl}/GetAllAbsences`;
    return this.http.get<Absence[]>(url, { headers: this.headers }).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));;
  }

  public getAbsencesFilteredAndSorted(reason: string, sort: string): Observable<Absence[]> {
    let data = { 'reason': reason, 'sortingDate': sort };
    const url = `${this.accessPointUrl}/GetAbsencesFilteredAndSorted`;
    return this.http.get<Absence[]>(url, { params: data }).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));
  }

  public submit(absence: Absence): Observable<Absence> {
    const url = `${this.accessPointUrl}/AddAbsence`;
    return this.http.post<Absence>(url, absence, { headers: this.headers }).pipe(
      catchError(this.handleError<Absence>('absence')));
  }
}