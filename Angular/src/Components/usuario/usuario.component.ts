import { Component } from '@angular/core';
import { ApiService } from 'src/service/api.service';

class Usuario {
  id : number = 0;
  nombre: string = '';
  apellido: string = ''
  email: string = '';
  telefono: string = '';
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent {

  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {id: 0, nombre: '', apellido: '', email: '', telefono: '' };
  mensajeError: string = '';
  soloNumerosPattern = '^[0-9]*$';
  estadoBoton = false;
 

  constructor(private apiService: ApiService) {
    this.ObtenerUsuarios();
  }

  ObtenerUsuarios(): void {
    this.apiService.ObtenerUsuarios().subscribe( usuarios =>{
      this.usuarios = usuarios;
      console.log(this.usuarios);
     })
  }

  AgregarUsuario(): void {
    
      if(this.nuevoUsuario.id === 0){  //no se selecciono nada de la tabla
        this.apiService.AgregarUsuario(this.nuevoUsuario).subscribe(() => {
          this.nuevoUsuario = {id: 0, nombre: '', apellido: '', email: '', telefono: '' };
          this.ObtenerUsuarios();
          this.mensajeError = '';
        });
      }
      else{
        this.ModificarUsuario();
        this.mensajeError = '';
      }
    
  }

  EliminarUsuario(): void {
    /*if(confirm('Esta seguro de eliminar el us')){

    }*/
    this.apiService.EliminarUsuario(this.nuevoUsuario.id).subscribe(() => {
      this.nuevoUsuario = {id: 0, nombre: '', apellido: '', email: '', telefono: '' };
      this.ObtenerUsuarios();
    });
  }

  ModificarUsuario(): void {
    this.apiService.ModificarUsuario(this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = {id: 0, nombre: '', apellido: '', email: '', telefono: '' };
      this.ObtenerUsuarios();
    });
  }

  ActivarEdicion(usuario : Usuario): void {
    this.nuevoUsuario.id = usuario.id;
    this.nuevoUsuario.nombre = usuario.nombre;
    this.nuevoUsuario.apellido = usuario.apellido;
    this.nuevoUsuario.email = usuario.email;
    this.nuevoUsuario.telefono = usuario.telefono;

  }

  ValidarUsuario(): void{

    if(this.onNombreChange() && this.onApellidoChange() && this.onEmailChange() && this.onTelefonoChange()){
      this.mensajeError = '';
      this.estadoBoton = true;
    }
    else{
      this.mensajeError = 'Por favor, complete los campos faltantes.';
      this.estadoBoton = false;
    }


  }

 onNombreChange(): boolean{
  const nombre = this.nuevoUsuario.nombre;
  const soloLetras = /^[a-zA-Z]*$/;

  if(!soloLetras.test(nombre) || nombre.trim() === ''){
    return false;
  }
  else{
    return true;
  }
 }

 onApellidoChange(): boolean{
  const apellido = this.nuevoUsuario.apellido;
  const soloLetras = /^[a-zA-Z]*$/;

  if(!soloLetras.test(apellido) || apellido.trim() === ''){
    return false;
  }
  else{
    return true;
  }
 }

 onEmailChange(): boolean{
  const email = this.nuevoUsuario.email;
  const symbol = email.split('@').length - 1;

  if(symbol !== 1 || email === ''){
    return false;
  }
  else{
    return true;
  }
 }

  onTelefonoChange():boolean {
    const telefono = this.nuevoUsuario.telefono;
    const soloNumeros = /^[0-9]*$/;
    
    if (!soloNumeros.test(telefono) || telefono === '') {
      return false;
    }
    else{
      return true;
    }

  }
}
