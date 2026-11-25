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

  mensagemSucesso = '';
  mensagemErro = '';

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
        this.mensagemErro = 'Não foi possível carregar os agendamentos.';
        this.cdr.detectChanges();
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
        this.mensagemErro = 'Não foi possível carregar a lista de clientes.';
        this.cdr.detectChanges();
      }
    });
  }

  salvar(): void {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

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
          this.mensagemSucesso = 'Agendamento atualizado com sucesso!';

          this.limparFormulario();
          this.carregarAgendamentos();
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao atualizar:', erro);
          this.mensagemErro = 'Não foi possível atualizar o agendamento.';
          this.cdr.detectChanges();
        }
      });

    } else {

      this.agendamentoService.cadastrar(dados).subscribe({
        next: () => {
          this.mensagemSucesso = 'Agendamento cadastrado com sucesso!';

          this.limparFormulario();
          this.carregarAgendamentos();
          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar:', erro);
          this.mensagemErro = 'Não foi possível cadastrar o agendamento.';
          this.cdr.detectChanges();
        }
      });

    }
  }

  editar(agendamento: any): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

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

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.agendamentoService.excluir(id).subscribe({
      next: () => {
        this.mensagemSucesso = 'Agendamento excluído com sucesso!';

        this.carregarAgendamentos();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao excluir:', erro);
        this.mensagemErro = 'Não foi possível excluir o agendamento.';
        this.cdr.detectChanges();
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