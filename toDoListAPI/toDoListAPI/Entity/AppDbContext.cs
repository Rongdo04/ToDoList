using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace toDoListAPI.Entity {
    public class AppDbContext : DbContext {
        public virtual DbSet<Tasks> Tasks { get; set; }
       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            // Cấu hình kết nối đến cơ sở dữ liệu, ví dụ: SQL Server
            optionsBuilder.UseSqlServer("Server=DESKTOP-KBA58DG\\SQLEXPRESS;Database=toDoListAPI;Trusted_Connection = true;TrustServerCertificate = true");

        }
        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<Tasks>()
                .HasIndex(u => u.TaskName)
                .IsUnique();
        }
    }

}
