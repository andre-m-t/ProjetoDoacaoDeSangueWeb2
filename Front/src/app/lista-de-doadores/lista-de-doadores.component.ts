import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { max } from 'rxjs';
import { Block } from '@angular/compiler';
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
interface Doacao{
  codigo:number,
  data: string,
  hora: string,
  volume: number,
  codigo_doador: number
}

// COMPONENT
@Component({
  selector: 'app-lista-de-doadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-de-doadores.component.html',
  styleUrl: './lista-de-doadores.component.css'
})
export class ListaDeDoadoresComponent {
  // variaveis
  // Doador
  codigo: number = 0;
  nome: string = "";
  contato: string = "";
  cpf: string = "";
  tipoSanguineo: string = "";
  tipoRh: string = "";
  tipoRhCorreto:boolean = false
  // Doacao
  volumeSangue:number = 0;
  dataColeta:string = "";
  horaColeta:string = "";
  // array
  doadores:Array<Doador> = []
  // construtor
  constructor(private dataService: DataService, private router: Router) { }
  // metodos
  ngOnInit(): void {
    // Chamando o serviço para obter os doadores ao inicializar o componente
    this.doadores = this.dataService.getDoadores();
  }

  editarDoador(doador:Doador){
    let alterarAlert = document.getElementById('alterarAlert') as HTMLSpanElement;
    this.codigo = doador.codigo;
    this.nome = doador.nome;
    this.contato = doador.contato;
    this.cpf = doador.cpf;
    this.tipoSanguineo = doador.tipoSanguineo;
    this.tipoRh = doador.tipoRh;
    this.tipoRhCorreto = Boolean(doador.tipoRhCorreto)
    alterarAlert.style.display = 'block'; // Exibe o alerta personalizado
  }
  
  salvarDoador(){
    // preenchimento do forms
    const dadosFormulario = {
      codigo: this.codigo,
      nome: this.nome,
      contato: this.contato,
      cpf: this.cpf,
      tipoSanguineo: this.tipoSanguineo,
      tipoRh: this.tipoRh,
      tipoRhCorreto: JSON.parse(this.tipoRhCorreto.toString()) //returns bool
    };
    console.log(dadosFormulario)
    this.dataService.updateDoador(dadosFormulario).subscribe(
      (response:boolean)=>{
          if(response){
          // PRIMEIRA TENTATIVA, INSERINDO HTML POREM BOTOES E CSS PARA DE FUNCIONAR DEVIDO AO ANGULAR USAR UMA FORMA DIFERENTE DE REFERENCIAR ARQUIVOS ESTATICOS
          //   this.closeAlterarAlert()
          //   let htmlText = '<tr style="color: red;" id="' + this.codigo + '" *ngFor="let doador of doadores">' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;">' + this.codigo + '</td>' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;">' + this.nome + '</td>' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;">' + this.contato + '</td>' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;">' + this.cpf + '</td>' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;">' + this.tipoSanguineo + '</td>' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;">' + this.tipoRh + '</td>' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;">' + this.tipoRhCorreto + '</td>' +
          //                     '<td style="border: 1px solid #ddd;padding: 8px;text-align: center;"><button style="padding: 5px 10px;background-color: #bd1717;color: #fff;border: none;border-radius: 5px;cursor: pointer;margin-right: 10%;" (click)="editarDoador(doador)">Editar</button>' +
          //                     '<button style="padding: 5px 10px;background-color: #bd1717;color: #fff;border: none;border-radius: 5px;cursor: pointer;margin-right: 10%;" (click)="inativarDoador(doador)">Remover</button></td>' +
          //                   '</tr>';
          //  // Seletor do elemento onde você deseja substituir o HTML
          //   let targetElement = document.getElementById(this.codigo.toString());

          //   // Substitui o HTML do elemento alvo com o novo HTML
          //   if (targetElement) {
          //       targetElement.innerHTML = htmlText;
          //   } else {
          //       console.error('Elemento alvo não encontrado.');
          //   }
          // SEGUNDA TENTATIVA, REALIZANDO BUSCA NOVAMENTE E ATUALIZANDO LISTA
          // Buscando indice do array referente ao codigo
          let i = 0;
          let index = 0
          for(let atual of this.doadores){
            if(atual.codigo == this.codigo){
              index = i;
            }
            i++;
          }
          // atualizando doador apos alterar
          this.doadores[index].codigo = this.codigo
          this.doadores[index].nome = this.nome
          this.doadores[index].contato = this.contato
          this.doadores[index].cpf = this.cpf
          this.doadores[index].tipoSanguineo = this.tipoSanguineo
          this.doadores[index].tipoRh = this.tipoRh
          this.doadores[index].tipoRhCorreto = String(this.tipoRhCorreto)
          this.dataService.setDoadores(this.doadores)
          }
          this.closeAlterarAlert()
          
          
      }
    );
    
  }

