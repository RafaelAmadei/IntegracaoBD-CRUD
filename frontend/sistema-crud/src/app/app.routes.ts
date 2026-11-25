
import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { Clientes } from './components/clientes/clientes';
import { FormularioCliente } from './components/formulario-cliente/formulario-cliente';
import { Agendamentos } from './components/agendamentos/agendamentos';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'inicio',
    component: Dashboard
  },

  {
    path: 'clientes',
    component: Clientes
  },

  {
    path: 'clientes/novo',
    component: FormularioCliente
  },

  {
    path: 'agendamentos',
    component: Agendamentos
  }

];
