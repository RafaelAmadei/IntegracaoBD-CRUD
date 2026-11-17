import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Cliente {

  private apiUrl = 'https://vigilant-space-guacamole-7vwp7q4xjg65cw55j-8080.app.github.dev/clientes';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  cadastrar(dados: any) {
    return this.http.post<any>(this.apiUrl, dados);
  }

}