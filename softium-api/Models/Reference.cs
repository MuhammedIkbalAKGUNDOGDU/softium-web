namespace Softium.Api.Models;

public class Reference
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public string? LogoUrl { get; set; }
    public string? WebsiteUrl { get; set; }
    
    public string? Description { get; set; } // Deprecated, use DescriptionTr
    public string? DescriptionTr { get; set; }
    public string? DescriptionEn { get; set; }
    public string? DescriptionDe { get; set; }

    public string Industry { get; set; } = string.Empty; // Deprecated, use IndustryTr
    public string? IndustryTr { get; set; }
    public string? IndustryEn { get; set; }
    public string? IndustryDe { get; set; }

    public int DisplayOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
