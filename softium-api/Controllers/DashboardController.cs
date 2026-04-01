using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var referencesCount = await _context.References.CountAsync();
        var publishedBlogsCount = await _context.BlogPosts.CountAsync(b => b.IsPublished);
        var unreadMessagesCount = await _context.ContactRequests.CountAsync(c => c.Status == "UNREAD");

        return Ok(new
        {
            TotalReferences = referencesCount,
            PublishedBlogs = publishedBlogsCount,
            UnreadMessages = unreadMessagesCount
        });
    }
}
