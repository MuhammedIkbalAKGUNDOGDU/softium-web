using System;
using System.Collections.Generic;

namespace Softium.Api.Models;

public class Project
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    
    // Header Info
    public string TitleTr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string TitleDe { get; set; } = string.Empty;
    
    public string OverlineTr { get; set; } = string.Empty; // e.g., "Core Infrastructure"
    public string OverlineEn { get; set; } = string.Empty;
    public string OverlineDe { get; set; } = string.Empty;

    public string ShortDescriptionTr { get; set; } = string.Empty;
    public string ShortDescriptionEn { get; set; } = string.Empty;
    public string ShortDescriptionDe { get; set; } = string.Empty;

    // Detailed Content (Rich Text)
    public string DetailedContentTr { get; set; } = string.Empty;
    public string DetailedContentEn { get; set; } = string.Empty;
    public string DetailedContentDe { get; set; } = string.Empty;

    // Visuals
    public string MainImage { get; set; } = string.Empty;
    public string? HoverImage { get; set; }
    public string? Icon { get; set; } // Material icon name
    
    // Configuration
    public bool IsDarkTheme { get; set; } = false;
    public string Layout { get; set; } = "standard"; // standard or split
    public bool IsPublished { get; set; } = true;
    public int SortOrder { get; set; } = 0;
    
    // Call to Action
    public string? DemoUrl { get; set; }
    public string? DocumentUrl { get; set; }
    public string? TechnicalSpecsDe { get; set; }
    public string? TechnicalSpecsTr { get; set; }
    public string? TechnicalSpecsEn { get; set; }

    // Relationship
    public ICollection<ProjectFeature> Features { get; set; } = new List<ProjectFeature>();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class ProjectFeature
{
    public Guid Id { get; set; }
    public Guid ProjectId { get; set; }
    
    public string TitleTr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string TitleDe { get; set; } = string.Empty;
    
    public string? Icon { get; set; } // Material icon name
    public int SortOrder { get; set; } = 0;
}
