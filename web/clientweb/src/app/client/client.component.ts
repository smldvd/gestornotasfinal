import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from './client';
import { ClientRespon } from './clientRespon';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
title:string='Lista Clientes';
clients: Client[]=[]

  constructor(private clientService: ClientService) {}
    
  ngOnInit(): void {
  this.getClients();}
getClients(): void {
    this.clientService.getClients().subscribe({
      next:(result: ClientRespon)=> {
        const data:ClientRespon=result;
        this.clients=data.clients ||[];
          },
      error:()=>{},
      complete:()=>{
        console.log(this.clients);
      }
    });
}
delete(client:Client):void{
  this.clientService.delete(client._id||'').subscribe({
    next:()=>{
      this.clients=this.clients.filter(x=> x!=client);
    }
  })
}
}