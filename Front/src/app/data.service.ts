import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
// CRIAÇÃO DA INTERFACE PARA O OBJETO JSON DE RETORNO DO ENVIO DO FORMS DE NOVO USUARIO
interface ErrStts {
  rhErr: boolean;
  sanguineoErr: boolean;
  cpfErr: boolean;
  contatoErr: boolean;
  nomeErr: boolean;
  codigoErr: boolean;
  mensagem:string;
}
interface PostResponse{
  sttsForms: ErrStts;
}
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


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // variavel para armazenar doadores a partir da busca
  doadores: Array<Doador> = []
  // construtor
  constructor(private http: HttpClient) { }
  //métodos
  setDoadores(doadores:Array<Doador>):void{
    this.doadores = doadores;
  }
  getDoadores():Array<Doador>{
    return this.doadores;
  }
  // funções por rotas 
  getHello(): Observable<any> {
    return this.http.get('http://localhost:8000/');
  }
  getRotaTeste(valor:any, quantidade:any):Observable<any>{
    return this.http.get('http://localhost:8000/teste?valor='+valor+'&quantidade='+quantidade)
  }
  getRotaTesteComId(id:number):Observable<any>{
    const url =  'http://localhost:8000/teste/'+id;
    return this.http.get(url)
  }
  
  
  
  updateDoador(doador:Doador){
    const url = 'http://localhost:8000/update'; 
    return this.http.post<boolean>(url, doador);

  }
  inativarDoador(doador:Doador){
    const url = 'http://localhost:8000/remover'; 
    return this.http.post<boolean>(url, doador);

  }
  enviarDado(dado: any) {
    const url = 'http://localhost:8000/formulario'; 
    return this.http.post<PostResponse>(url, dado);
  }
  enviarBusca(dado: any) {
    const url = 'http://localhost:8000/buscar'; 
    return this.http.post<Doadores>(url, dado);
  }

  statusEnvio():Observable<any>{
    return this.http.get("http://localhost:8000/formulario");
  }
}