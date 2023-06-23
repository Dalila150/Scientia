using ScientiaChallenge.Entidades;

namespace ScientiaChallenge.Interfaces
{
    public interface IUsuario
    {
        Task<IEnumerable<Usuario>> ObtenerUsuarios();
        Task<bool> AgregarUsuario(Usuario usuario);
        Task<bool> ModificarUsuario(Usuario usuario);
        Task<bool> EliminarUsuario(int id);


    }
}