  inativarDoador(doador:Doador){
    // console.log(doador)
    let mensagemAlerta = document.getElementById("mensagem-alerta") as HTMLParagraphElement;
    let customAlert = document.getElementById('customAlert') as HTMLSpanElement;
    this.dataService.inativarDoador(doador).subscribe(
      
      (response : boolean) => {
        if(response){
          mensagemAlerta.textContent = 'Doador removido com sucesso ' + doador.nome;
          document.getElementById(doador.codigo.toString())?.remove()
          console.log(mensagemAlerta.textContent)
        }else{
          mensagemAlerta.textContent = 'Problema ao remover o doador ' + doador.nome;
          console.log(mensagemAlerta.textContent)
        }
      }
    );
    // alerta personalizado utilizando uma div
    customAlert.style.display = 'block'; // Exibe o alerta personalizado
    // atualizando lista
    const dadosFormulario = {
      codigo: 0,
      nome: "",
      contato: "",
      cpf: "",
      tipoSanguineo: "",
      tipoRh: "",
      tipoRhCorreto: ""
    };
  }

  fazerDoacao(doador:Doador){
    let alterarAlert = document.getElementById('doacaoAlert') as HTMLSpanElement;
    this.codigo = doador.codigo;
    this.nome = doador.nome;
    this.contato = doador.contato;
    this.cpf = doador.cpf;
    this.tipoSanguineo = doador.tipoSanguineo;
    this.tipoRh = doador.tipoRh;
    this.tipoRhCorreto = Boolean(doador.tipoRhCorreto)
    alterarAlert.style.display = 'block'; // Exibe o alerta personalizado
  }
  salvarDoacao(){
    // Pacote com dados de doacao
    const dadosDoacao = {
      codigo:this.codigo,
      data: this.dataColeta,
      hora: this.horaColeta,
      volume: this.volumeSangue,
      codigo_doador: this.codigo
    };
    console.log(dadosDoacao);
    this.dataService.fazerDoacao(dadosDoacao).subscribe(
      (response)=>{
        console.log(response);
        // Buscando indice do array referente ao codigo
        let j = 0;
        let indx = 0
        for(let esse of this.doadores){
          if(esse.codigo == this.codigo){
            indx = j;
          }
          j++;
        }
        this.doadores[indx].tipoRhCorreto = String(true);
        this.dataService.setDoadores(this.doadores);

        let alerta = document.getElementById("customAlert") as HTMLSpanElement;
        let info = document.getElementById("mensagem-alerta") as HTMLParagraphElement;
        info.textContent = "Doação realizada com sucesso!";
        alerta.style.display = 'block';
       
      }
    );

    this.closeDoacaoAlert()
  }


  closeAlert() {
    let customAlert = document.getElementById('customAlert') as HTMLSpanElement;
    customAlert.style.display = 'none';
  }
  closeAlterarAlert() {
    let customAlert = document.getElementById('alterarAlert') as HTMLSpanElement;
    customAlert.style.display = 'none';
  }
  closeDoacaoAlert() {
    let customAlert = document.getElementById('doacaoAlert') as HTMLSpanElement;
    customAlert.style.display = 'none';
  }
  verDoacoes(doador:Doador){
    // Setando doador selecionado
    let novo: Array<Doador> = []
    novo.push(doador)
    this.dataService.setDoadores(novo); 
    // Fazendo busca de Doacoes 
    this.dataService.buscarDoacoesDeDoador(doador).subscribe(
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
        this.dataService.setDoacoes(resultBusca)
        // alterando pagina
        this.router.navigate(['lista-de-doacoes']);
      }
    );

  }
}
