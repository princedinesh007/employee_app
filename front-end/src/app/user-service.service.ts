import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

 url='http://localhost:3000'
 constructor(public http:HttpClient) { }

  register(data:any)
  {
    return this.http.post(`${this.url}/register`,data);
  }
  login(data:any)
  {
   return this.http.post(`${this.url}/login`,data);
  }
}
