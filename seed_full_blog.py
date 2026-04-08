import urllib.request
import urllib.parse
import json
import os
import subprocess

API_URL = "https://softiumtechnologies.net"
UPLOADS_URL = f"{API_URL}/api/uploads"
BLOG_POSTS_URL = f"{API_URL}/api/blogposts"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Image Paths
IMAGE_PATHS = {
    3: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_ux_psychology_design_1775649235846.png",
    4: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_zero_trust_security_concept_1775649263504.png",
    5: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_business_automation_erp_crm_1775649293802.png",
    6: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_microservices_architecture_concept_1775649323443.png",
    7: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_mobile_app_development_comparison_1775649353562.png",
    8: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_ai_integration_business_concept_1775649385526.png",
    9: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_mvp_strategy_startup_concept_1775649419320.png",
    10: "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_digital_transformation_myths_concept_1775649454110.png"
}

def upload_image(image_path):
    cmd = ["curl", "-s", "-X", "POST", "-H", f"User-Agent: {USER_AGENT}", "-F", f"file=@{image_path}", UPLOADS_URL]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        try:
            return json.loads(result.stdout).get('url')
        except:
            print(f"Upload error for {image_path}:", result.stdout)
            return None
    return None

def create_post(data):
    req = urllib.request.Request(BLOG_POSTS_URL, data=json.dumps(data).encode('utf-8'), method='POST')
    req.add_header('Content-Type', 'application/json')
    req.add_header('User-Agent', USER_AGENT)
    try:
        with urllib.request.urlopen(req) as f:
            print(f"Created: {data['Slug']}")
            return f.read().decode('utf-8')
    except Exception as e:
        print(f"Error creating {data['Slug']}: {e}")
        if hasattr(e, 'read'): print(e.read().decode('utf-8'))
        return None

