using Microsoft.AspNetCore.Mvc;
using ScientiaChallenge.Entidades;
using ScientiaChallenge.Interfaces;
using System.Data;

namespace ScientiaChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuario _usuarios;

        public UsuarioController(IUsuario usuarios) 
        {
            _usuarios = usuarios;
        }
        
        //KISS

        [HttpGet("ObtenerUsuarios")]
        public async Task<IActionResult> ObtenerUsuarios()
        {
            var listaUsuarios = await _usuarios.ObtenerUsuarios();
            if(listaUsuarios.Count() != 0)
            {
                return Ok(listaUsuarios);
            }
            else
            {
                List<Usuario> lista = new List<Usuario>
                {
                    new Usuario {Nombre = "Dalila", Apellido = "Baena", Email = "dioasjd", Telefono = 1213},
                    new Usuario {Nombre = "Paloma", Apellido = "Baena", Email = "aaa", Telefono = 1213},
                };
                listaUsuarios = lista;
                return Ok(listaUsuarios);
                //return BadRequest("La lista no contiene elementos"); //puedo poner cualquier status?
            }   
        }
        
        [HttpPost("AgregarUsuario")]
        public async Task<IActionResult> AgregarUsuario([FromBody]Usuario usuario)
        {
           if(!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var estado = await _usuarios.AgregarUsuario(usuario);
                if (estado)
                    return Ok(estado);
                else
                    return BadRequest("No se pudo agregar el usuario");
            }
            catch (Exception)
            {
                return BadRequest("No se pudo agregar un nuevo usuario.");
            }
        }

        [HttpPost("EliminarUsuario/{id}")]
        public async Task<IActionResult> EliminarUsuario([FromRoute] int id)
        {
            try
            {
                var estado = await _usuarios.EliminarUsuario(id);
                if (estado)
                    return Ok(estado);
                else
                    return BadRequest(estado);
            }
            catch (Exception)
            {
                return BadRequest("No se pudo eliminar el usuario");
                //throw;
            }
        }

        [HttpPost("ModificarUsuario")]
        public async Task<IActionResult> ModificarUsuario([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var estado = await _usuarios.ModificarUsuario(usuario);
                if (estado)
                    return Ok(estado);
                else
                    return BadRequest(estado);
            }
            catch (Exception)
            {
                return BadRequest("No se pudo modificar el usuario");
                //throw;
            }
            

        }
    }
}
