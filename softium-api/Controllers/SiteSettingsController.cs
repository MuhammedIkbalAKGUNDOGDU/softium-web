using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SiteSettingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SiteSettingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/sitesettings
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SiteSetting>>> GetSettings()
    {
        return await _context.SiteSettings.ToListAsync();
    }

    // POST: api/sitesettings/bulk
    [HttpPost("bulk")]
    public async Task<IActionResult> UpdateSettingsBulk([FromBody] Dictionary<string, string> settings)
    {
        foreach (var kvp in settings)
        {
            var setting = await _context.SiteSettings.FirstOrDefaultAsync(s => s.SettingKey == kvp.Key);
            
            if (setting != null)
            {
                setting.SettingValue = kvp.Value;
                setting.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                _context.SiteSettings.Add(new SiteSetting
                {
                    Id = Guid.NewGuid(),
                    SettingKey = kvp.Key,
                    SettingValue = kvp.Value,
                    UpdatedAt = DateTime.UtcNow
                });
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Ayarlar başarıyla güncellendi." });
    }
}
