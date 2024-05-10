import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-buscar-doador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscar-doador.component.html',
  styleUrl: './buscar-doador.component.css'
})
export class BuscarDoadorComponent {
  
  constructor(private dataService: DataService) { }

}
