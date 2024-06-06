import { Routes } from '@angular/router';
import { BuscarDoadorComponent } from './buscar-doador/buscar-doador.component';
import { ListaDeDoadoresComponent } from './lista-de-doadores/lista-de-doadores.component';
import { NovoDoadorComponent } from './novo-doador/novo-doador.component';
import { ListaDeDoacoesComponent } from './lista-de-doacoes/lista-de-doacoes.component';


export const routes: Routes = [
    {path: 'busca', component: BuscarDoadorComponent},
    {path: 'lista-de-doadores', component: ListaDeDoadoresComponent},
    {path: 'cadastro', component: NovoDoadorComponent},
    {path: 'lista-de-doacoes', component: ListaDeDoacoesComponent}
];
