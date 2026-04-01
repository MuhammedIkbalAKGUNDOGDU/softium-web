namespace Softium.Api.Models;

public class Testimonial
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string QuoteTr { get; set; } = string.Empty;
    public string? QuoteEn { get; set; }
    public string? QuoteDe { get; set; }
    public string Color { get; set; } = "#135bec";
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
