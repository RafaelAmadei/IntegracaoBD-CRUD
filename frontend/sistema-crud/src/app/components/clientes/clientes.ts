import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../services/cliente';
import { FormularioCliente } from '../formulario-cliente/formulario-cliente';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormularioCliente],
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {

  clientes: any[] = [];

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
      console.log('CLIENTES RECEBIDOS:', dados);

      this.clientes = dados;

      this.cdr.detectChanges();
    },
    error: (erro) => {
      console.error('Erro ao buscar clientes:', erro);
    }
  });
}

}
