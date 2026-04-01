using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using Softium.Api.Data;
using Softium.Api.Models;

namespace Softium.Api.Data;

public static class DbInitializer
{
    public static void Seed(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        // Admin User Seed
        if (!context.AdminUsers.Any())
        {
            var admin = new AdminUser
            {
                Id = Guid.NewGuid(),
                Email = "adminikbal",
                Name = "İkbal",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("ikbal1234"),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            context.AdminUsers.Add(admin);
            context.SaveChanges();
        }

        // Projects Seed
        if (!context.Projects.Any())
        {
            var p1Id = Guid.NewGuid();
            var p1 = new Project
            {
                Id = p1Id,
                Slug = "softium-neural-mesh",
                TitleTr = "Softium Neural Mesh",
                TitleEn = "Softium Neural Mesh",
                TitleDe = "Softium Neural Mesh",
                OverlineTr = "Yapay Zeka Altyapısı",
                OverlineEn = "AI Infrastructure",
                OverlineDe = "KI-Infrastruktur",
                ShortDescriptionTr = "Gelecek nesil otonom öğrenme ağları için ölçeklenebilir bir mesh mimarisi.",
                ShortDescriptionEn = "A scalable mesh architecture for next-generation autonomous learning networks.",
                ShortDescriptionDe = "Eine skalierbare Mesh-Architektur für autonome Lernnetzwerke der nächsten Generation.",
                DetailedContentTr = "<h2>Gelecek Nesil Yapay Zeka Altyapısı</h2><p>Neural Mesh, karmaşık veri setlerini gerçek zamanlı olarak işlemek ve otonom sistemler arasında kesintisiz iletişim sağlamak için tasarlanmış hibrit bir yapıdır.</p><p><strong>Neden Neural Mesh?</strong></p><ul><li><strong>Hibrit Mimari:</strong> Hem bulut hem de cihaz (edge) üzerinde çalışabilen esnek yapı.</li><li><strong>Akıllı Optimizasyon:</strong> İş yüklerini gerçek zamanlı olarak dağıtan otonom algoritma.</li><li><strong>Ultra Güvenli:</strong> Kuantum sonrası şifreleme yöntemleriyle korunan veri akışı.</li></ul><p>Softium Neural Mesh ile işletmenizi yapay zeka çağının ötesine taşıyın.</p>",
                DetailedContentEn = "<h2>Next Generation AI Infrastructure</h2><p>Neural Mesh is a hybrid framework designed for processing complex datasets and ensuring seamless communication between autonomous systems.</p>",
                DetailedContentDe = "<h2>KI-Infrastruktur der nächsten Generation</h2><p>Neural Mesh ist ein hybrides Framework für die Verarbeitung komplexer Datensätze.</p>",
                MainImage = "/uploads/dashboard-mockup.png",
                Icon = "neurology",
                IsDarkTheme = true,
                IsPublished = true,
                SortOrder = 1,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Features = new List<ProjectFeature>
                {
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p1Id, TitleTr = "Gerçek Zamanlı Hibrit Mesh", TitleEn = "Real-time Hybrid Mesh", Icon = "hub", SortOrder = 1 },
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p1Id, TitleTr = "Post-Kuantum Şifreleme", TitleEn = "Post-Quantum Cryptography", Icon = "security", SortOrder = 2 },
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p1Id, TitleTr = "Otonom Kaynak Yönetimi", TitleEn = "Autonomous Resource Management", Icon = "auto_awesome", SortOrder = 3 },
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p1Id, TitleTr = "Düşük Gecikmeli Edge Kontrol", TitleEn = "Low Latency Edge Control", Icon = "bolt", SortOrder = 4 }
                }
            };
            context.Projects.Add(p1);

            var p2Id = Guid.NewGuid();
            var p2 = new Project
            {
                Id = p2Id,
                Slug = "cloud-quant-os",
                TitleTr = "Cloud Quant OS",
                TitleEn = "Cloud Quant OS",
                TitleDe = "Cloud Quant OS",
                OverlineTr = "Bulut Yönetim Sistemi",
                OverlineEn = "Cloud OS",
                OverlineDe = "Cloud-Betriebssystem",
                ShortDescriptionTr = "Kuantum prensipleriyle optimize edilmiş, dağıtık kaynak yönetim platformu.",
                ShortDescriptionEn = "Distributed resource management platform optimized with quantum principles.",
                ShortDescriptionDe = "Verteilte Ressourcenmanagement-Plattform, optimiert mit Quantenprinzipien.",
                DetailedContentTr = "<h2>Bulut Verimliliğinde Yeni Standart</h2><p>Quant OS, kurumsal bulut altyapılarını akıllı algoritmalarla yöneterek kaynak israfını önler ve maliyetleri %40 oranında düşürür.</p><p><strong>Sistem Özellikleri:</strong></p><ul><li>Anlık ölçeklenebilir altyapı</li><li>Konteyner tabanlı mikroservis yönetimi</li><li>Otomatik yedekleme ve felaket kurtarma</li></ul>",
                DetailedContentEn = "<h2>The New Standard in Cloud Efficiency</h2><p>Quant OS manages enterprise cloud infrastructures with smart algorithms, reducing costs by 40%.</p>",
                DetailedContentDe = "<h2>Neuer Standard für Cloud-Effizienz</h2><p>Quant OS verwaltet Unternehmens-Cloud-Infrastrukturen mit intelligenten Algorithmen.</p>",
                MainImage = "/uploads/hero-sphere.png",
                Icon = "cloud_sync",
                IsDarkTheme = false,
                IsPublished = true,
                SortOrder = 2,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Features = new List<ProjectFeature>
                {
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p2Id, TitleTr = "Akıllı Kaynak Dağıtımı", TitleEn = "Smart Resource Allocation", Icon = "layers", SortOrder = 1 },
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p2Id, TitleTr = "Multi-Cloud Entegrasyonu", TitleEn = "Multi-Cloud Integration", Icon = "public", SortOrder = 2 }
                }
            };
            context.Projects.Add(p2);

            var p3Id = Guid.NewGuid();
            var p3 = new Project
            {
                Id = p3Id,
                Slug = "cyber-vault-enterprise",
                TitleTr = "Cyber Vault Enterprise",
                TitleEn = "Cyber Vault Enterprise",
                TitleDe = "Cyber Vault Enterprise",
                OverlineTr = "Kurumsal Güvenlik",
                OverlineEn = "Cyber Security",
                OverlineDe = "Cybersicherheit",
                ShortDescriptionTr = "Sıfır güven mimarili, yapay zeka destekli siber savunma kalkanı.",
                ShortDescriptionEn = "AI-powered cyber defense shield with Zero Trust architecture.",
                ShortDescriptionDe = "KI-gestützte Cyber-Abwehr mit Zero-Trust-Architektur.",
                DetailedContentTr = "<h2>Verileriniz İçin Dijital Kale</h2><p>Cyber Vault, sadece dış tehditleri değil, iç ağdaki şüpheli hareketleri de anlık olarak tespit eder ve engeller.</p><h3>Öne Çıkan Güvenlik Katmanları:</h3><ol><li>Çok faktörlü biyometrik doğrulama</li><li>Blokzincir tabanlı işlem günlüğü</li><li>Tehdit simülasyonu ve stres testi</li></ol>",
                DetailedContentEn = "<h2>Digital Fortress for Your Data</h2><p>Cyber Vault detects and blocks suspicious movements not only from external threats but also within the internal network.</p>",
                MainImage = "/uploads/mobile-mockup.png",
                Icon = "shield_lock",
                IsDarkTheme = true,
                IsPublished = true,
                SortOrder = 3,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Features = new List<ProjectFeature>
                {
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p3Id, TitleTr = "Tehdit Avcılığı", TitleEn = "Threat Hunting", Icon = "search", SortOrder = 1 },
                    new ProjectFeature { Id = Guid.NewGuid(), ProjectId = p3Id, TitleTr = "Blockchain Kayıt", TitleEn = "Blockchain Logging", Icon = "link", SortOrder = 2 }
                }
            };
            context.Projects.Add(p3);
            context.SaveChanges();
        }

        // Blog Seed
        if (!context.BlogPosts.Any())
        {
            context.BlogPosts.Add(new BlogPost
            {
                Id = Guid.NewGuid(),
                Slug = "yapay-zeka-ve-gelecegin-endustrisi",
                TitleTr = "Yapay Zeka ve Geleceğin Endüstrisi",
                TitleEn = "AI and the Industry of the Future",
                ContentTr = "<h2>Yeni Endüstri Devrimi</h2><p>Yapay zeka sadece bir trend değil, temel bir değişimdir...</p>",
                ContentEn = "<p>AI is a fundamental shift...</p>",
                ExcerptTr = "Yapay zekanın endüstriyel devrimdeki rolünü ve geleceği nasıl şekillendirdiğini inceliyoruz.",
                CoverImage = "/uploads/about-office.jpg",
                AuthorName = "İkbal Bey",
                Category = "Teknoloji",
                ReadTime = 8,
                IsPublished = true,
                IsFeatured = true,
                CreatedAt = DateTime.UtcNow,
                PublishedAt = DateTime.UtcNow
            });
            context.SaveChanges();
        }

        // References Seed
        if (!context.References.Any())
        {
            context.References.AddRange(new List<Reference>
            {
                new Reference { Id = Guid.NewGuid(), Name = "TeknoHolding", Industry = "Finans", Icon = "account_balance", WebsiteUrl = "https://teknoholding.com.tr", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Reference { Id = Guid.NewGuid(), Name = "Global Logistic", Industry = "Lojistik", Icon = "local_shipping", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Reference { Id = Guid.NewGuid(), Name = "Aero Dynamics", Industry = "Havacılık", Icon = "flight", IsActive = true, CreatedAt = DateTime.UtcNow }
            });
            context.SaveChanges();
        }

        // Testimonials Seed
        if (!context.Testimonials.Any())
        {
            context.Testimonials.AddRange(new List<Testimonial>
            {
                new Testimonial { Id = Guid.NewGuid(), Name = "Ahmet Yılmaz", Role = "CTO", Company = "TeknoHolding", QuoteTr = "Softium ile çalışmak vizyonumuzu genişletti.", Color = "#135bec", IsActive = true, SortOrder = 1 },
                new Testimonial { Id = Guid.NewGuid(), Name = "Selin Demir", Role = "Operasyon Müdürü", Company = "Global Logistic", QuoteTr = "Muazzam bir hız kazandık.", Color = "#7c3aed", IsActive = true, SortOrder = 2 }
            });
            context.SaveChanges();
        }

        // Stats Seed
        if (!context.Statistics.Any())
        {
            context.Statistics.AddRange(new List<Statistic>
            {
                new Statistic { Id = Guid.NewGuid(), Key = "grid_projects", Value = "150+", LabelTr = "Tamamlanan Proje", Icon = "task_alt", IsActive = true, SortOrder = 1 },
                new Statistic { Id = Guid.NewGuid(), Key = "grid_clients", Value = "40+", LabelTr = "Mutlu Müşteri", Icon = "sentiment_satisfied", IsActive = true, SortOrder = 2 },
                new Statistic { Id = Guid.NewGuid(), Key = "grid_engineers", Value = "25+", LabelTr = "Uzman Mühendis", Icon = "engineering", IsActive = true, SortOrder = 3 },
                new Statistic { Id = Guid.NewGuid(), Key = "grid_uptime", Value = "%99.9", LabelTr = "Çalışma Süresi", Icon = "timer", IsActive = true, SortOrder = 4 }
            });
            context.SaveChanges();
        }
    }
}

