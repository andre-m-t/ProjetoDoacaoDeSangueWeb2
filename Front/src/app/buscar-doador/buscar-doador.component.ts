import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
// CRIAÇÃO DE INTERFACES
// INTERFACE PARA RECEBER O OBJETO JSON DE DOADORES DO BACK
interface Doador{
  codigo: number;
  nome: string;
  contato: string;
  cpf:string;
  tipoSanguineo: string;
  tipoRh: string;
  tipoRhCorreto: string;
}
interface Doadores{
  Doador : Doador;
}

// COMPONENT

@Component({
  selector: 'app-buscar-doador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './buscar-doador.component.html',
  styleUrl: './buscar-doador.component.css'
})
export class BuscarDoadorComponent {
  // CONSTRUTORES
  constructor(private dataService: DataService) { }
  // VARIAVEIS  
  // CRIAÇÃO DE VARIAVEIS
  codigo: number = 0;
  nome: string = "";
  contato: string = "";
  cpf: string = "";
  tipoSanguineo: string = "";
  tipoRh: string = "";
  tipoRhCorreto:boolean = false
  // FUNÇÃO PARA ENVIAR DADOS
  fazerBusca() {
    const dadosFormulario = {
      codigo: this.codigo,
      nome: this.nome,
      contato: this.contato,
      cpf: this.cpf,
      tipoSanguineo: this.tipoSanguineo,
      tipoRh: this.tipoRh,
      tipoRhCorreto: this.tipoRhCorreto
    };
    this.dataService.enviarBusca(dadosFormulario).subscribe(
      (response: Doadores) => {
        console.log(response)
        
      }
    );
  }
}
