using System.ComponentModel.DataAnnotations;

namespace DataBase
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserEMail { get; set; }
        public string OrganizationName { get; set; }
        [Required]
        public string UserPassword { get; set; }
    }
}
