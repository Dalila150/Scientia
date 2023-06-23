using ScientiaChallenge.Entidades;
using ScientiaChallenge.Interfaces;
using System.Data;
using System.Linq;

namespace ScientiaChallenge.Repositorio
{
    public class UsuarioRepo : IUsuario
    {
        //saca de la base de datos o DATA TABLE
        //validaciones

        private static DataTable dtUsuarios = new DataTable();

        public async Task<bool> AgregarUsuario(Usuario usuario)
        {
            //revisar como llega el ID para asignarle uno
            try
            {
                dtUsuarios.Rows.Add(usuario);
                return true;
            }
            catch (Exception)
            {
                return false;
                //throw;
            }
        }

        public async Task<bool> EliminarUsuario(int id)
        {
            var busqueda = BuquedaUsuario(id);
            if (busqueda == null)
            {
                return false;
            }
            else
            {
                try
                {
                    busqueda.Delete();
                    dtUsuarios.AcceptChanges();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }

        }

        public async Task<bool> ModificarUsuario(Usuario usuario)
        {
            //buscar si el usuario ya existe
            
            var busqueda = BuquedaUsuario(usuario.Id);
            if(busqueda == null)
            {
                return false;
            }
            else
            {
                busqueda["Nombre"] = usuario.Nombre;
                busqueda["Apellido"] = usuario.Apellido;
                busqueda["Email"] = usuario.Email;
                busqueda["Telefono"] = usuario.Telefono;
                try
                {
                    dtUsuarios.AcceptChanges();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }

        public async Task<IEnumerable<Usuario>> ObtenerUsuarios()
        {
            return ConvertirDataTable(dtUsuarios);
            //throw new NotImplementedException();
        }

        private DataRow BuquedaUsuario(int id)
        {
            var lista = dtUsuarios.AsEnumerable();
            var busqueda = lista.Where(x => x.Field<int>("Id") == id).FirstOrDefault();
            //
            return busqueda;
        }
        private List<Usuario> ConvertirDataTable(DataTable dt)
        {
            List<Usuario> listaUsuarios = new List<Usuario>();
            Usuario usuario = new Usuario();
            foreach (DataRow item in dt.Rows)
            {
                usuario.Nombre = item["Nombre"].ToString();
                usuario.Apellido = item["Apellido"].ToString();
                usuario.Email = item["Email"].ToString();
                usuario.Telefono = (int)item["Telefono"];
            }
            return listaUsuarios;
        }
    }
}
