import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BuscarDoadorComponent } from './buscar-doador/buscar-doador.component';
import { ListaDeDoadoresComponent } from './lista-de-doadores/lista-de-doadores.component';
import { NovoDoadorComponent } from './novo-doador/novo-doador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BuscarDoadorComponent, ListaDeDoadoresComponent, NovoDoadorComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front';
}
