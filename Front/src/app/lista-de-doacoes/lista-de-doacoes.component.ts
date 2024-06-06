import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// Interfaces
interface Doacao{
  codigo: number;
  data: string;
  hora: string;
  volume:number;
  codigo_doador: number;
}

@Component({
  selector: 'app-lista-de-doacoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-de-doacoes.component.html',
  styleUrl: './lista-de-doacoes.component.css'
})
export class ListaDeDoacoesComponent {
  // Array
  doacoes:Array<Doacao> = []
  
  // Construtor da page
  constructor(private dataService: DataService, private router: Router) { }
  // Ao iniciar a page
  ngOnInit(): void {
    this.doacoes = this.dataService.getDoacoes()
    console.log(this.doacoes)
  }
}
