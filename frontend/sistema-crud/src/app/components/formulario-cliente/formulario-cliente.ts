import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../services/cliente';

@Component({
  selector: 'app-formulario-cliente',
  imports: [FormsModule],
  styleUrl: './formulario-cliente.css',
  templateUrl: './formulario-cliente.html',
})
export class FormularioCliente {

  nome = '';
  telefone = '';
  email = '';

  constructor(private clienteService: Cliente) {}

  @Output() clienteCadastrado = new EventEmitter<void>();

  cadastrar() {
    const dados = {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email
    };

    this.clienteService.cadastrar(dados).subscribe({
      next: () => {
        this.nome = '';
        this.telefone = '';
        this.email = '';

        this.clienteCadastrado.emit();
      },
      error: (erro) => {
        console.error('Erro ao cadastrar cliente:', erro);
      }
    });
  }
}