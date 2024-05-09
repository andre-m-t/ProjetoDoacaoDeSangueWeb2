import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-novo-doador',
  standalone: true,
  imports: [FormsModule, DataService],
  templateUrl: './novo-doador.component.html',
  styleUrl: './novo-doador.component.css'
})
export class NovoDoadorComponent {

}
