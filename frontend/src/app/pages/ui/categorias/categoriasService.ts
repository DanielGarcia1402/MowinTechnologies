import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from './categoria-modelo';

@Injectable()
export class categoriasService {
    
    domain: string = 'http://localhost:3000';
    // domain: string = 'www.mydomainapi.com/';

  constructor(private http: HttpClient) {
  }
  
  getRols() {
    return this.http.get<Categorias[]>(`${this.domain}/api/categorias`);
  }

  getRolsById(sendRol) {
    return this.http.get<Categorias[]>(`${this.domain}/api/categorias/${sendRol}`);
  }
 
  addRol(sendRol) {
    return this.http.post<Categorias>(`${this.domain}/api/categorias`, sendRol);
  }

  deleteRol(id) {
    return this.http.delete<Categorias>(`${this.domain}/api/categorias/${id}`);
  }

  updateRol(sendRol) {
    return this.http.put<Categorias>(`${this.domain}/api/categorias/${sendRol._id}`, sendRol);
  }

  /* deleteRol(id) {
    return this.http.delete<Clientes>(`${this.domain}/api/clientes/${id}`)
      .map(res => res);
  } */
   
}