# Content for all remaining posts
posts = [
    {
        "Slug": "ux-psikolojisi-donusum-sanati",
        "IdNum": 3,
        "TitleTr": "Kullanıcı Deneyimi (UX) Psikolojisi: Ziyaretçiyi Müşteriye Dönüştürme Sanatı",
        "TitleEn": "UX Psychology: The Art of Converting Visitors into Customers",
        "TitleDe": "UX-Psychologie: Die Kunst, Besucher in Kunden zu verwandeln",
        "ExcerptTr": "Bir tasarım sadece güzel görünmekle kalmamalı, kullanıcının kararlarını da etkilemelidir. UX psikolojisinin gücünü keşfedin.",
        "ExcerptEn": "A design should not only look good but also influence user decisions. Discover the power of UX psychology.",
        "ExcerptDe": "Ein Design sollte nicht nur gut aussehen, sondern auch die Entscheidungen der Nutzer beeinflussen. Entdecken Sie die Kraft der UX-Psychologie.",
        "ContentTr": "# Kullanıcı Deneyimi (UX) Psikolojisi\\n\\nUX psikolojisi, kullanıcıların bir dijital ürünle etkileşime girerken nasıl düşündüğünü ve hissettiğini anlamayı hedefler. Softium olarak, tasarım süreçlerimizde bilişsel yükü azaltan, Fitts yasası gibi bilimsel prensipleri uygulayan arayüzler geliştiriyoruz. İyi bir UX, kullanıcının kafasını karıştırmadan onu hedefe (satın alma, kayıt vb.) ulaştırır.",
        "ContentEn": "# UX Psychology\\n\\nUX psychology aims to understand how users think and feel while interacting with a digital product. At Softium, we develop interfaces that apply scientific principles such as Fitts' Law, reducing cognitive load. A good UX leads the user to the goal without confusing them.",
        "ContentDe": "# UX-Psychologie\\n\\nUX-Psychologie zielt darauf ab zu verstehen, wie Nutzer bei der Interaktion mit einem digitalen Produkt denken und fühlen. Bei Softium entwickeln wir Oberflächen, die wissenschaftliche Prinzipien wie das Fitts'sche Gesetz anwenden und die kognitive Belastung reduzieren.",
        "Category": "Design & UX", "ReadTime": 10
    },
    {
        "Slug": "yazilim-guvenliginde-zero-trust",
        "IdNum": 4,
        "TitleTr": "Dijital Kale: Yazılım Güvenliğinde Sıfır Güven (Zero Trust) Modeli",
        "TitleEn": "Digital Fortress: The Zero Trust Model in Software Security",
        "TitleDe": "Digitale Festung: Das Zero Trust-Modell in der Softwaresicherheit",
        "ExcerptTr": "Güvenlik artık bir tercih değil, zorunluluktur. Sıfır Güven (Zero Trust) mimarisi ile projelerinizi nasıl koruyoruz?",
        "ExcerptEn": "Security is no longer an option, but a necessity. How do we protect your projects with Zero Trust architecture?",
        "ExcerptDe": "Sicherheit ist keine Option mehr, sondern eine Notwendigkeit. Wie schützen wir Ihre Projekte mit der Zero Trust-Architektur?",
        "Category": "Security", "ReadTime": 10,
        "ContentTr": "# Sıfır Güven Modeli\\n\\nModern dünyada 'içerisi güvenli' varsayımı artık geçerli değil. Zero Trust modelinde her istek, her kullanıcı ve her cihaz sürekli olarak doğrulanır. Softium projelerinde verilerinizi 10 katmanlı koruma altında tutuyoruz.",
        "ContentEn": "# Zero Trust Model\\n\\nIn the modern world, the 'inside is safe' assumption is no longer valid. In the Zero Trust model, every request, every user, and every device is continuously verified.",
        "ContentDe": "# Zero Trust-Modell\\n\\nIn der modernen Welt gilt die Annahme 'innen ist sicher' nicht mehr. Im Zero Trust-Modell wird jede Anfrage, jeder Nutzer und jedes Gerät kontinuierlich verifiziert."
    },
    {
        "Slug": "ozel-erp-crm-otomasyon-avantajlari",
        "IdNum": 5,
        "TitleTr": "İşletmenizi Otomatize Edin: Özel ERP ve CRM Geliştirmenin Getirileri",
        "TitleEn": "Automate Your Business: The Benefits of Developing Custom ERP and CRM",
        "TitleDe": "Automatisieren Sie Ihr Geschäft: Die Vorteile der Entwicklung individueller ERP- und CRM-Systeme",
        "ExcerptTr": "Manuel iş süreçlerine veda edin. İşletmenize özel geliştirilen otomasyon sistemleri ile verimliliği nasıl artırırsınız?",
        "ExcerptEn": "Say goodbye to manual business processes. How to increase efficiency with custom automation systems?",
        "ExcerptDe": "Verabschieden Sie sich von manuellen Geschäftsprozessen. Wie Sie die Effizienz mit individuellen Automatisierungssystemen steigern können.",
        "Category": "Automation", "ReadTime": 10,
        "ContentTr": "# Özel ERP ve CRM\\n\\nHer şirketin iş akışı kendine hastır. Hazır paketlere işinizi uydurmak yerine, yazılımı işinize uyduruyoruz. Softium otomasyon çözümleri maliyetlerinizi düşürürken hızı artırır.",
        "ContentEn": "# Custom ERP & CRM\\n\\nEvery company's workflow is unique. Instead of fitting your business into ready-made packages, we fit the software into your business.",
        "ContentDe": "# Individuelles ERP & CRM\\n\\nDer Workflow jedes Unternehmens ist einzigartig. Anstatt Ihr Geschäft in Standardpakete zu zwängen, passen wir die Software an Ihr Geschäft an."
    },
    {
        "Slug": "mikroservis-mimarisi-ve-olceklenebilirlik",
        "IdNum": 6,
        "TitleTr": "Geleceğe Hazır Olmak: Mikroservis Mimarisi ile Kesintisiz Büyüme",
        "TitleEn": "Being Future-Ready: Seamless Growth with Microservices Architecture",
        "TitleDe": "Zukunftssicher sein: Nahtloses Wachstum mit Microservices-Architektur",
        "ExcerptTr": "Tek parça yazılımlardan kurtulun. Mikroservisler ile projeleriniz trafik artışlarına nasıl meydan okur?",
        "ExcerptEn": "Break free from monolithic software. How do your projects defy traffic spikes with microservices?",
        "ExcerptDe": "Befreien Sie sich von monolithischer Software. Wie Ihre Projekte mit Microservices Verkehrsspitzen trotzen.",
        "Category": "Architecture", "ReadTime": 10,
        "ContentTr": "# Mikroservis Mimarisi\\n\\nModüler yapı sayesinde sistemin bir parçası güncellenirken diğerleri çalışmaya devam eder. Hızlı ölçeklenebilirlik için Softium mühendisliği yanınızda.",
        "ContentEn": "# Microservices Architecture\\n\\nThanks to the modular structure, one part of the system is updated while others continue to work.",
        "ContentDe": "# Microservices-Architektur\\n\\nDank der modularen Struktur wird ein Teil des Systems aktualisiert, während andere weiterarbeiten."
    },
    {
        "Slug": "mobil-uygulama-native-vs-cross-platform",
        "IdNum": 7,
        "TitleTr": "Mobil Uygulama Dünyasında Yer Almak: Native mi, Cross-Platform mu?",
        "TitleEn": "Taking Your Place in the Mobile App World: Native or Cross-Platform?",
        "TitleDe": "Ihren Platz in der Welt der mobilen Apps einnehmen: Native oder Cross-Platform?",
        "ExcerptTr": "iOS ve Android dünyasına giriş yaparken doğru teknolojiyi seçmek bütçenizi ve geleceğinizi etkiler.",
        "ExcerptEn": "Choosing the right technology when entering the world of iOS and Android affects your budget and future.",
        "ExcerptDe": "Die Wahl der richtigen Technologie beim Eintritt in die Welt von iOS und Android beeinflusst Ihr Budget und Ihre Zukunft.",
        "Category": "Mobile", "ReadTime": 10,
        "ContentTr": "# Mobil Geliştirme Stratejileri\\n\\nFlutter ve React Native ile maliyet odaklı ilerleyebilir veya en yüksek performans için Native çözümlerimizle fark yaratabilirsiniz.",
        "ContentEn": "# Mobile Development Strategies\\n\\nYou can proceed cost-effectively with Flutter and React Native or make a difference with our Native solutions.",
        "ContentDe": "# Strategien für die mobile Entwicklung\\n\\nMit Flutter und React Native können Sie kosteneffizient vorgehen oder mit unseren nativen Lösungen den Unterschied machen."
    },
    {
        "Slug": "yapay-zeka-ai-entegrasyon-stratejileri",
        "IdNum": 8,
        "TitleTr": "Yapay Zekayı Ürününüzün Kalbine Yerleştirin: Softium ile AI Entegrasyonu",
        "TitleEn": "Place AI at the Heart of Your Product: AI Integration with Softium",
        "TitleDe": "Platzieren Sie KI im Herzen Ihres Produkts: KI-Integration mit Softium",
        "ExcerptTr": "Yapay zeka sadece bir trend değil, verimlilik aracıdır. Ürünlerinize zekayı nasıl katıyoruz?",
        "ExcerptEn": "AI is not just a trend, but a productivity tool. How do we add intelligence to your products?",
        "ExcerptDe": "KI ist nicht nur ein Trend, sondern ein Produktivitätswerkzeug. Wie wir Ihren Produkten Intelligenz verleihen.",
        "Category": "AI & Tech", "ReadTime": 10,
        "ContentTr": "# Yapay Zeka Entegrasyonu\\n\\nVeri analizi, öngörüsel modeller ve akıllı asistanlar ile projenizi bir sonraki seviyeye taşıyoruz.",
        "ContentEn": "# AI Integration\\n\\nWe take your project to the next level with data analysis, predictive models, and smart assistants.",
        "ContentDe": "# KI-Integration\\n\\nMit Datenanalysen, prädiktiven Modellen und intelligenten Assistenten bringen wir Ihr Projekt auf die nächste Ebene."
    },
    {
        "Slug": "başarılı-dijital-uretım-mvp-stratejisi",
        "IdNum": 9,
        "TitleTr": "Başarılı Bir Dijital Üretime Başlarken: MVP (Minimum Uygulanabilir Ürün) Stratejisi",
        "TitleEn": "Starting a Successful Digital Production: MVP (Minimum Viable Product) Strategy",
        "TitleDe": "Start einer erfolgreichen digitalen Produktion: MVP-Strategie (Minimum Viable Product)",
        "ExcerptTr": "Tüm bütçeyi riske atmayın. MVP ile pazar testini en hızlı ve en doğru şekilde yapın.",
        "ExcerptEn": "Don't risk the entire budget. Do market testing in the fastest and most accurate way with MVP.",
        "ExcerptDe": "Riskieren Sie nicht das gesamte Budget. Führen Sie Markttests mit MVP am schnellsten und genauesten durch.",
        "Category": "Strategy", "ReadTime": 10,
        "ContentTr": "# MVP Nedir?\\n\\nFikrinizi en temel özellikleri ile hayata geçirip geri bildirim alarak büyümenizi sağlıyoruz. Softium ile riskinizi minimize edin.",
        "ContentEn": "# What is MVP?\\n\\nWe enable you to grow by bringing your idea to life with its most basic features and getting feedback.",
        "ContentDe": "# Was ist MVP?\\n\\nWir ermöglichen Ihnen das Wachstum, indem wir Ihre Idee mit ihren grundlegendsten Funktionen zum Leben erwecken und Feedback einholen."
    },
    {
        "Slug": "dijital-donusumde-dogru-bilinen-yanlislar",
        "IdNum": 10,
        "TitleTr": "Dijital Dönüşümde Yanlış Bilinen 5 Efsane",
        "TitleEn": "5 Common Myths About Digital Transformation",
        "TitleDe": "5 verbreitete Mythen über die digitale Transformation",
        "ExcerptTr": "Dijitalleşme pahalı mıdır? Sadece büyük şirketler için mi? Tüm efsaneleri çürütüyoruz.",
        "ExcerptEn": "Is digitalization expensive? Only for big companies? We debunk all the myths.",
        "ExcerptDe": "Ist Digitalisierung teuer? Nur für große Unternehmen? Wir räumen mit allen Mythen auf.",
        "Category": "Transformation", "ReadTime": 10,
        "ContentTr": "# Dijital Dönüşüm Efsaneleri\\n\\nYazılım bir masraf değil, yatırımdır. Softium ile doğru adımları atarak dönüşümü fırsata çevirin.",
        "ContentEn": "# Digital Transformation Myths\\n\\nSoftware is an investment, not an expense. Turn transformation into opportunity by taking the right steps with Softium.",
        "ContentDe": "# Mythen über die digitale Transformation\\n\\nSoftware ist eine Investition, keine Ausgabe. Verwandeln Sie die Transformation in eine Chance."
    }
]

def main():
    print("Full Blog Seeding Started...")
    
    for post in posts:
        id_num = post.pop("IdNum")
        image_path = IMAGE_PATHS.get(id_num)
        if image_path:
            print(f"Uploading image for: {post['Slug']}")
            url = upload_image(image_path)
            if url:
                post["CoverImage"] = url
        
        # Defaults
        post["IsPublished"] = True
        post["IsFeatured"] = False
        post["AuthorName"] = "Softium Editorial"
        post["AuthorRole"] = "Tech Expert"
        
        create_post(post)
        
    print("Full Seeding Complete.")

if __name__ == "__main__":
    main()
