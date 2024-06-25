import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BuscarDoadorComponent } from './buscar-doador/buscar-doador.component';
import { ListaDeDoadoresComponent } from './lista-de-doadores/lista-de-doadores.component';
import { NovoDoadorComponent } from './novo-doador/novo-doador.component';
import { ListaDeDoacoesComponent } from './lista-de-doacoes/lista-de-doacoes.component';
import { DataService } from './data.service';
import { Router } from '@angular/router';

// Interfaces
interface Doacao{
  codigo: number;
  data: string;
  hora: string;
  volume:number;
  codigo_doador: number;
}
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BuscarDoadorComponent, ListaDeDoadoresComponent, NovoDoadorComponent, RouterLink, ListaDeDoacoesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front';
  //Array
  // criando array do tipo doador para armazenar no dataservice
  doadores:Array<Doador> = [] 
  ngOnInit(): void {
    const dadosFormulario = {
      codigo: 0,
      nome: "",
      contato: "",
      cpf: "",
      tipoSanguineo: "",
      tipoRh: "",
      tipoRhCorreto: false
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
        this.doadores = resultBusca;
      }
    );

    // Chamando o serviço para obter os doadores ao inicializar o componente
    this.router.navigate(['cadastro']);
  }
  // Construtor
  constructor(private dataService: DataService, private router: Router) { }

  // metodo de busca
  buscarDoacoes(){
    let doacoes:Array<Doacao> = [];
    this.dataService.buscarDoacoes().subscribe(
      (response)=>{
        // criando array do tipo doacao para armazenar no dataservice
        const resultBusca:Array<Doacao> = []
        // transformando JSON recebido em objeto javascript
        const doadoresJSON = Object.values(response);
        // percorrendo o objeto javascript
        for (let doadorJSON of doadoresJSON) {
          // transformando em objeto
          let objeto = JSON.parse(doadorJSON)
          // criando objeto Doador
          let doacaoObjeto: Doacao = {
            codigo: objeto.codigo,
            data: objeto.data,
            hora: objeto.hora,
            volume: objeto.volume,
            codigo_doador: objeto.codigo_doador
          }
          // inserindo na lista
          resultBusca.push(doacaoObjeto)
        }
        // armazenando no dataservice
        this.dataService.setDoacoes(resultBusca);
        // Buscar doadores
        this.fazerBusca();
        // armazenando doadores
        this.dataService.setDoadores(this.doadores);
        // alterando pagina
        this.router.navigate(['lista-de-doacoes']);
      }
    ); 


  }

  fazerBusca() {
    const dadosFormulario = {
      codigo: 0,
      nome: "",
      contato: "",
      cpf: "",
      tipoSanguineo: "",
      tipoRh: "",
      tipoRhCorreto: false
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
        this.doadores = resultBusca;
      }
    );
  }
}
