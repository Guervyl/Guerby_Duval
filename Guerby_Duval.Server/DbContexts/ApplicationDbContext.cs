using AngularApp3.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AngularApp3.Server.DbContexts
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Tarea> Tareas { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}
