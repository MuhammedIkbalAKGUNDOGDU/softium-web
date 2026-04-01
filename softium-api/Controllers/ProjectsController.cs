using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProjectsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/projects
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
    {
        return await _context.Projects
            .Include(p => p.Features)
            .OrderBy(p => p.SortOrder)
            .ToListAsync();
    }

    // GET: api/projects/slug/nexus-guard
    [HttpGet("slug/{slug}")]
    public async Task<ActionResult<Project>> GetProjectBySlug(string slug)
    {
        var project = await _context.Projects
            .Include(p => p.Features)
            .FirstOrDefaultAsync(p => p.Slug == slug);

        if (project == null)
        {
            return NotFound(new { message = "Proje bulunamadı." });
        }

        return project;
    }

    // GET: api/projects/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Project>> GetProject(Guid id)
    {
        var project = await _context.Projects
            .Include(p => p.Features)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
        {
            return NotFound(new { message = "Proje bulunamadı." });
        }

        return project;
    }

    // POST: api/projects
    [HttpPost]
    public async Task<ActionResult<Project>> CreateProject(Project project)
    {
        project.Id = Guid.NewGuid();
        project.CreatedAt = DateTime.UtcNow;
        project.UpdatedAt = DateTime.UtcNow;

        // Ensure features have correct IDs if provided
        foreach (var feature in project.Features)
        {
            feature.Id = Guid.NewGuid();
            feature.ProjectId = project.Id;
        }

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
    }

    // PUT: api/projects/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(Guid id, Project projectIn)
    {
        if (id != projectIn.Id)
        {
            return BadRequest(new { message = "ID eşleşmiyor." });
        }

        var existingProject = await _context.Projects
            .Include(p => p.Features)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (existingProject == null)
        {
            return NotFound(new { message = "Proje bulunamadı." });
        }

        // Update basic properties
        _context.Entry(existingProject).CurrentValues.SetValues(projectIn);
        existingProject.UpdatedAt = DateTime.UtcNow;

        // Sync features
        // 1. Remove features that are not in the input
        foreach (var existingFeature in existingProject.Features.ToList())
        {
            if (!projectIn.Features.Any(f => f.Id == existingFeature.Id))
            {
                _context.ProjectFeatures.Remove(existingFeature);
            }
        }

        // 2. Add or Update features
        foreach (var inputFeature in projectIn.Features)
        {
            var existingFeature = existingProject.Features.FirstOrDefault(f => f.Id == inputFeature.Id);
            if (existingFeature != null)
            {
                _context.Entry(existingFeature).CurrentValues.SetValues(inputFeature);
            }
            else
            {
                inputFeature.Id = Guid.NewGuid();
                inputFeature.ProjectId = existingProject.Id;
                existingProject.Features.Add(inputFeature);
            }
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProjectExists(id)) return NotFound();
            else throw;
        }

        return Ok(existingProject);
    }

    // DELETE: api/projects/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound(new { message = "Proje bulunamadı." });
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Proje başarıyla silindi." });
    }

    private bool ProjectExists(Guid id)
    {
        return _context.Projects.Any(e => e.Id == id);
    }
}
