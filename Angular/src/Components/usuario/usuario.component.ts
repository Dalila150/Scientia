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
    if(this.ValidarUsuario(this.nuevoUsuario) === true){
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
    else{
      this.mensajeError = 'Por favor, complete los campos faltantes.';
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

  ValidarUsuario(usuario: Usuario): boolean{

    if(usuario.nombre.trim() === ''){
      return false;
    }

    if(usuario.apellido.trim() === ''){
      return false;
    }
    
    if(usuario.email.trim() === ''){
      return false;
    }

    if(usuario.telefono === ''){
      return false;
    }
    return true;

  }
}
