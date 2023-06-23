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

        public UsuarioRepo()
        {
            // Configurar las columnas en la tabla dtUsuarios si no existen
            if (!dtUsuarios.Columns.Contains("Id"))
                dtUsuarios.Columns.Add("Id", typeof(int));

            if (!dtUsuarios.Columns.Contains("Nombre"))
                dtUsuarios.Columns.Add("Nombre", typeof(string));

            if (!dtUsuarios.Columns.Contains("Apellido"))
                dtUsuarios.Columns.Add("Apellido", typeof(string));

            if (!dtUsuarios.Columns.Contains("Email"))
                dtUsuarios.Columns.Add("Email", typeof(string));

            if (!dtUsuarios.Columns.Contains("Telefono"))
                dtUsuarios.Columns.Add("Telefono", typeof(int));
        }

        public async Task<bool> AgregarUsuario(Usuario usuario)
        {
            //Se le asigna un id nuevo
            int nuevoId = AsignarNuevoId();
            try
            {
                DataRow dr = dtUsuarios.NewRow();
                dr["Id"] = nuevoId;
                dr["Nombre"] = usuario.Nombre;
                dr["Apellido"] = usuario.Apellido;
                dr["Email"] = usuario.Email;
                dr["Telefono"] = usuario.Telefono;

                dtUsuarios.Rows.Add(dr);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        } //

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
        } //

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
        } //

        public async Task<IEnumerable<Usuario>> ObtenerUsuarios()
        {
            return ConvertirDataTable(dtUsuarios);
        } //

        private int AsignarNuevoId()
        {
            var lista = dtUsuarios.AsEnumerable();
            if(lista.Count() != 0)
            {
                int ultimoId = lista.LastOrDefault().Field<int>("Id");
                return ultimoId + 1;
            }
            else
            {
                return 1;
            }
            
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
            //Usuario usuario = new Usuario();
            foreach (DataRow item in dt.Rows)
            {
                Usuario usuario = new Usuario();
                usuario.Id = (int)item["Id"];
                usuario.Nombre = item["Nombre"].ToString();
                usuario.Apellido = item["Apellido"].ToString();
                usuario.Email = item["Email"].ToString();
                usuario.Telefono = (int)item["Telefono"];

                listaUsuarios.Add(usuario);
            }
            return listaUsuarios;
        }
    }
}
