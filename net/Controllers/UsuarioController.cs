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
        

        [HttpGet("ObtenerUsuarios")]
        public async Task<IActionResult> ObtenerUsuarios()
        
        {
            var listaUsuarios = await _usuarios.ObtenerUsuarios();
            //if(listaUsuarios.Count() != 0)
            //{
                return Ok(listaUsuarios);
            //}
            //else
            //{
            //    return BadRequest(listaUsuarios);
            //}   
        }
        
        [HttpPost("AgregarUsuario")]
        public async Task<IActionResult> AgregarUsuario([FromBody]Usuario usuario)
        {
           if(!ModelState.IsValid)
                return BadRequest(ModelState);

                var estado = await _usuarios.AgregarUsuario(usuario);
                if (estado)
                    return Ok(estado);
                else
                    return BadRequest("No se pudo agregar el usuario");
        }

        [HttpDelete("EliminarUsuario/{id}")]
        public async Task<IActionResult> EliminarUsuario([FromRoute] int id)
        {
            
                var estado = await _usuarios.EliminarUsuario(id);
                if (estado)
                    return Ok(estado);
                else
                    return BadRequest("No se pudo eliminar el usuario");
            
        }

        [HttpPost("ModificarUsuario")]
        public async Task<IActionResult> ModificarUsuario([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

                var estado = await _usuarios.ModificarUsuario(usuario);
                if (estado)
                    return Ok(estado);
                else
                    return BadRequest("No se pudo modificar el usuario");
            
        }
    }
}
