import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();
  public setDarkTheme(isDarkTheme: boolean): void {
    this._darkTheme.next(isDarkTheme);
  }

  constructor(
    private _http: HttpClient
  ) { }

  public login(email: string, password: string): Observable<any> {
    const body = {
        username: email,
        password: password
    }
    return this._http
      .post(
        environment.API_BASE_URL + environment.login,
        body,
      );
  }

  public fetchMovies(pageNumber: number): Observable<any> {
    const headers ={
      headers: new HttpHeaders({
          'Authorization': `Token ${localStorage.getItem('token')}`
      })
  }
    return this._http
      .get(
        environment.API_BASE_URL + environment.getMovies + '?page=' + pageNumber,
        headers,
      );
  }
}
