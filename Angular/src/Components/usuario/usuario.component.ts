import { Component } from '@angular/core';
import { ApiService } from 'src/service/api.service';
//import { HttpClient } from '@angular/common/http';

class Usuario {
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
  nuevoUsuario: Usuario = { nombre: '', apellido: '', email: '', telefono: '' };
  usuarioEditado: Usuario = { nombre: '', apellido: '', email: '', telefono: '' };
  idEliminar: number = 0;
  modoEdicion: boolean = false;

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
    this.apiService.AgregarUsuario(this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = { nombre: '', apellido: '', email: '', telefono: '' };
      this.ObtenerUsuarios();
    });
  }

  EliminarUsuario(): void {
    this.apiService.EliminarUsuario(this.idEliminar).subscribe(() => {
      this.nuevoUsuario = { nombre: '', apellido: '', email: '', telefono: '' };
      this.ObtenerUsuarios();
    });
  }

  ModificarUsuario(): void {
    this.apiService.AgregarUsuario(this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = { nombre: '', apellido: '', email: '', telefono: '' };
      this.ObtenerUsuarios();
    });
  }

  ActivarEdicion() {
    this.usuarioEditado.nombre
    this.modoEdicion = true;
  }

  GuardarEdicion(usuario: Usuario) {
    this.ModificarUsuario();
    this.modoEdicion = false
  }

  CancelarEdicion() {
    this.modoEdicion = !this.modoEdicion;
  }

  
  /*ObtenerData(): void{
    this.apiService.GetData2().subscribe( data =>{
this.data = data;
console.log(this.data);
    })
  }

  AgregarUsuario(): void {
    this.http.post('/api/usuarios', this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = { Nombre: '', Apellido: '', Email: '', Telefono: '' };
      this.ObtenerUsuarios();
    });
}*/

}
