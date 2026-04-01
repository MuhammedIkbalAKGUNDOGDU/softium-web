using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReferencesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ReferencesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/references
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reference>>> GetReferences()
    {
        return await _context.References
            .OrderBy(r => r.DisplayOrder)
            .ThenByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    // GET: api/references/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Reference>> GetReference(Guid id)
    {
        var reference = await _context.References.FindAsync(id);

        if (reference == null)
        {
            return NotFound(new { message = "Referans bulunamadı." });
        }

        return reference;
    }

    // POST: api/references
    [HttpPost]
    public async Task<ActionResult<Reference>> CreateReference(Reference reference)
    {
        reference.Id = Guid.NewGuid();
        reference.CreatedAt = DateTime.UtcNow;
        reference.UpdatedAt = DateTime.UtcNow;

        _context.References.Add(reference);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetReference), new { id = reference.Id }, reference);
    }

    // PUT: api/references/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReference(Guid id, Reference referenceIn)
    {
        if (id != referenceIn.Id)
        {
            return BadRequest(new { message = "ID eşleşmiyor." });
        }

        var existingReference = await _context.References.FindAsync(id);
        if (existingReference == null)
        {
            return NotFound(new { message = "Referans bulunamadı." });
        }

        existingReference.Name = referenceIn.Name;
        existingReference.Industry = referenceIn.Industry;
        existingReference.Icon = referenceIn.Icon;
        existingReference.LogoUrl = referenceIn.LogoUrl;
        existingReference.WebsiteUrl = referenceIn.WebsiteUrl;
        existingReference.Description = referenceIn.Description;
        existingReference.DisplayOrder = referenceIn.DisplayOrder;
        existingReference.IsActive = referenceIn.IsActive;
        existingReference.UpdatedAt = DateTime.UtcNow;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ReferenceExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return Ok(existingReference);
    }

    // DELETE: api/references/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReference(Guid id)
    {
        var reference = await _context.References.FindAsync(id);
        if (reference == null)
        {
            return NotFound(new { message = "Referans bulunamadı." });
        }

        _context.References.Remove(reference);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Referans başarıyla silindi." });
    }

    private bool ReferenceExists(Guid id)
    {
        return _context.References.Any(e => e.Id == id);
    }
}
