namespace Softium.Api.Models;

public class BlogPost
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string TitleTr { get; set; } = string.Empty;
    public string? TitleEn { get; set; }
    public string? TitleDe { get; set; }
    public string ContentTr { get; set; } = string.Empty;
    public string? ContentEn { get; set; }
    public string? ContentDe { get; set; }
    public string? ExcerptTr { get; set; }
    public string? ExcerptEn { get; set; }
    public string? ExcerptDe { get; set; }
    public string? CoverImage { get; set; }
    public int ReadTime { get; set; } = 5;
    public bool IsPublished { get; set; } = false;
    public bool IsFeatured { get; set; } = false;
    public string? AuthorName { get; set; }
    public string? AuthorRole { get; set; }
    public string? Category { get; set; }
    public DateTime? PublishedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
