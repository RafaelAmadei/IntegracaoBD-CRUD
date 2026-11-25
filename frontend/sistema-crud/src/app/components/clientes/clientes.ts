
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
        alert('Não foi possível carregar os clientes.');
      }
    });
  }

  editar(cliente: any): void {
    this.editandoId = cliente.id;

    this.nomeEdit = cliente.nome;
    this.telefoneEdit = cliente.telefone;
    this.emailEdit = cliente.email;
  }

  salvarEdicao(): void {

    if (this.editandoId === null) {
      return;
    }

    const dados = {
      nome: this.nomeEdit,
      telefone: this.telefoneEdit,
      email: this.emailEdit
    };

    this.clienteService.atualizar(this.editandoId, dados).subscribe({
      next: () => {
        alert('Cliente atualizado com sucesso!');

        this.cancelarEdicao();
        this.carregarClientes();
      },
      error: (erro) => {
        console.error('Erro ao atualizar cliente:', erro);
        alert('Não foi possível atualizar o cliente.');
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

    this.clienteService.excluir(id).subscribe({
      next: () => {
        alert('Cliente excluído com sucesso!');
        this.carregarClientes();
      },
      error: (erro) => {
        console.error('Erro ao excluir cliente:', erro);
        alert('Não foi possível excluir. Verifique se este cliente possui agendamentos vinculados.');
      }
    });
  }

}
