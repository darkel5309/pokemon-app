import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponent } from './components/detalles/detalles.component';
import { ListadoComponent } from './components/listado/listado.component';

const routes: Routes = [
  { path: "", component: ListadoComponent },
  { path: "detail/:id", component: DetallesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
