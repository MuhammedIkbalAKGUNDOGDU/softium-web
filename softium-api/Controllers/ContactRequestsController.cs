using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;
using Softium.Api.Services;
using Microsoft.Extensions.Options;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactRequestsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IEmailService _emailService;
    private readonly EmailSettings _emailSettings;

    public ContactRequestsController(ApplicationDbContext context, IEmailService emailService, IOptions<EmailSettings> emailSettings)
    {
        _context = context;
        _emailService = emailService;
        _emailSettings = emailSettings.Value;
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

        // Send Email Notifications
        try
        {
            // 1. Send notification to admin (muhammik1234@gmail.com)
            string adminSubject = "Yeni İletişim İsteği | Softium Technologies";
            string adminBody = $@"
                <div style='font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>
                    <div style='text-align: center; margin-bottom: 20px;'>
                        <h2 style='color: #135bec; margin: 0;'>SOFTIUM TECHNOLOGIES</h2>
                    </div>
                    <h3 style='border-bottom: 2px solid #f4f4f4; padding-bottom: 10px;'>Yeni İletişim İsteği Bildirimi</h3>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <tr><td style='padding: 10px 0; font-weight: bold; width: 30%;'>İsim:</td><td>{contactRequest.Name}</td></tr>
                        <tr><td style='padding: 10px 0; font-weight: bold;'>E-posta:</td><td><a href='mailto:{contactRequest.Email}'>{contactRequest.Email}</a></td></tr>
                        <tr><td style='padding: 10px 0; font-weight: bold;'>Telefon:</td><td>{(!string.IsNullOrEmpty(contactRequest.Phone) ? contactRequest.Phone : "Belirtilmedi")}</td></tr>
                        <tr><td style='padding: 10px 0; font-weight: bold;'>Şirket:</td><td>{(!string.IsNullOrEmpty(contactRequest.Company) ? contactRequest.Company : "Belirtilmedi")}</td></tr>
                    </table>
                    <div style='margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;'>
                        <p style='margin-top: 0; font-weight: bold;'>Mesaj:</p>
                        <p style='white-space: pre-wrap;'>{contactRequest.Message}</p>
                    </div>
                    <hr style='border: none; border-top: 1px solid #eee; margin-top: 30px;' />
                    <p style='font-size: 12px; color: #999; text-align: center;'>Bu e-posta Softium Web API tarafından otomatik olarak oluşturulmuştur.</p>
                </div>
            ";
            await _emailService.SendEmailAsync(_emailSettings.NotificationEmail, adminSubject, adminBody);

            // 2. Send confirmation to sender
            string senderSubject = "İletişim Talebinizi Aldık | Softium Technologies";
            string senderBody = $@"
                <div style='font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;'>
                    <div style='text-align: center; margin-bottom: 20px;'>
                        <h2 style='color: #135bec; margin: 0;'>SOFTIUM TECHNOLOGIES</h2>
                    </div>
                    <p>Sayın <strong>{contactRequest.Name}</strong>,</p>
                    <p>Bizimle iletişime geçtiğiniz için teşekkür ederiz. İletişim talebinizi başarıyla aldık.</p>
                    <p>Ekibimiz mesajınızı inceledikten sonra 24-48 saat içerisinde sizinle e-posta veya telefon yoluyla iletişime geçecektir.</p>
                    <p>Bu süreçte hizmetlerimizi incelemek isterseniz web sitemizi ziyaret edebilirsiniz.</p>
                    <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;'>
                        <p style='margin: 0;'>Saygılarımızla,</p>
                        <p style='margin: 5px 0 0 0; font-weight: bold; color: #135bec;'>Softium Technologies Ekibi</p>
                    </div>
                </div>
            ";
            await _emailService.SendEmailAsync(contactRequest.Email, senderSubject, senderBody);
        }
        catch (Exception ex)
        {
            // We don't want to fail the request if email sending fails, 
            // but we might want to log it.
            Console.WriteLine($"Email sending failed: {ex.Message}");
        }

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
