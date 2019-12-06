import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from './producto-modelo';
import { Categorias } from '../categorias/categoria-modelo';

@Injectable()
export class productosService {
    
    domain: string = 'http://localhost:3000';
    // domain: string = 'www.mydomainapi.com/';

  constructor(private http: HttpClient) {
  }
  
  getRols() {
    return this.http.get<Productos[]>(`${this.domain}/api/productos`);
  }

  getCategorias() {
    return this.http.get<Categorias[]>(`${this.domain}/api/categorias`);
  }

  getRolsById(sendRol) {
    return this.http.get<Productos[]>(`${this.domain}/api/productos/${sendRol}`);
  }
 
  addRol(sendRol) {
    return this.http.post<Productos>(`${this.domain}/api/productos`, sendRol);
  }

  deleteRol(id) {
    return this.http.delete<Productos>(`${this.domain}/api/productos/${id}`);
  }

  updateRol(sendRol) {
    return this.http.put<Productos>(`${this.domain}/api/productos/${sendRol._id}`, sendRol);
  }

  /* deleteRol(id) {
    return this.http.delete<Clientes>(`${this.domain}/api/clientes/${id}`)
      .map(res => res);
  } */
   
}
