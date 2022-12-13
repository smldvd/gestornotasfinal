import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
titulo: string='crear cliente';
cliente: Client={
  _id: ''
};
errores: string[]=[];
buttonCreate:boolean=false;



  constructor(private clienteService:ClientService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getClientById();
    this.getButton();
  }
  getButton():void{
    if(this.cliente.nombre==undefined && this.cliente.apellido==undefined || this.cliente.correo==undefined){
      this.buttonCreate=true;
    }else{
      this.buttonCreate=false;
    }
  }
create():void{
  this.clienteService.create(this.cliente).subscribe({
    next:(client:Client)=>{
      this.router.navigate(['/clients']);
    },
    error:(err)=>{
      this.errores=err.error.errors as string[];
      console.error('coddigo de erreres desde el backend'+err.status);
      console.error(err.error.errors);
    }
  })
}
update():void{
  this.clienteService.update(this.cliente).subscribe({
    next:(client:Client)=>{
      this.router.navigate(['/clients']);
    },
    error:(err)=>{
      this.errores=err.error.errors as string[];
      console.log('codigo de error desde el backend'+err.status);
      console.error(err.error.errors);
    }
  })
}
getClientById():void{
  this.activatedRoute.paramMap.subscribe(params=>{
    let id=params.get('id');
    if(id){
      this.clienteService.getClientById(Number(id)).subscribe({
        next:(client:Client)=>{
          this.cliente=client;
        },
        error:()=>{},
        complete:()=>{}
      })
    }
  })
}
}
