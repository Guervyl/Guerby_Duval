using Guerby_Duval.Server.ModelValidations;
using System.ComponentModel.DataAnnotations;

namespace AngularApp3.Server.Models
{
    public class Tarea
    {
        public int Id { get; set; }

        [Required]
        public string Titulo { get; set; }

        [Required]
        public string Descripcion { get; set; }

        [Required]
        [TareaFecha]
        public DateTime FechaCreacion { get; set; }

        [Required]
        public DateTime FechaVencimiento { get; set; }

        public bool Completada { get; set; }
    }
}
