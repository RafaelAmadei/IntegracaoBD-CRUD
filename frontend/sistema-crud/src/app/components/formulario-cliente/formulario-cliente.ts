import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../services/cliente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-cliente',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrl: './formulario-cliente.css',
  templateUrl: './formulario-cliente.html',
})
export class FormularioCliente {

  nome = '';
  telefone = '';
  email = '';

  mensagemSucesso = '';
  mensagemErro = '';

  constructor(private clienteService: Cliente) {}

  @Output() clienteCadastrado = new EventEmitter<void>();

  cadastrar(): void {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const dados = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email
    };

    this.clienteService.cadastrar(dados).subscribe({
      next: () => {
        this.mensagemSucesso = 'Cliente cadastrado com sucesso!';

        this.nome = '';
        this.telefone = '';
        this.email = '';

        this.clienteCadastrado.emit();
      },
      error: (erro) => {
        console.error('Erro ao cadastrar cliente:', erro);
        this.mensagemErro = 'Não foi possível cadastrar o cliente. Tente novamente.';
      }
    });
  }
}