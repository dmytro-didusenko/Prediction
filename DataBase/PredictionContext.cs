using Microsoft.EntityFrameworkCore;

namespace DataBase
{
    public class PredictionContext : DbContext
    {
        public PredictionContext(DbContextOptions<PredictionContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
