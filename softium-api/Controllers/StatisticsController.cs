using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StatisticsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Statistic>>> GetAll()
    {
        return await _context.Statistics
            .OrderBy(s => s.SortOrder)
            .ToListAsync();
    }

    [HttpGet("active")]
    public async Task<ActionResult<IEnumerable<Statistic>>> GetActive()
    {
        return await _context.Statistics
            .Where(s => s.IsActive)
            .OrderBy(s => s.SortOrder)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Statistic>> GetById(Guid id)
    {
        var stat = await _context.Statistics.FindAsync(id);
        if (stat == null) return NotFound();
        return stat;
    }

    [HttpPost]
    public async Task<ActionResult<Statistic>> Create(Statistic statistic)
    {
        statistic.Id = Guid.NewGuid();
        _context.Statistics.Add(statistic);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = statistic.Id }, statistic);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Statistic statistic)
    {
        if (id != statistic.Id) return BadRequest();
        _context.Entry(statistic).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var stat = await _context.Statistics.FindAsync(id);
        if (stat == null) return NotFound();
        _context.Statistics.Remove(stat);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
