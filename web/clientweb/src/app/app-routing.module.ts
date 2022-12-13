import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { FormComponent } from './client/form/form.component';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'

const routes: Routes = [
{ path: 'clients', component: ClientComponent},
{ path: 'clients/form', component: FormComponent},
{ path: 'clients/form/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FormsModule]
})
export class AppRoutingModule { }
