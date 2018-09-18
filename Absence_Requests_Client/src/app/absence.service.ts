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
  private accessPointUrl = 'http://localhost:50418/api/Absence';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  public getAbsences(): Observable<Absence[]> {
    const url = `${this.accessPointUrl}/GetAllAbsences`;
    return this.http.get<Absence[]>(url, { headers: this.headers }).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));
  }

  public getAbsencesFilteredAndSorted(reason: string, sort: string): Observable<Absence[]> {
    const data = { 'reason': reason, 'sortingDate': sort };
    const url = `${this.accessPointUrl}/GetAbsencesFilteredAndSorted`;
    return this.http.get<Absence[]>(url, { params: data }).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));
  }

  public submit(absence: Absence): Observable<Absence> {
    const url = `${this.accessPointUrl}/AddAbsence`;
    return this.http.post<Absence>(url, absence, { headers: this.headers }).pipe(
      catchError(this.handleError<Absence>('absence')));
  }

  public changeStatus(absenceToChange: Absence): Observable<Absence> {
  
    const url = `${this.accessPointUrl}/ChangeStatus`;
    return this.http.put<Absence>(url,absenceToChange, { headers: this.headers }).pipe(
      catchError(this.handleError<Absence>('absence')));
  }

  public getAbsencesInProgress(statusInProgress : string): Observable<Absence[]> {
    const data = { 'status': statusInProgress };
    const url = `${this.accessPointUrl}/GetAbsencesInProgress`;
    return this.http.get<Absence[]>(url, { params: data }).pipe(
      catchError(this.handleError<Absence[]>('absences',[])));
  }

  public getReasons(): Observable<string[]> {
    const url = `${this.accessPointUrl}/GetReasons`;
    return this.http.get<string[]>(url, { headers: this.headers }).pipe(
      catchError(this.handleError<string[]>('resons', [])));
  }
  
}
