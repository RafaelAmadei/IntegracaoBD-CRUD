
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Agendamento } from '../../services/agendamento';
import { Cliente } from '../../services/cliente';

@Component({
  selector: 'app-agendamentos',
  imports: [CommonModule, FormsModule],
  styleUrl: './agendamentos.css',
  templateUrl: './agendamentos.html',
})
export class Agendamentos implements OnInit {

  agendamentos: any[] = [];
  clientes: any[] = [];

  dataHora = '';
  servico = '';
  status = 'Pendente';
  clienteId = '';

  editandoId: number | null = null;

  constructor(
    private agendamentoService: Agendamento,
    private clienteService: Cliente,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
    this.carregarClientes();
  }

  carregarAgendamentos(): void {
    this.agendamentoService.listar().subscribe({
      next: (dados) => {
        this.agendamentos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar agendamentos:', erro);
      }
    });
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (dados) => {
        this.clientes = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes:', erro);
      }
    });
  }

  salvar(): void {

    const dados = {
      dataHora: this.dataHora + ':00',
      servico: this.servico,
      status: this.status,
      cliente: {
        id: Number(this.clienteId)
      }
    };

    if (this.editandoId !== null) {

      this.agendamentoService.atualizar(this.editandoId, dados).subscribe({
        next: () => {
          alert('Agendamento atualizado com sucesso!');
          this.limparFormulario();
          this.carregarAgendamentos();
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          alert('Não foi possível atualizar o agendamento.');
        }
      });

    } else {

      this.agendamentoService.cadastrar(dados).subscribe({
        next: () => {
          alert('Agendamento cadastrado com sucesso!');
          this.limparFormulario();
          this.carregarAgendamentos();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          alert('Não foi possível cadastrar o agendamento.');
        }
      });

    }
  }

  editar(agendamento: any): void {
    this.editandoId = agendamento.id;

    this.dataHora = agendamento.dataHora.substring(0, 16);
    this.servico = agendamento.servico;
    this.status = agendamento.status;
    this.clienteId = String(agendamento.cliente.id);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  excluir(id: number): void {

    if (!confirm('Deseja realmente excluir este agendamento?')) {
      return;
    }

    this.agendamentoService.excluir(id).subscribe({
      next: () => {
        alert('Agendamento excluído com sucesso!');
        this.carregarAgendamentos();
      },
      error: (erro) => {
        console.error('Erro ao excluir:', erro);
        alert('Não foi possível excluir o agendamento.');
      }
    });
  }

  limparFormulario(): void {
    this.dataHora = '';
    this.servico = '';
    this.status = 'Pendente';
    this.clienteId = '';
    this.editandoId = null;
  }

}
