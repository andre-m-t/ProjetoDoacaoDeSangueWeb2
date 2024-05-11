import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
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
  selector: 'app-lista-de-doadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-de-doadores.component.html',
  styleUrl: './lista-de-doadores.component.css'
})
export class ListaDeDoadoresComponent {
  // variaveis
  doadores:Array<Doador> = []
  // construtor
  constructor(private dataService: DataService, private router: Router) { }
  // metodos
  ngOnInit(): void {
    // Chamando o serviço para obter os doadores ao inicializar o componente
    this.doadores = this.dataService.getDoadores();
  }
  inativarDoador(doador:Doador){
    // console.log(doador)
    let mensagemAlerta = document.getElementById("mensagem-alerta") as HTMLParagraphElement;
    let customAlert = document.getElementById('customAlert') as HTMLSpanElement;
    this.dataService.inativarDoador(doador).subscribe(
      
      (response : boolean) => {
        if(response){
          mensagemAlerta.textContent = 'Doador removido com sucesso ' + doador.nome;
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
  closeAlert() {
    let customAlert = document.getElementById('customAlert') as HTMLSpanElement;
    customAlert.style.display = 'none';
  }
}
