using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminLogsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminLogsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AdminLoginLog>>> GetLogs()
    {
        return await _context.AdminLoginLogs
            .OrderByDescending(l => l.LoginDate)
            .Take(100) // Last 100 logins
            .ToListAsync();
    }
}
