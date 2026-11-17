import { Clientes } from './components/clientes/clientes';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Dashboard } from './components/dashboard/dashboard';

@Component({
  imports: [RouterOutlet, Header, Dashboard, Clientes],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('BarberPro');
}
