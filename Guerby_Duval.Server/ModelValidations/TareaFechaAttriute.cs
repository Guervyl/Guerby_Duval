using AngularApp3.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace Guerby_Duval.Server.ModelValidations
{
    public class TareaFechaAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var t = (Tarea)validationContext.ObjectInstance;

            if (value != null && ((DateTime)value) < t?.FechaVencimiento) {
                return new ValidationResult("La fecha de creación debe ser mayor que la fecha de vencimiento.");
            }

            return ValidationResult.Success;
        }
    }
}
