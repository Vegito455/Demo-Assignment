import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { userDetails } from "../model/userDetails";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class UserDetailsService {
  url = "http://localhost:8000/userDetails";

  constructor(private http: HttpClient) { }

  insertUserDetails(payload): Observable<userDetails> {

    const header = new HttpHeaders({
       "Content-Type": "application/json" 
      });

    return this.http.post<userDetails>(this.url, payload, {headers: header});
  }

  getUserDetails(id: number): Observable<userDetails> {

    const header = new HttpHeaders({
       "Content-Type": "application/json" 
      });

    return this.http.get<userDetails>(this.url + "/" + id);
  }

  updateUserDetails(payload): Observable<userDetails> {

    const header = new HttpHeaders({
       "Content-Type": "application/json" 
      });

    return this.http.put<userDetails>(this.url + "/" + payload.id, payload, {headers: header});
  }

  updateProfileDetails(payload): Observable<userDetails> {

    const header = new HttpHeaders({ 
      "Content-Type": "application/json" 
    });

    return this.http.patch<userDetails>(
      this.url + "/" + payload.id, payload, { headers: header }
    );
  }
}
