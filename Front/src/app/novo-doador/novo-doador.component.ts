import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';

// CRIAÇÃO DE INTERFACES
// INTERFACE PARA MANIPULAR ERROS ATRAVES DO BACKEND
interface ErrStts {
  rhErr: boolean;
  sanguineoErr: boolean;
  cpfErr: boolean;
  contatoErr: boolean;
  nomeErr: boolean;
  codigoErr: boolean;
}
interface PostResponse {
  sttsForms: ErrStts;
}

// COMPONENT


@Component({
  selector: 'app-novo-doador',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './novo-doador.component.html',
  styleUrl: './novo-doador.component.css'
})
export class NovoDoadorComponent {
  constructor(private dataService: DataService) { }
  // CRIAÇÃO DE VARIAVEIS
  codigo: number = 0;
  nome: string = "";
  contato: string = "";
  cpf: string = "";
  tipoSanguineo: string = "";
  tipoRh: string = "";
  tipoRhCorreto:boolean = false
  // VARIAVEL PARA RECEBER O OBJETO DO FORMS 
  sttsForms: any;
  // FUNÇÃO PARA ENVIAR DADOS
  enviarDados() {
    const dadosFormulario = {
      codigo: this.codigo,
      nome: this.nome,
      contato: this.contato,
      cpf: this.cpf,
      tipoSanguineo: this.tipoSanguineo,
      tipoRh: this.tipoRh,
      tipoRhCorreto: this.tipoRhCorreto
    };

    const spanRh = document.getElementById("tipo-rhError") as HTMLSpanElement;
    const spanSanguineo = document.getElementById("tipo-sanguineoError") as HTMLSpanElement;
    const spanCpf = document.getElementById("cpfError") as HTMLSpanElement;
    const spanContato = document.getElementById("contatoError") as HTMLSpanElement;
    const spanNome = document.getElementById("nomeError") as HTMLSpanElement;
    const spanCodigo = document.getElementById("codigoError") as HTMLSpanElement;

    this.dataService.enviarDado(dadosFormulario).subscribe(
      (response: PostResponse) => {
        if (response.sttsForms.rhErr || response.sttsForms.sanguineoErr || response.sttsForms.cpfErr || response.sttsForms.contatoErr || response.sttsForms.nomeErr || response.sttsForms.codigoErr) {
          console.log(response.sttsForms)
          if (response.sttsForms.rhErr)
            spanRh.textContent = "Selecione o Rh do Doador";
          else
            spanRh.textContent = "";

          if (response.sttsForms.sanguineoErr)
            spanSanguineo.textContent = "Selecione o Tipo Sanguineodo Doador";
          else
            spanSanguineo.textContent = "";

          if (response.sttsForms.cpfErr)
            spanCpf.textContent = "Digite um CPF válido";
          else
            spanCpf.textContent = "";

          if (response.sttsForms.contatoErr)
            spanContato.textContent = "Digite um contato válido";
          else
            spanContato.textContent = "";

          if (response.sttsForms.nomeErr)
            spanNome.textContent = "Digite um nome válido";
          else
            spanNome.textContent = "";

          if (response.sttsForms.codigoErr)
            spanCodigo.textContent = "Código inválido";
          else
            spanCodigo.textContent = "";
        } else {
          spanRh.textContent = "";
          spanSanguineo.textContent = "";
          spanCpf.textContent = "";
          spanContato.textContent = "";
          spanNome.textContent = "";
          spanCodigo.textContent = "";

          alert("Dados enviados com sucesso!");
        }
      },
      error => {
        console.error('Erro ao enviar dados:', error);
      });
  }

}
