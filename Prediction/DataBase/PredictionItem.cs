using System.ComponentModel.DataAnnotations;

namespace DataBase
{
    public class PredictionItem
    {
        [Key]
        public int PredictionId { get; set; }
        [Required]
        public string PredictionContent { get; set; }
        [Required]
        public int TopicId { get; set; }
    }
}
