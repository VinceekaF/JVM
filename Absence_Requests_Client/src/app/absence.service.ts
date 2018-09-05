import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Absence } from './absence';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AbsenceService {
  private headers: HttpHeaders;
  
  private accessPointUrl: string = 'http://localhost:60732/api/Absence';

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    
  }

  private handleError<T> (operation = 'operation', result?:T) {
      return (error:any): Observable<T> => {
      return of(result as T);
    }
  }

  public getAbsences() : Observable<Absence[]> {
    const url = `${this.accessPointUrl}/GetAllAbsences`;
    return this.http.get<Absence[]>(url, {headers: this.headers}).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));;
  }

  public sortByEmissionDate() : Observable<Absence[]> {
    const url = `${this.accessPointUrl}/SortByEmissionDate`;
    return this.http.get<Absence[]>(url, {headers: this.headers}).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));;
  }

  public sortByStartDate() : Observable<Absence[]> {
    const url = `${this.accessPointUrl}/SortByStartDate`;
    return this.http.get<Absence[]>(url, {headers: this.headers}).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));;
  }

  public filterByReason(reason: string) {
    const params= new HttpParams().set('reason', reason);
    const url = `${this.accessPointUrl}/FilterByReason`;
    return this.http.get<Absence[]>(url, {params: params}).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));
  }

  public GetAbsencesFilteredAndSorted(reason: string, sort:string){
    //let params= new HttpParams().set('reason', reason).append('sort', sort);
    let data = {'reason': reason, 'sortingDate':sort};
    console.log('reason: ' + reason);
    console.log('sort: ' + sort);
    const url = `${this.accessPointUrl}/GetAbsencesFilteredAndSorted`;
    return this.http.get<Absence[]>(url, {params: data}).pipe(
      catchError(this.handleError<Absence[]>('absences', [])));
  }

 
}

