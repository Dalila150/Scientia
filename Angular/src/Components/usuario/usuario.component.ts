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
//prueba
  //data: any[] = [];
  
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = { nombre: '', apellido: '', email: '', telefono: '' };

  constructor(private apiService: ApiService) {
    this.ObtenerUsuarios();
  }

  ngOnInit(): void{
    
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
