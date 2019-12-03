import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';

import { UpgradableComponent } from 'theme/components/upgradable';
import { clientesService } from './clientesService';
import { TablesService } from '../tables/tables.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;

 
  public response:any = [];
  public clientess:any = [];


  constructor(private clientesService : clientesService) {}

  ngOnInit(): void {
    this.clientesService.getRols().subscribe(
      res => {
        this.clientess = res;
      },
      err => console.log(err)
    );
  }

  //Action for the button
  btnAction:string;
  //Variables to store data
  cliente = {_id:null, cedula:null, nombre:null, direccion:null, telefono:null};


  //Save data obtained in the form
  saveCliente(){
    console.log(this.cliente);

    let sendCliente = {
      cedula:this.cliente.cedula, 
      nombre:this.cliente.nombre, 
      direccion:this.cliente.direccion, 
      telefono:this.cliente.telefono}

    this.clientesService.addRol(sendCliente)
    .subscribe(clientes =>{

      this.response = clientes;
      console.log("se guardaron los datos");

     });
     console.log(this.response);
  }


}
