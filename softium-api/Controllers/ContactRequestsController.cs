using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactRequestsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContactRequestsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/contactrequests
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContactRequest>>> GetContactRequests()
    {
        return await _context.ContactRequests.OrderByDescending(c => c.CreatedAt).ToListAsync();
    }

    // GET: api/contactrequests/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ContactRequest>> GetContactRequest(Guid id)
    {
        var contactRequest = await _context.ContactRequests.FindAsync(id);

        if (contactRequest == null)
        {
            return NotFound(new { message = "Talep bulunamadı." });
        }

        return contactRequest;
    }

    // POST: api/contactrequests
    // Halka acik websitesindeki iletisim formundan buraya POST yapilacak.
    [HttpPost]
    public async Task<ActionResult<ContactRequest>> CreateContactRequest(ContactRequest contactRequest)
    {
        contactRequest.Id = Guid.NewGuid();
        contactRequest.Status = "Bekliyor"; // Baslangic durumu
        contactRequest.CreatedAt = DateTime.UtcNow;
        contactRequest.UpdatedAt = DateTime.UtcNow;

        _context.ContactRequests.Add(contactRequest);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetContactRequest), new { id = contactRequest.Id }, contactRequest);
    }

    // PUT: api/contactrequests/status/5
    // Admin panelinden durumunu okundu/yanitlandi olarak guncellemek icin
    [HttpPut("status/{id}")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] string status)
    {
        var existingRequest = await _context.ContactRequests.FindAsync(id);
        if (existingRequest == null)
        {
            return NotFound(new { message = "Talep bulunamadı." });
        }

        existingRequest.Status = status;
        existingRequest.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(existingRequest);
    }
    
    // PUT: api/contactrequests/notes/5
    // Admin panelinden nota guncellemek icin
    [HttpPut("notes/{id}")]
    public async Task<IActionResult> UpdateNotes(Guid id, [FromBody] string notes)
    {
        var existingRequest = await _context.ContactRequests.FindAsync(id);
        if (existingRequest == null)
        {
            return NotFound(new { message = "Talep bulunamadı." });
        }

        existingRequest.Notes = notes;
        existingRequest.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(existingRequest);
    }

    // DELETE: api/contactrequests/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContactRequest(Guid id)
    {
        var contactRequest = await _context.ContactRequests.FindAsync(id);
        if (contactRequest == null)
        {
            return NotFound(new { message = "Talep bulunamadı." });
        }

        _context.ContactRequests.Remove(contactRequest);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Talep başarıyla silindi." });
    }
}
