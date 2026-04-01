using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;
using System.Text;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NewsletterController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NewsletterController(ApplicationDbContext context)
    {
        _context = context;
    }

    public class SubscribeDto
    {
        public string Email { get; set; } = string.Empty;
    }

    // POST: api/newsletter/subscribe
    [HttpPost("subscribe")]
    public async Task<IActionResult> Subscribe([FromBody] SubscribeDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest(new { message = "Geçersiz E-Posta." });

        var email = dto.Email.Trim().ToLower();
        var exists = await _context.NewsletterSubscribers.AnyAsync(n => n.Email == email);
        
        if (exists)
        {
            return Conflict(new { message = "Bu e-posta adresi zaten bültenimize kayıtlı." });
        }

        _context.NewsletterSubscribers.Add(new NewsletterSubscriber
        {
            Id = Guid.NewGuid(),
            Email = email,
            SubscribedAt = DateTime.UtcNow,
            IsActive = true
        });
        await _context.SaveChangesAsync();

        return Ok(new { message = "Aboneliğiniz başarıyla kaydedildi!" });
    }

    // GET: api/newsletter
    [HttpGet]
    public async Task<IActionResult> GetSubscribers()
    {
        var subs = await _context.NewsletterSubscribers
            .OrderByDescending(n => n.SubscribedAt)
            .ToListAsync();
        return Ok(subs);
    }
    
    // DELETE: api/newsletter/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var sub = await _context.NewsletterSubscribers.FindAsync(id);
        if (sub == null) return NotFound();
        
        _context.NewsletterSubscribers.Remove(sub);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    // GET: api/newsletter/export
    [HttpGet("export")]
    public async Task<IActionResult> ExportToCsv()
    {
        var subs = await _context.NewsletterSubscribers
            .OrderByDescending(n => n.SubscribedAt)
            .ToListAsync();

        var builder = new StringBuilder();
        builder.AppendLine("Email;Tarih;Durum");

        foreach (var sub in subs)
        {
            builder.AppendLine($"{sub.Email};{sub.SubscribedAt:dd.MM.yyyy HH:mm:ss};{(sub.IsActive ? "Aktif" : "Pasif")}");
        }

        var bytes = Encoding.UTF8.GetPreamble().Concat(Encoding.UTF8.GetBytes(builder.ToString())).ToArray();
        return File(bytes, "text/csv", $"Bulten_Aboneleri_{DateTime.Now:yyyyMMdd}.csv");
    }
}
