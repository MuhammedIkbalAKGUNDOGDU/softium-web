using Microsoft.EntityFrameworkCore;
using Softium.Api.Models;

namespace Softium.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<AdminUser> AdminUsers { get; set; }
    public DbSet<Reference> References { get; set; }
    public DbSet<BlogPost> BlogPosts { get; set; }
    public DbSet<ContactRequest> ContactRequests { get; set; }
    public DbSet<SiteSetting> SiteSettings { get; set; }
    public DbSet<NewsletterSubscriber> NewsletterSubscribers { get; set; }
    public DbSet<Testimonial> Testimonials { get; set; }
    public DbSet<Statistic> Statistics { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<ProjectFeature> ProjectFeatures { get; set; }
    public DbSet<AdminLoginLog> AdminLoginLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AdminUser>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<BlogPost>().HasIndex(b => b.Slug).IsUnique();
        modelBuilder.Entity<SiteSetting>().HasIndex(s => s.SettingKey).IsUnique();
        modelBuilder.Entity<NewsletterSubscriber>().HasIndex(n => n.Email).IsUnique();
        modelBuilder.Entity<Project>().HasIndex(p => p.Slug).IsUnique();
    }
}
