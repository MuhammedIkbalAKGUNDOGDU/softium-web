using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TestimonialsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Testimonial>>> GetAll()
    {
        return await _context.Testimonials
            .OrderBy(t => t.SortOrder)
            .ThenByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    [HttpGet("active")]
    public async Task<ActionResult<IEnumerable<Testimonial>>> GetActive()
    {
        return await _context.Testimonials
            .Where(t => t.IsActive)
            .OrderBy(t => t.SortOrder)
            .ThenByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Testimonial>> GetById(Guid id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null) return NotFound();
        return testimonial;
    }

    [HttpPost]
    public async Task<ActionResult<Testimonial>> Create(Testimonial testimonial)
    {
        testimonial.Id = Guid.NewGuid();
        testimonial.CreatedAt = DateTime.UtcNow;
        _context.Testimonials.Add(testimonial);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = testimonial.Id }, testimonial);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Testimonial testimonial)
    {
        if (id != testimonial.Id) return BadRequest();
        _context.Entry(testimonial).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Testimonials.AnyAsync(e => e.Id == id))
                return NotFound();
            throw;
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null) return NotFound();
        
        _context.Testimonials.Remove(testimonial);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
