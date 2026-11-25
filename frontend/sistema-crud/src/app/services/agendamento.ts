
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Agendamento {

  private apiUrl = 'https://vigilant-space-guacamole-7vwp7q4xjg65cw55j-8080.app.github.dev/agendamentos';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  cadastrar(dados: any) {
    return this.http.post<any>(this.apiUrl, dados);
  }

  atualizar(id: number, dados: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dados);
  }

  excluir(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
