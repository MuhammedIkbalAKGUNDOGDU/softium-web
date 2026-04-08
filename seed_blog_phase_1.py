import urllib.request
import urllib.parse
import json
import os

API_URL = "https://softiumtechnologies.net"
UPLOADS_URL = f"{API_URL}/api/uploads"
BLOG_POSTS_URL = f"{API_URL}/api/blogposts"

IMAGE_1_PATH = "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_custom_software_vs_ready_made_1775648863022.png"
IMAGE_2_PATH = "/root/.gemini/antigravity/brain/6ae80157-2373-44d9-9d25-720c294573c3/blog_headless_commerce_concept_1775648883050.png"

def upload_image(image_path):
    # Use curl for multipart since urllib is a pain for that
    import subprocess
    cmd = ["curl", "-s", "-X", "POST", "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36", "-F", f"file=@{image_path}", UPLOADS_URL]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        try:
            return json.loads(result.stdout).get('url')
        except:
            print("Upload error:", result.stdout)
            return None
    return None

def create_post(data):
    req = urllib.request.Request(BLOG_POSTS_URL, data=json.dumps(data).encode('utf-8'), method='POST')
    req.add_header('Content-Type', 'application/json')
    req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    try:
        with urllib.request.urlopen(req) as f:
            print(f"Created: {data['Slug']}")
            return f.read().decode('utf-8')
    except Exception as e:
        print(f"Error creating {data['Slug']}: {e}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))
        return None

# Content
post_1 = {
    "Slug": "neden-ozel-yazilim-vs-hazir-paketler",
    "TitleTr": "Neden Özel Yazılım? Hazır Paketlerin Sınırı ve Softium Farkı",
    "TitleEn": "Why Custom Software? The Limits of Ready-Made Packages and the Softium Difference",
    "TitleDe": "Warum Individualsoftware? Die Grenzen von Standardpaketen und der Softium-Unterschied",
    "ExcerptTr": "Hazır paketlerin kısıtlamalarından kurtulun. İşletmeniz için neden özel yazılım geliştirmenin en doğru yatırım olduğunu keşfedin.",
    "ExcerptEn": "Break free from the constraints of ready-made packages. Discover why custom software is the right investment for your business.",
    "ExcerptDe": "Befreien Sie sich von den Einschränkungen von Standardpaketen. Finden Sie heraus, warum Individualsoftware die richtige Investition für Ihr Unternehmen ist.",
    "ContentTr": "# Neden Özel Yazılım? Hazır Paketlerin Sınırı ve Softium Farkı\n\nDijital dünyada varlık göstermek isteyen her işletme, yolun başında kritik bir kararla karşı karşıya kalır: Mevcut hazır paketlerden birini mi kullanmalı, yoksa tamamen kendine özel bir yazılım mı geliştirmeli? İlk bakışta hazır paketler (SaaS çözümleri, hazır scriptler) \"hızlı ve ucuz\" göründüğü için cazip gelebilir. Ancak işletmeniz büyüdükçe, bu paketlerin görünmez duvarlarına çarpmaya başlarsınız.\n\n## 1. Hazır Paketlerin \"Altın Kafesi\"\nHazır paketler, binlerce farklı işletmenin ortak ihtiyaçlarına göre tasarlanmıştır. Bu durum, projenizin %80'ini hızlıca halletmenizi sağlasa da, geri kalan %20'lik -yani sizi rakiplerinizden ayıran o \"özgün\" kısmın- geliştirilmesini neredeyse imkansız kılar. İhtiyaç duymadığınız yüzlerce özellik sisteminizi hantal hale getirirken, gerçekten ihtiyacınız olan bir fonksiyonu eklemek için sistemin çekirdeğine müdahale edemezsiniz.\n\n## 2. Ölçeklenebilirlik Krizi\nİşletmeniz büyüdüğünde, trafik arttığında veya yeni bir iş modeline geçtiğinizde hazır paketler genellikle yetersiz kalır. Ya daha pahalı üst paketlere geçmeye zorlanırsınız ya da sistemin kilitlendiğini görürsünüz. Özel yazılım ise, işletmenizle birlikte nefes alan, genişleyebilen ve tamamen sizin kontrolünüzde olan bir yapıdır.\n\n## 3. Güvenlik ve Performans\nHazır paketlerin kod yapısı herkese açıktır. Bir güvenlik açığı keşfedildiğinde, bu sistemleri kullanan binlerce site aynı anda risk altına girer. Ayrıca, genel bir kitleye hitap ettiği için optimize edilmemiş kodlar sitenizin yavaş çalışmasına neden olur. Özel yazılımda ise kod sadece sizin için yazılır; en modern performans teknikleri (SSR, Edge Computing) en başından sisteme entegre edilir.\n\n## 4. Softium Farkı: Analizden Uygulamaya\nSoftium Technologies olarak biz, yazılımı sadece bir kod yığını olarak görmüyoruz. Sizin iş süreçlerinizi analiz ediyor, darboğazları tespit ediyor ve işletmenize %100 uyum sağlayacak dijital araçlar geliştiriyoruz. Kullandığımız Next.js ve .NET teknolojileriyle hem geleceğe hazır hem de Google'ın (SEO) en sevdiği performans değerlerine sahip ürünler ortaya koyuyoruz.",
    "ContentEn": "# Why Custom Software? The Limits of Ready-Made Packages and the Softium Difference\n\nEvery business looking to establish a digital presence faces a critical decision at the start: use an existing ready-made package or develop completely custom software? At first glance, ready-made packages (SaaS solutions, ready-made scripts) may seem attractive because they are \"fast and cheap.\" However, as your business grows, you'll start hitting the invisible walls of these packages.\n\n## 1. The \"Golden Cage\" of Ready-Made Packages\nReady-made packages are designed to meet the common needs of thousands of different businesses. While this allows you to handle 80% of your project quickly, it makes it nearly impossible to develop the remaining 20%—the \"unique\" part that sets you apart from your competitors. While hundreds of features you don't need make your system cumbersome, you cannot intervene in the core of the system to add a function you actually need.\n\n## 2. The Scalability Crisis\nWhen your business grows, traffic increases, or you move to a new business model, ready-made packages are often insufficient. You either are forced to move to more expensive top packages or see the system locked. Custom software, on the other hand, is a structure that breathes and expands with your business and is completely under your control.\n\n## 3. Security and Performance\nThe code structure of ready-made packages is open to everyone. When a security vulnerability is discovered, thousands of sites using these systems are at risk at the same time. Also, because it appeals to a general audience, non-optimized code causes your site to run slowly. In custom software, the code is written specifically for you; the most modern performance techniques (SSR, Edge Computing) are integrated into the system from the beginning.\n\n## 4. The Softium Difference: From Analysis to Implementation\nAs Softium Technologies, we don't see software as just a pile of code. We analyze your business processes, identify bottlenecks, and develop digital tools that will fit your business 100%. With the Next.js and .NET technologies we use, we create products that are both ready for the future and have the performance values favored by Google (SEO).",
    "ContentDe": "# Warum Individualsoftware? Die Grenzen von Standardpaketen und der Softium-Unterschied\n\nJedes Unternehmen, das eine digitale Präsenz aufbauen möchte, steht zu Beginn vor einer kritischen Entscheidung: Soll es ein bestehendes Standardpaket verwenden oder eine komplett individuelle Software entwickeln? Auf den ersten Blick mögen Standardpakete (SaaS-Lösungen, fertige Skripte) attraktiv erscheinen, da sie \"schnell und billig\" sind. Wenn Ihr Unternehmen jedoch wächst, werden Sie auf die unsichtbaren Wände dieser Pakete stoßen.\n\n## 1. Der \"goldene Käfig\" von Standardpaketen\nStandardpakete sind so konzipiert, dass sie die gemeinsamen Bedürfnisse tausender verschiedener Unternehmen erfüllen. Dies ermöglicht es Ihnen zwar, 80 % Ihres Projekts schnell abzuwickeln, macht es jedoch fast unmöglich, die restlichen 20 % zu entwickeln – den \"einzigartigen\" Teil, der Sie von Ihren Mitbewerbern abhebt. Während Hunderte von Funktionen, die Sie nicht benötigen, Ihr System umständlich machen, können Sie nicht in den Kern des Systems eingreifen, um eine Funktion hinzuzufügen, die Sie tatsächlich benötigen.\n\n## 2. Die Skalierbarkeitskrise\nWenn Ihr Unternehmen wächst, der Datenverkehr zunimmt oder Sie zu einem neuen Geschäftsmodell wechseln, sind Standardpakete oft unzureichend. Sie sind entweder gezwungen, auf teurere Toppakete umzusteigen, oder sehen das System gesperrt. Individualsoftware hingegen ist eine struktur, die mit Ihrem Unternehmen atmet und expandiert und vollständig unter Ihrer Kontrolle steht.\n\n## 3. Sicherheit und Leistung\nDie Codestruktur von Standardpaketen ist für jeden offen. Wenn eine Sicherheitslücke entdeckt wird, sind Tausende von Websites, die diese Systeme verwenden, gleichzeitig gefährdet. Da es ein allgemeines Publikum anspricht, führt nicht optimierter Code dazu, dass Ihre Website langsam läuft. Bei Individualsoftware wird der Code speziell für Sie geschrieben; modernste Performance-Techniken (SSR, Edge Computing) werden von Anfang an in das System integriert.\n\n## 4. Der Softium-Unterschied: Von der Analyse bis zur Implementierung\nWir von Softium Technologies betrachten Software nicht nur als einen Haufen Code. Wir analysieren Ihre Geschäftsprozesse, identifizieren Engpässe und entwickeln digitale Werkzeuge, die zu 100 % zu Ihrem Unternehmen passen. Mit den von uns verwendeten Next.js- und .NET-Technologien erstellen wir Produkte, die sowohl zukunftssicher sind als auch die von Google bevorzugten Leistungswerte (SEO) aufweisen.",
    "Category": "Software Strategy",
    "ReadTime": 10,
    "IsPublished": True,
    "IsFeatured": True,
    "AuthorName": "Softium Editorial",
    "AuthorRole": "Tech Strategy"
}

post_2 = {
    "Slug": "headless-commerce-e-ticaretin-gelecegi",
    "TitleTr": "2024 ve Ötesinde E-Ticaret Durakları: Headless Commerce ile Tanışın",
    "TitleEn": "2024 and Beyond: Meet Headless Commerce",
    "TitleDe": "2024 und darüber hinaus: Headless Commerce kennenlernen",
    "ExcerptTr": "Geleneksel e-ticaret siteleri yavaş kalıyor. Headless Commerce ile hız, esneklik ve sınırsız deneyimin kapılarını aralayın.",
    "ExcerptEn": "Traditional e-commerce sites are slow. Open the doors to speed, flexibility, and limitless experience with Headless Commerce.",
    "ExcerptDe": "Herkömmliche E-Commerce-Sites sind langsam. Öffnen Sie die Türen zu Geschwindigkeit, Flexibilität und grenzenlosem Erlebnis mit Headless Commerce.",
    "ContentTr": "# 2024 ve Ötesinde E-Ticaret Durakları: Headless Commerce ile Tanışın\n\nE-ticaret dünyası baş döndürücü bir hızla değişiyor. Artık sadece bir web sitesine sahip olmak yetmiyor. Müşterileriniz akıllı telefonlardan, sosyal medya mağazalarından, giyilebilir cihazlardan ve hatta oyun konsollarından alışveriş yapıyor. Peki, tüm bu kanallarda kusursuz bir deneyimi nasıl sunarsınız? Cevap: **Headless Commerce**.\n\n## Headless Commerce Nedir?\nGeleneksel e-ticaret platformlarında web sitesinin ön yüzü (frontend) ve arka yüzü (backend) birbirine sıkı sıkıya bağlıdır. Birinde yapacağınız değişiklik diğerini etkiler. \"Headless\" (Başsız) mimaride ise bu iki yapı birbirinden ayrılır. Arka yüzdeki tüm veriler (ürünler, stoklar, siparişler) API'lar aracılığıyla ön yüze aktarılır. Bu, ön yüzü istediğiniz teknolojide (Next.js, Vue, Mobil Uygulama vb.) özgürce geliştirmenizi sağlar.\n\n## Neden Headless?\n1. **Işık Hızında Performans:** Ön yüz tamamen optimize edilmiş React bileşenleriyle inşa edildiği için sayfalar anında yüklenir.\n2. **Sınırsız Esneklik:** Tasarımda hazır şablonlara mahkum kalmazsınız. Markanızın ruhunu yansıtan özgün deneyim oluşturabilirsiniz.\n3. **Gerçek Çok Kanallılık (Omnichannel):** Tek bir arka yüz ile web sitenizi, mobil uygulamanızı ve kiosklarınızı aynı anda yönetebilirsiniz.\n\n## Softium ile E-Ticarette Yeni Dönem\nSoftium Technologies olarak, e-ticaret projelerimizde Headless mimariyi standart olarak sunuyoruz. Bu sayede müşterilerimiz yüksek trafikli kampanya dönemlerinde bile hızdan ödün vermiyor, Google sıralamalarında en üstte yer alıyor.",
    "ContentEn": "# 2024 and Beyond: Meet Headless Commerce\n\nThe world of e-commerce is changing at a breakneck speed. Now, just having a website is not enough. Your customers are shopping from smartphones, social media stores, wearables, and even gaming consoles. So how do you deliver a perfect experience across all these channels? The answer: **Headless Commerce**.\n\n## What is Headless Commerce?\nIn traditional e-commerce platforms, the front end and back end of the website are tightly coupled. A change you make in one affects the other. In \"Headless\" architecture, these two structures are separated. All back-end data (products, stocks, orders) is transferred to the front end via APIs. This allows you to freely develop the front end in any technology you want (Next.js, Vue, Mobile Application, etc.).\n\n## Why Headless?\n1. **Lightning Fast Performance:** Since the frontend is built with fully optimized React components, pages load instantly.\n2. **Limitless Flexibility:** You are not condemned to ready-made templates in design. You can create a unique experience that reflects the spirit of your brand.\n3. **True Omnichannel:** With a single back end, you can manage your website, mobile application, and kiosks at the same time.\n\n## A New Era in E-Commerce with Softium\nAs Softium Technologies, we offer Headless architecture as a standard in our e-commerce projects. In this way, our customers do not compromise on speed even during high-traffic campaign periods and take the top place in Google rankings.",
    "ContentDe": "# 2024 und darüber hinaus: Headless Commerce kennenlernen\n\nDie Welt des E-Commerce verändert sich rasant. Heutzutage reicht es nicht mehr aus, nur eine Website zu haben. Ihre Kunden kaufen über Smartphones, Social-Media-Stores, Wearables und sogar Spielekonsolen ein. Wie bieten Sie also über all diese Kanäle hinweg ein perfektes Erlebnis? Die Antwort: **Headless Commerce**.\n\n## Was ist Headless Commerce?\nBei herkömmlichen E-Commerce-Plattformen sind das Frontend und das Backend der Website eng miteinander verknüpft. Eine Änderung, die Sie in der einen vornehmen, wirkt sich auf die andere aus. Bei der \"Headless\"-Architektur sind diese beiden Strukturen voneinander getrennt. Alle Backend-Daten (Produkte, Bestände, Bestellungen) werden über APIs an das Frontend übertragen. Dies ermöglicht es Ihnen, das Frontend in jeder gewünschten Technologie (Next.js, Vue, Mobile Application usw.) frei zu entwickeln.\n\n## Warum Headless?\n1. **Blitzschnelle Performance:** Da das Frontend mit voll optimierten React-Komponenten aufgebaut ist, laden die Seiten sofort.\n2. **Grenzenlose Flexibilität:** Sie sind bei der Gestaltung nicht an vorgefertigte Vorab-Templates gebunden. Sie können ein einzigartiges Erlebnis schaffen, das den Geist Ihrer Marke widerspiegelt.\n3. **Wahres Omnichannel:** Mit einem einzigen Backend können Sie Ihre Website, Ihre mobile App und Ihre Kioske gleichzeitig verwalten.\n\n## Eine neue Ära im E-Commerce mit Softium\nSoftium Technologies bietet die Headless-Architektur als Standard in unseren E-Commerce-Projekten an. Auf diese Weise gehen unsere Kunden auch in Phasen mit hohem Kampagnenaufkommen keine Kompromisse bei der Geschwindigkeit ein und belegen in den Google-Rankings einen Spitzenplatz.",
    "Category": "E-Commerce",
    "ReadTime": 10,
    "IsPublished": True,
    "IsFeatured": False,
    "AuthorName": "Softium Editorial",
    "AuthorRole": "E-Commerce Expert"
}

print("Uploading images...")
url1 = upload_image(IMAGE_1_PATH)
url2 = upload_image(IMAGE_2_PATH)

if url1: post_1["CoverImage"] = url1
if url2: post_2["CoverImage"] = url2

print("Creating posts...")
create_post(post_1)
create_post(post_2)
print("Done.")
