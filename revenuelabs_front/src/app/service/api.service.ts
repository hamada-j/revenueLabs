import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// Models
import { Civilization } from '../models/Civilization';
import { User } from '../models/User';
// .env
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = BACKEND_URL;
  favorites$ = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch all civilizations
  getCivilization(): Observable<Civilization> {
    return this.http.get<Civilization>(`${this.apiURL}/all_civilizations`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch one civilization by id
  getOneCivilization(id: number): Observable<Civilization> {
    return this.http.get<Civilization>(`${this.apiURL}/all_civilizations/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => Fetch extra data
  postUrlExtraData(url: string): Promise<any> {
    return this.http.post<any>(`${this.apiURL}/civilization_extra_data`, {url}).toPromise();
  }

  // HttpClient API post() method => Fetch extra data for a civilization
  getMoreDataCivilization(url: string): Observable<any> {
    return this.http.post<any>(this.apiURL + '/civilization_extra_data', {url})
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch all civilizations login/register user
  getFavoriteCivilizations(userId: string): Observable<Civilization> {
    return this.http.get<Civilization>(`${this.apiURL}/all_favorite_civilizations/${userId}`, this.createHeaders())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Update fav civilizations
  updateFavoriteCivilization(data: {}): Observable<Civilization> {
    return this.http.put<Civilization>(`${this.apiURL}/update_all_favorite_civilizations`, data, this.createHeaders())
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // HttpClient API post() method => login user
  login(form: {}): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/login_with_username`, form)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API post() method => register user
  register(form: {}): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/register_with_username`, form)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       console.log(error)
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       console.log(error)
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

  // basic Headers token
  createHeaders() {
    return {
      headers: new HttpHeaders({
        'token': localStorage.getItem('token')
      })
    };
  }
}
