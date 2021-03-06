import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { apiEndpoints, CompetitionInfo, environment, UserInfo } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(false)

  user : UserInfo = {
    id : "",
    email : "",
    name : ""
  }

  apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) {
   }

  register(email : string, password : string) {

    var params  = new HttpParams();
    params = params.set("email", email);
    params = params.set("password", password);

    return this.http.get(apiEndpoints.register, {
      responseType : "json",
      withCredentials : true,
      observe : "response",
      params : params
    });

  }

  authenticate(email : string, password : string, remember : boolean = false){
    var params  = new HttpParams();
    params = params.set("email", email);
    params = params.set("password", password);
    params = params.set("remember", remember);

    return this.http.get(apiEndpoints.authenticate, {
      responseType : "json",
      withCredentials : true,
      observe : "response",
      params : params
    });
  }

  authenticate_credentials(){
    return this.http.get(apiEndpoints.authenticate, {
      responseType : "json",
      withCredentials : true,
      observe : "response",
    });
  }

  logout(){
    return this.http.post(apiEndpoints.logout,{
      responseType : "json",
      withCredentials : true,
      observe : "response",
    })
  }

}
