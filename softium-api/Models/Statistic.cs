namespace Softium.Api.Models;

public class Statistic
{
    public Guid Id { get; set; }
    public string Key { get; set; } = string.Empty; // e.g. "projects", "experience", etc.
    public string Value { get; set; } = string.Empty; // e.g. "500+"
    public string LabelTr { get; set; } = string.Empty;
    public string? LabelEn { get; set; }
    public string? LabelDe { get; set; }
    public string Icon { get; set; } = "folder_open";
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}
