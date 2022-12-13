import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable,throwError } from 'rxjs';
import { Client } from './client';
import { ClientRespon } from './clientRespon';
import {map,catchError,tap} from 'rxjs/operators'
import { response } from 'express';
import { Router } from '@angular/router';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlApi: string='';

  constructor(private http:HttpClient,
    private router:Router){
    this.urlApi=environment.apiUrl+'/api';
  }
  getClients():Observable<ClientRespon>{
    return this.http.get<ClientRespon>(this.urlApi+'/clients')
  }
  create(client:Client): Observable<Client>{
  return this.http.post<Client>(`${this.urlApi}/clients`,client).pipe(
    map((response:any)=>response.client as Client),
    catchError(e=>{
      if(e.status==400){
        return throwError(()=>e);
      }
      if(e.errors.mensaje){
        console.log(e.errors.mensaje);
      }
      return throwError(()=>e);
    })
  )
  }
  getClientById(_id:Number):Observable<Client>{
return this.http.get<Client>(`${this.urlApi}/clients/${_id}`).pipe(
  catchError(e=>{
    if(e.status!=401 && e.error.mensaje){
      this.router.navigate(['/clients']);
      console.log(e.error.mensaje);
    }
    return throwError(()=>e);
  })
  );
    
  }
  update(client:Client):Observable<Client>{
    return this.http.put<Client>(`${this.urlApi}/clients/${client._id}`,client).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
      if(e.errors.mensaje){
        console.log(e.errors.mensaje);
      }
    return throwError(()=>e);
    })
    )
  }
  delete(_id:string):Observable<Client>{
    return this.http.delete<Client>(`${this.urlApi}/clients/${_id}`).pipe(
      catchError(e=>{
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(()=>e);
      })
    )
  }
}
