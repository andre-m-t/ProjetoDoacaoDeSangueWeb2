import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ErrStts {
  txtErr: boolean;
  nmbrErr: boolean;
  boolErr: boolean;
  sxErr: boolean;
  corErr: boolean;
}
interface PostResponse{
  sttsForms: ErrStts;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

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
  enviarDado(dado: any) {
    const url = 'http://localhost:8000/formulario'; 
    return this.http.post<PostResponse>(url, dado);
  }
  statusEnvio():Observable<any>{
    return this.http.get("http://localhost:8000/formulario");
  }
}