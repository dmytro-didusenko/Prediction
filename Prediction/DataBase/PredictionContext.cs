using Microsoft.EntityFrameworkCore;

namespace DataBase
{
    public class PredictionContext : DbContext
    {      
        public PredictionContext(DbContextOptions<PredictionContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<PredictionItem> PredictionItems { get; set; }
    }
}
