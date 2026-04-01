using System;
using System.ComponentModel.DataAnnotations;

namespace Softium.Api.Models
{
    public class AdminLoginLog
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        
        [Required]
        public string Username { get; set; } = string.Empty;
        
        public string IpAddress { get; set; } = string.Empty;
        
        public string UserAgent { get; set; } = string.Empty;
        
        public string Location { get; set; } = "Unknown";
        
        public DateTime LoginDate { get; set; } = DateTime.UtcNow;
        
        public bool IsSuccess { get; set; } = true;
    }
}
