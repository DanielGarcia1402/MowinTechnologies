import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { productosService } from './productosService';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;

 
  public response:any = [];
  public productoss:any = [];
  public categoriass:any = [];
  public dni: String;
  public info:any = [];


  constructor(private productosService : productosService) {}

  //Action for the button
  btnAction:string;
  //Variables to store data
  cliente = {_id:null, cedula:null, nombre:null, direccion:null, telefono:null};
  producto = {_id:null, nombre:null, precio:null, unidad:null, imagen:null, proveedor:null, categoria:null};

  ngOnInit(): void {
    this.info.push("Guardar");
    this.cargarCategoria();
    this.productosService.getRols().subscribe(
      res => {
        this.response = res;
        console.log(res);
        this.cargarTabla(this.response);
      },
      err => console.log(err)
    );
  }

  cargarCategoria(){
    this.productosService.getCategorias()
    .subscribe(res => {
      this.response = res;
      console.log("Categorias " + res);
      this.llenarSelectCate(this.response);
    });
  }

  llenarSelectCate(respuesta){
    respuesta.clientes.forEach((element, index )=> {
      this.categoriass.push(
        {_id:element._id, 
          nombre:element.nombre
        });
    });
    console.log(this.categoriass);
  }

  cargarTabla(respuesta){
    respuesta.productos.forEach((element, index )=> {
      this.productoss.push(
        {_id:element._id, 
          nombre:element.nombre,
          precio:element.precio,
          unidad:element.unidad,
          imagen:element.imagen,
          proveedor:element.proveedor,
          categoria:element.categoria
        });
    });
    console.log(this.productoss);
  }

  openModal(modal) {
    modal.open();
  }

  closeModal(modal) {
    modal.close();
  }

  limpiarCampos(){
    this.producto.nombre ="";
    this.producto.precio ="";
    this.producto.unidad ="";
    this.producto.imagen ="";
    this.producto.proveedor ="";
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
    this.producto._id       = identificador._id
    this.producto.nombre    = identificador.nombre;
    this.producto.precio    = identificador.precio;
    this.producto.unidad    = identificador.unidad;
    this.producto.imagen    = identificador.imagen;
    this.producto.proveedor = identificador.proveedor;
    this.producto.categoria = identificador.categoria;
    this.mensajeCargarActualizar();
  }

  onDelete(identificador){
    const repu = this.productoss;
    const resp = confirm("Estas seguro de eliminar el producto ");
    if(resp){
      this.productosService.deleteRol(identificador)
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
    console.log(identificador);
    this.info.push("Editar");
    this.cargarActualizar(identificador);
  }

  saveUpdate(){
    if(this.producto.nombre == "" || this.producto.precio == "" 
      || this.producto.unidad == "" || this.producto.imagen == ""
      || this.producto.proveedor == "" || this.producto.categoria == ""){

        this.mensajeCamposVacios();
        console.log("campos vacios" + 
        this.producto.nombre + this.producto.precio + this.producto.unidad + this.producto.imagen
       + this.producto.proveedor + this.producto.categoria);

      } else {
        console.log(this.producto);
        this.productosService.updateRol(this.producto)
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
  saveProducto(){
    if(this.producto.nombre == null || this.producto.precio == null
      || this.producto.unidad == null || this.producto.imagen == null
      || this.producto.proveedor == null || this.producto.categoria == null){

      this.mensajeCamposVacios();
      console.log("campos vacios" + 
      this.producto.nombre + this.producto.precio + this.producto.unidad + this.producto.imagen
       + this.producto.proveedor + this.producto.categoria);

    } else {
      console.log(this.producto);

      let sendProducto = {
        nombre:this.producto.nombre, 
        precio:this.producto.precio, 
        unidad:this.producto.unidad, 
        imagen:this.producto.imagen,
        proveedor:this.producto.proveedor,
        categoria:this.producto.categoria}

      this.productosService.addRol(sendProducto)
      .subscribe(producto =>{

        this.response = producto;
        console.log("se guardaron los datos");
        console.log(this.response);
        this.mensajeGuardar();
        this.limpiarCampos();
      });
    }
  }


}
