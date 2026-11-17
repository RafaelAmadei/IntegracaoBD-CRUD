import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../services/cliente';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {

  clientes: any[] = [];

  constructor(private clienteService: Cliente) {}

  ngOnInit(): void {
    this.clienteService.listar().subscribe({
      next: (dados) => {
        this.clientes = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar clientes:', erro);
      }
    });
  }

}
