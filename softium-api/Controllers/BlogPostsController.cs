using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BlogPostsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/blogposts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BlogPost>>> GetBlogPosts(bool onlyPublished = false)
    {
        var query = _context.BlogPosts.AsQueryable();

        if (onlyPublished)
        {
            query = query.Where(b => b.IsPublished);
        }

        return await query.OrderByDescending(b => b.CreatedAt).ToListAsync();
    }

    // GET: api/blogposts/5
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<BlogPost>> GetBlogPost(Guid id)
    {
        var blogPost = await _context.BlogPosts.FindAsync(id);

        if (blogPost == null)
        {
            return NotFound(new { message = "Blog yazısı bulunamadı." });
        }

        return blogPost;
    }

    // GET: api/blogposts/byslug/my-first-post
    [HttpGet("byslug/{slug}")]
    public async Task<ActionResult<BlogPost>> GetBlogPostBySlug(string slug)
    {
        var blogPost = await _context.BlogPosts.FirstOrDefaultAsync(b => b.Slug == slug);

        if (blogPost == null)
        {
            return NotFound(new { message = "Bu slug ile blog yazısı bulunamadı." });
        }

        return blogPost;
    }

    // POST: api/blogposts
    [HttpPost]
    public async Task<ActionResult<BlogPost>> CreateBlogPost(BlogPost blogPost)
    {
        blogPost.Id = Guid.NewGuid();
        blogPost.CreatedAt = DateTime.UtcNow;
        blogPost.UpdatedAt = DateTime.UtcNow;

        // Eger slug girilmediyse benzersiz ID atayalım, cakisilmasin.
        if (string.IsNullOrEmpty(blogPost.Slug))
        {
            blogPost.Slug = blogPost.Id.ToString();
        }

        if (blogPost.IsPublished && blogPost.PublishedAt == null)
        {
            blogPost.PublishedAt = DateTime.UtcNow;
        }

        if (blogPost.IsFeatured)
        {
            // Eger bu yeni blog one cikarilacaksan, eski one cikanlarin isaretini ucur
            var currentFeatured = await _context.BlogPosts.Where(b => b.IsFeatured).ToListAsync();
            foreach (var cp in currentFeatured)
            {
                cp.IsFeatured = false;
            }
        }

        _context.BlogPosts.Add(blogPost);
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            if (BlogPostSlugExists(blogPost.Slug))
            {
                return Conflict(new { message = "Bu URL (Slug) ismi hali hazırda kullanımda. Lütfen farklı bir isim deneyin." });
            }
            throw;
        }

        return CreatedAtAction(nameof(GetBlogPost), new { id = blogPost.Id }, blogPost);
    }

    // PUT: api/blogposts/5
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateBlogPost(Guid id, BlogPost blogPostIn)
    {
        if (id != blogPostIn.Id)
        {
            return BadRequest(new { message = "ID eşleşmiyor." });
        }

        var existingPost = await _context.BlogPosts.FindAsync(id);
        if (existingPost == null)
        {
            return NotFound(new { message = "Blog yazısı bulunamadı." });
        }

        // Check for slug uniqueness
        if (existingPost.Slug != blogPostIn.Slug && BlogPostSlugExists(blogPostIn.Slug))
        {
            return Conflict(new { message = "Bu URL (Slug) ismi hali hazırda kullanımda. Lütfen farklı bir isim deneyin." });
        }

        existingPost.Slug = blogPostIn.Slug;
        existingPost.TitleTr = blogPostIn.TitleTr;
        existingPost.TitleEn = blogPostIn.TitleEn;
        existingPost.TitleDe = blogPostIn.TitleDe;
        existingPost.ContentTr = blogPostIn.ContentTr;
        existingPost.ContentEn = blogPostIn.ContentEn;
        existingPost.ContentDe = blogPostIn.ContentDe;
        existingPost.ExcerptTr = blogPostIn.ExcerptTr;
        existingPost.ExcerptEn = blogPostIn.ExcerptEn;
        existingPost.ExcerptDe = blogPostIn.ExcerptDe;
        existingPost.CoverImage = blogPostIn.CoverImage;
        existingPost.ReadTime = blogPostIn.ReadTime;
        existingPost.AuthorName = blogPostIn.AuthorName;
        existingPost.AuthorRole = blogPostIn.AuthorRole;
        existingPost.Category = blogPostIn.Category;
        
        if (!existingPost.IsPublished && blogPostIn.IsPublished)
        {
            existingPost.PublishedAt = existingPost.PublishedAt ?? DateTime.UtcNow;
        }
        existingPost.IsPublished = blogPostIn.IsPublished;

        if (blogPostIn.IsFeatured && !existingPost.IsFeatured)
        {
            // Yeni one cikan bu olduysa, digerlerini false yapalim
            var currentFeatured = await _context.BlogPosts.Where(b => b.IsFeatured && b.Id != id).ToListAsync();
            foreach (var cp in currentFeatured)
            {
                cp.IsFeatured = false;
            }
        }
        existingPost.IsFeatured = blogPostIn.IsFeatured;
        
        existingPost.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(existingPost);
    }

    // DELETE: api/blogposts/5
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteBlogPost(Guid id)
    {
        var blogPost = await _context.BlogPosts.FindAsync(id);
        if (blogPost == null)
        {
            return NotFound(new { message = "Blog yazısı bulunamadı." });
        }

        _context.BlogPosts.Remove(blogPost);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Blog başarıyla silindi." });
    }

    private bool BlogPostExists(Guid id)
    {
        return _context.BlogPosts.Any(e => e.Id == id);
    }

    private bool BlogPostSlugExists(string slug)
    {
        return _context.BlogPosts.Any(e => e.Slug == slug);
    }
}
