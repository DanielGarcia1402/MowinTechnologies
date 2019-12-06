import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';

import { UpgradableComponent } from 'theme/components/upgradable';
import { categoriasService } from './categoriasService';
import swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;

 
  public response:any = [];
  public categoriass:any = [];
  public dni: String;
  public info:any = [];


  constructor(private categoriasService : categoriasService) {}

  //Action for the button
  btnAction:string;
  //Variables to store data
  cliente = {_id:null, cedula:null, nombre:null, direccion:null, telefono:null};
  categoria = {_id:null, nombre:null, descripcion:null};

  ngOnInit(): void {
    this.info.push("Guardar");
    this.categoriasService.getRols().subscribe(
      res => {
        this.response = res;
        console.log(res);
        this.cargarTabla(this.response);
      },
      err => console.log(err)
    );
  }

  cargarTabla(respuesta){
    respuesta.clientes.forEach((element, index )=> {
      this.categoriass.push(
        {_id:element._id,
          nombre:element.nombre,
          descripcion:element.descripcion,
          fecha:element.fechaCreación
        });
    });
    console.log(this.categoriass);
  }

  openModal(modal) {
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  limpiarCampos(){
    this.categoria.nombre ="";
    this.categoria.descripcion ="";
  }

  mensajeEliminar(){
    swal.fire({
      title: 'Eliminación',
      text: 'Exito al eliminar!',
      timer: 8000
    });
  }

  mensajeGuardar(){
    swal.fire({
      title: 'Guardar',
      text: 'Exito al guardar!',
      timer: 8000
    });
  }

  mensajeCargarActualizar(){
    swal.fire({
      title: 'Datos cargados',
      text: 'Exito!',
      timer: 6000
    });
  }

  mensajeActualizar(){
    swal.fire({
      title: 'Actualizar',
      text: 'Exito al actualizar!',
      timer: 8000
    });
  }

  mensajeCamposVacios(){
    swal.fire({
      title: 'Campos nulos',
      text: 'Error!',
      timer: 8000
    });
  }

  cargarActualizar(identificador){
    this.categoria._id = identificador._id
    this.categoria.nombre = identificador.nombre;
    this.categoria.descripcion = identificador.descripcion;
    this.mensajeCargarActualizar();
  }

  onDelete(identificador){
    const repu = this.categoriass;
    const resp = confirm("Estas seguro de eliminar la categoria");
    if(resp){
      this.categoriasService.deleteRol(identificador)
      .subscribe(data => {
        console.log(data + "data");
        for(let i = 0; i < repu.length; i++){
          if(repu[i]._id == identificador){
            repu.splice(i,1);
          }
        }
      });
      console.log(identificador + "Este es el identificador");
      this.mensajeEliminar();
    } else {
      return;
    }
  }

  onUpdate(identificador){
    console.log("este es el identificador");
    console.log(identificador);
    this.info.push("Editar");
    this.cargarActualizar(identificador);
  }

  saveUpdate(){
    if(this.categoria.nombre == "" || this.categoria.descripcion == ""){

        this.mensajeCamposVacios();
        console.log("campos vacios" + this.categoria.nombre + this.categoria.descripcion);

      } else {
        console.log(this.categoria);
        this.categoriasService.updateRol(this.categoria)
        .subscribe(rep => {
          this.response = rep;
          console.log("se actualizaron los datos");
          console.log(this.response);
          this.mensajeActualizar();
          this.limpiarCampos();
        });
      }
  }

  //Save data obtained in the form
  saveCategoria(){
    if(this.categoria.nombre == null || this.categoria.descripcion == null){

      this.mensajeCamposVacios();
      console.log("campos vacios" + this.categoria.nombre + this.categoria.descripcion);

    } else {
      console.log(this.categoria);

      let sendCategoria = {
        nombre:this.categoria.nombre, 
        descripcion:this.categoria.descripcion}

      this.categoriasService.addRol(sendCategoria)
      .subscribe(categorias =>{

        this.response = categorias;
        console.log("se guardaron los datos");
        console.log(this.response);
        this.mensajeGuardar();
        this.limpiarCampos();

      });
    }
  }


}
