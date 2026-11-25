
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Cliente } from '../../services/cliente';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  totalClientes = 0;
  totalAgendamentos = 0;

  private agendamentoUrl =
    'https://vigilant-space-guacamole-7vwp7q4xjg65cw55j-8080.app.github.dev/agendamentos';

  constructor(
    private clienteService: Cliente,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarIndicadores();
  }

  carregarIndicadores(): void {

    this.clienteService.listar().subscribe({
      next: (clientes) => {
        this.totalClientes = clientes.length;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes:', erro);
      }
    });

    this.http.get<any[]>(this.agendamentoUrl).subscribe({
      next: (agendamentos) => {
        this.totalAgendamentos = agendamentos.length;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar agendamentos:', erro);
      }
    });

  }
}
