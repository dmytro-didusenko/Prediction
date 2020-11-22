using System.ComponentModel.DataAnnotations;

namespace DataBase
{
    public class Topic
    {
        [Key]
        public int TopicId { get; set; }
        [Required]
        public string TopicName { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
