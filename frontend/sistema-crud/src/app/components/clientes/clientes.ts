import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../services/cliente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterLink, FormsModule],
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {

  clientes: any[] = [];

  editandoId: number | null = null;

  nomeEdit = '';
  telefoneEdit = '';
  emailEdit = '';

  mensagemSucesso = '';
  mensagemErro = '';

  constructor(
    private clienteService: Cliente,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.listar().subscribe({
      next: (dados) => {
        this.clientes = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao buscar clientes:', erro);
        this.mensagemErro = 'Não foi possível carregar os clientes.';
        this.cdr.detectChanges();
      }
    });
  }

  editar(cliente: any): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.editandoId = cliente.id;
    this.nomeEdit = cliente.nome;
    this.telefoneEdit = cliente.telefone;
    this.emailEdit = cliente.email;
  }

  salvarEdicao(): void {

    if (this.editandoId === null) {
      return;
    }

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const dados = {
      nome: this.nomeEdit,
      telefone: this.telefoneEdit,
      email: this.emailEdit
    };

    this.clienteService.atualizar(this.editandoId, dados).subscribe({
      next: () => {
        this.mensagemSucesso = 'Cliente atualizado com sucesso!';

        this.cancelarEdicao();
        this.carregarClientes();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao atualizar cliente:', erro);
        this.mensagemErro = 'Não foi possível atualizar o cliente.';
        this.cdr.detectChanges();
      }
    });
  }

  cancelarEdicao(): void {
    this.editandoId = null;

    this.nomeEdit = '';
    this.telefoneEdit = '';
    this.emailEdit = '';
  }

  excluir(id: number): void {

    if (!confirm('Deseja realmente excluir este cliente?')) {
      return;
    }

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.clienteService.excluir(id).subscribe({
      next: () => {
        this.mensagemSucesso = 'Cliente excluído com sucesso!';
        this.carregarClientes();
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao excluir cliente:', erro);
        this.mensagemErro = 'Não foi possível excluir. Verifique se este cliente possui agendamentos vinculados.';
        this.cdr.detectChanges();
      }
    });
  }

}