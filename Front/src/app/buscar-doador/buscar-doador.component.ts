import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
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
  constructor(private dataService: DataService, private router:Router) { }
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
        // criando array do tipo doador para armazenar no dataservice
        const resultBusca:Array<Doador> = []
        // transformando JSON recebido em objeto javascript
        const doadoresJSON = Object.values(response);
        // percorrendo o objeto javascript
        for (let doadorJSON of doadoresJSON) {
          // transformando em objeto
          let objeto = JSON.parse(doadorJSON)
          // criando objeto Doador
          let doadorObjeto: Doador = {
            codigo: objeto.codigo,
            nome: objeto.nome,
            contato: objeto.contato,
            cpf: objeto.cpf,
            tipoSanguineo: objeto.tipo_sanguineo,
            tipoRh: objeto.rh,
            tipoRhCorreto: objeto.tipo_rh_corretos
          }
          // inserindo na lista
          resultBusca.push(doadorObjeto)
        }
        // armazenando no dataservice
        this.dataService.setDoadores(resultBusca)
        // alterando pagina após efetuar a busca para realizar a mostragem dos dados buscados
        this.router.navigate(['lista-de-doadores'])
      }
    );
  }
}
