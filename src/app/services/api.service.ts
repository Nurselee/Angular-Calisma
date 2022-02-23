import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) {

    
   }
   postPerson(data : any){
    return this.http.post<any>("http://localhost:3000/PersonList/",data)
  }

  getPerson(){
    return this.http.get<any>("http://localhost:3000/PersonList/");
  }

 deletePerson(id: number){
   return this.http.delete<any>("http://localhost:3000/PersonList/"+id);
 }

 PutPerson(data:any, id:number){

    return this.http.put<any>("http://localhost:3000/PersonList/"+id, data);
 }
}
