import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http: HttpClient) 
  {

  }

  public ObtenerUsuarios(): Observable<any>{
      return this.http
      .get<any[]>('http://localhost:5204/api/Usuario/ObtenerUsuarios');
  }

  public AgregarUsuario(nuevoUsuario: any): Observable<any>{
    return this.http
    .post('http://localhost:5204/api/Usuario/AgregarUsuario', nuevoUsuario);
  } 

  public EliminarUsuario(idUsuario: number): Observable<any>{
    return this.http
    .delete('http://localhost:5204/api/Usuario/EliminarUsuario/' + idUsuario);
  }
 
  public ModificarUsuario(usuario: any): Observable<any>{
    return this.http
    .post('http://localhost:5204/api/Usuario/ModificarUsuario', usuario);
  }

}
