using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var admin = await _context.AdminUsers
            .FirstOrDefaultAsync(u => u.Email == request.Username);

        if (admin == null || !BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash))
        {
            return Unauthorized(new { message = "Geçersiz kullanıcı adı veya şifre" });
        }

        // Log the successful login
        var log = new AdminLoginLog
        {
            Username = admin.Email,
            IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown",
            UserAgent = Request.Headers["User-Agent"].ToString(),
            LoginDate = DateTime.UtcNow,
            IsSuccess = true
        };
        _context.AdminLoginLogs.Add(log);
        await _context.SaveChangesAsync();

        // Generate JWT Token
        var tokenHandler = new JwtSecurityTokenHandler();
        var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") ?? "Softium_Super_Secret_Key_2026_Secure_Vault";
        var key = Encoding.ASCII.GetBytes(jwtSecret);
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] 
            {
                new Claim(ClaimTypes.Name, admin.Name),
                new Claim(ClaimTypes.Email, admin.Email)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

        return Ok(new { 
            token = tokenString, 
            username = admin.Email, 
            name = admin.Name 
        });
    }
}

public class LoginRequest
{
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
