const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5262/api';

const projects = [
  {
    slug: "neural-learning-core",
    titleTr: "Neural Learning Core",
    titleEn: "Neural Learning Core",
    titleDe: "Neural Learning Core",
    overlineTr: "Yapay Zeka Altyapısı",
    overlineEn: "AI Infrastructure",
    overlineDe: "KI-Infrastruktur",
    shortDescriptionTr: "Otonom öğrenme süreçlerini optimize eden yeni nesil yapay zeka çekirdeği.",
    shortDescriptionEn: "Next-gen AI core optimizing autonomous learning processes.",
    shortDescriptionDe: "KI-Kern der nächsten Generation zur Optimierung autonomer Lernprozesse.",
    mainImage: "/neural_learning_core_viz.png",
    icon: "psychology",
    isDarkTheme: true,
    layout: "standard",
    isPublished: true,
    detailedContentTr: `
      <p>Neural Learning Core, karmaşık veri madenciliği ve derin öğrenme algoritmalarını donanım seviyesinde optimize eden Softium'un amiral gemisi teknolojisidir. Bu sistem, geleneksel öğrenme modellerine göre %40 daha az enerji tüketirken, işlem hızını iki katına çıkarır.</p>
      <p>Sistem, gerçek zamanlı veri akışlarını analiz ederek otonom karar verme süreçlerini milisaniyeler seviyesine indirir. Özellikle finansal tahminleme ve otonom araç yazılımları için kritik bir çekirdek görevi görür.</p>
      <img src="/neural_learning_core_viz.png" style="width: 100%; border-radius: 1rem; margin: 2rem 0;" />
      <p>Gelişmiş mimarisi sayesinde, model eğitimi sırasında oluşan hata payını minimize eden 'Self-Correction' mekanizmasına sahiptir. Bu, yapay zekanın kendi hatalarından anlık olarak öğrenmesini sağlar.</p>
      <p>Neural Learning Core, bulut tabanlı sistemlerle tam entegre çalışabildiği gibi, kısıtlı bant genişliğine sahip uç (edge) cihazlarda da tam performans sergileyebilir. Modüler yapısı, farklı sektörlere kolayca uyarlanmasını sağlar.</p>
      <p>Geleceğin dünyasında, yapay zekanın sadece zeki olması yetmez; aynı zamanda sürdürülebilir ve esnek olmalıdır. Neural Learning Core bu vizyonun tam merkezinde yer almaktadır.</p>
    `,
    features: [
      { titleTr: "Gerçek Zamanlı Karar Mekanizması", titleEn: "Real-time Decision Making", titleDe: "Echtzeit-Entscheidung", icon: "speed", sortOrder: 0 },
      { titleTr: "Enerji Verimli Algoritma", titleEn: "Energy-Efficient Algorithm", titleDe: "Energieeffizienter Algorithmus", icon: "eco", sortOrder: 1 }
    ]
  },
  {
    slug: "blockchain-security-vault",
    titleTr: "Blockchain Security Vault",
    titleEn: "Blockchain Security Vault",
    titleDe: "Blockchain Security Vault",
    overlineTr: "Siber Güvenlik",
    overlineEn: "Cyber Security",
    overlineDe: "Cyber-Sicherheit",
    shortDescriptionTr: "Blockchain tabanlı sarsılmaz veri koruma ve şifreleme ekosistemi.",
    shortDescriptionEn: "Unshakable data protection and encryption ecosystem based on blockchain.",
    shortDescriptionDe: "Blockchain-basiertes Ökosystem für unerschütterlichen Datenschutz.",
    mainImage: "/blockchain_security_vault_viz.png",
    icon: "security",
    isDarkTheme: false,
    layout: "standard",
    isPublished: true,
    detailedContentTr: `
      <p>Günümüzün dijital dünyasında siber tehditler her zamankinden daha karmaşık. Blockchain Security Vault, verilerinizi merkeziyetsiz bir defter yapısında parçalayarak şifreleyen ve yetkisiz erişimi imkansız kılan bir kalkan sunar.</p>
      <p>Sistem, kuantum sonrası şifreleme (Post-Quantum Cryptography) standartlarını destekleyerek gelecekteki olası teknolojik tehditlere karşı da şimdiden hazır bir altyapı sağlar. Veri sızıntısı riski bu mimari ile teorik olarak sıfıra indirilmiştir.</p>
      <img src="/blockchain_security_vault_viz.png" style="width: 100%; border-radius: 1rem; margin: 2rem 0;" />
      <p>Akıllı kontratlar aracılığıyla yönetilen erişim izinleri, her işlemde değişen dinamik anahtarlar ve biometrik doğrulama katmanları ile kurumsal verileriniz Softium güvencesi altına alınır.</p>
      <p>Yalnızca veriyi saklamakla kalmaz, aynı zamanda veri bütünlüğünü (integrity) saniyeler içerisinde binlerce node üzerinden doğrular. Herhangi bir manipülasyon girişimi anında sistem tarafından tespit edilir ve izole edilir.</p>
      <p>Özellikle tıbbi kayıtlar, gizli devlet belgeleri ve yüksek bütçeli Ar-Ge verileri için tasarlanmış olan bu kasa, güvenlikte yeni bir dönemi temsil ediyor.</p>
      <p>Softium Blockchain Security Vault ile verileriniz sadece korunmaz, aynı zamanda geleceğe sarsılmaz bir güvenle taşınır.</p>
    `,
    features: [
      { titleTr: "Kuantum Sonrası Şifreleme", titleEn: "Post-Quantum Cryptography", titleDe: "Post-Quanten-Kryptografie", icon: "lock", sortOrder: 0 },
      { titleTr: "Merkeziyetsiz Validasyon", titleEn: "Decentralized Validation", titleDe: "Dezentrale Validierung", icon: "share", sortOrder: 1 }
    ]
  },
  {
    slug: "quantum-cloud-infrastructure",
    titleTr: "Quantum Cloud Infrastructure",
    titleEn: "Quantum Cloud Infrastructure",
    titleDe: "Quantum Cloud Infrastructure",
    overlineTr: "Bulut Bilişim",
    overlineEn: "Cloud Computing",
    overlineDe: "Cloud-Computing",
    shortDescriptionTr: "Kuantum hızında veri işleme sunan devrim niteliğinde bulut mimarisi.",
    shortDescriptionEn: "Revolutionary cloud architecture offering quantum-speed data processing.",
    shortDescriptionDe: "Revolutionäre Cloud-Architektur mit Quantengeschwindigkeit.",
    mainImage: "/quantum_cloud_compute_viz.png",
    icon: "cloud",
    isDarkTheme: true,
    layout: "standard",
    isPublished: true,
    detailedContentTr: `
      <p>Softium Quantum Cloud, süper pozisyon ve dolanıklık prensiplerini klasik bulut bilişimle harmanlayan hibrit bir platformdur. Bu altyapı, karmaşık optimizasyon problemlerini saniyeler içinde çözer.</p>
      <p>Büyük veri analitiği (Big Data) süreçlerinde, geleneksel sunucu çiftliklerinin aylar sürdüğü işlemleri biz saatler seviyesine indirdik. Ölçeklenebilir yapısı, start-up'lardan dev holdinglere kadar her bütçeye uygun performans sunar.</p>
      <img src="/quantum_cloud_compute_viz.png" style="width: 100%; border-radius: 1rem; margin: 2rem 0;" />
      <p>Düşük gecikme süreli (Low Latency) bağlantı noktalarımız sayesinde dünya genelindeki verileri eşzamanlı olarak işleme kapasitesine sahibiz. Bu özellik, global borsa verileri gibi anlık veri işleme gerektiren sektörler için hayati önem taşır.</p>
      <p>Platformumuz, geliştiricilere açık API desteği sunarak kendi kuantum-hazır uygulamalarını geliştirmelerine olanak tanır. Python ve C++ kütüphaneleriyle tam uyumlu SDK setlerimiz mevcuttur.</p>
      <p>Quantum Cloud, bulut bilişimin sınırlarını zorlayarak işletmenize sınırsız hesaplama gücü sağlamayı hedefler. Geleceğin işlem gücü artık parmaklarınızın ucunda.</p>
      <p>Softium olarak, bulutun ötesine geçiyoruz ve sizi kuantum çağına davet ediyoruz.</p>
    `,
    features: [
      { titleTr: "Sınırsız Ölçeklenebilirlik", titleEn: "Unlimited Scalability", titleDe: "Unbegrenzte Skalierbarkeit", icon: "trending_up", sortOrder: 0 },
      { titleTr: "Düşük Gecikme Garantisi", titleEn: "Low Latency Guarantee", titleDe: "Niedrige Latenzgarantie", icon: "bolt", sortOrder: 1 }
    ]
  },
  {
    slug: "edge-iot-smart-city",
    titleTr: "Edge IoT Smart City",
    titleEn: "Edge IoT Smart City",
    titleDe: "Edge IoT Smart City",
    overlineTr: "Akıllı Şehirler",
    overlineEn: "Smart Cities",
    overlineDe: "Smart Cities",
    shortDescriptionTr: "Uç bilişim ile akıllı şehir ekosistemlerini daha hızlı ve güvenli yönetin.",
    shortDescriptionEn: "Manage smart city ecosystems faster and safer with edge computing.",
    shortDescriptionDe: "Verwalten Sie Smart City-Ökosysteme schneller mit Edge Computing.",
    mainImage: "/edge_iot_smart_city_viz.png",
    icon: "location_city",
    isDarkTheme: false,
    layout: "standard",
    isPublished: true,
    detailedContentTr: `
      <p>Akıllı şehir vizyonu, verinin uç noktalarda (edge) işlenmesiyle gerçeğe dönüşüyor. Softium Edge IoT katmanı, sensörlerden gelen veriyi merkezi buluta göndermeden yerinde işleyerek trafik, enerji ve güvenlik süreçlerini optimize eder.</p>
      <p>Trafik ışıklarının anlık yoğunluğa göre koordine edilmesi, enerji şebekelerinin talebe göre kendisini düzenlemesi gibi karmaşık senaryolar, Edge IoT mimarimiz ile saniyeler içerisinde yanıt bulur.</p>
      <img src="/edge_iot_smart_city_viz.png" style="width: 100%; border-radius: 1rem; margin: 2rem 0;" />
      <p>Güvenlik konusunda ise, yüz tanıma veya olay algılama gibi işlemler doğrudan kameranın bulunduğu noktada yapılır. Bu sayede kişisel verilerin gizliliği korunurken, ağ üzerindeki yük minimize edilir.</p>
      <p>Belediyeler ve kamu kurumları için geliştirdiğimiz kontrol panelleri (dashboards), şehrin tüm nabzını tek bir merkezden izleme ve acil durumlarda anında müdahale etme imkanı sunar.</p>
      <p>Şehirler artık daha yaşanabilir, daha güvenli ve daha sürdürülebilir. Edge IoT ile şehirlerin geleceğini bugünden inşa ediyoruz.</p>
      <p>Softium ile şehirler artık sadece beton değil, yaşayan ve düşünen birer organizmaya dönüşüyor.</p>
    `,
    features: [
      { titleTr: "Hızlı Veri İşleme", titleEn: "Rapid Data Processing", titleDe: "Schnelle Datenverarbeitung", icon: "data_exploration", sortOrder: 0 },
      { titleTr: "Gelişmiş Güvenlik", titleEn: "Advanced Security", titleDe: "Erweiterte Sicherheit", icon: "verified", sortOrder: 1 }
    ]
  },
  {
    slug: "digital-twin-factory",
    titleTr: "Digital Twin Factory",
    titleEn: "Digital Twin Factory",
    titleDe: "Digital Twin Factory",
    overlineTr: "Endüstri 4.0",
    overlineEn: "Industry 4.0",
    overlineDe: "Industrie 4.0",
    shortDescriptionTr: "Fabrikanızın dijital ikizini oluşturun ve üretim hatalarını sıfıra indirin.",
    shortDescriptionEn: "Create a digital twin of your factory and zero out production errors.",
    shortDescriptionDe: "Erstellen Sie einen digitalen Zwilling Ihrer Fabrik zur Fehlerminimierung.",
    mainImage: "/digital_twin_industrial_viz.png",
    icon: "factory",
    isDarkTheme: true,
    layout: "standard",
    isPublished: true,
    detailedContentTr: `
      <p>Endüstriyel tesisler için geliştirdiğimiz Digital Twin Factory, fiziksel makinelerin birebir sanal kopyasını oluşturarak operasyonel verimliliği maksimuma çıkarır. Üretim bandındaki her saniye artık veriye dönüşüyor.</p>
      <p>Sistem, makinelerden gelen anlık sensör verilerini kullanarak kestirimci bakım (Predictive Maintenance) yapar. Bu sayede arıza gerçekleşmeden önce tespit edilir ve üretim duraklamalarının önüne geçilir.</p>
      <img src="/digital_twin_industrial_viz.png" style="width: 100%; border-radius: 1rem; margin: 2rem 0;" />
      <p>Sanal ortamda yapılan senaryo analizleri ile yeni üretim süreçleri gerçek dünyada uygulanmadan önce test edilir. Hangi hattın daha verimli olduğu, darboğazların nerede oluştuğu dijital ortamda açıkça görülür.</p>
      <p>Ar-Ge ve tasarım ekipleri, ürünlerin üretim aşamasındaki davranışlarını simüle ederek kalite kontrol süreçlerini optimize eder. Bu, piyasaya çıkış süresini (Time-to-Market) %25 oranında kısaltır.</p>
      <p>Fabrikanız artık sizinle konuşuyor. Digital Twin Factory yazılımımızla üretimin her aşamasında tam hakimiyet sağlayın.</p>
      <p>Geleceğin fabrikasında hatalara yer yok, sadece veri odaklı mükemmeliyet var.</p>
    `,
    features: [
      { titleTr: "Kestirimci Bakım Algoritması", titleEn: "Predictive Maintenance", titleDe: "Vorausschauende Wartung", icon: "engineering", sortOrder: 0 },
      { titleTr: "Sanal Simülasyon Desteği", titleEn: "Virtual Simulation Support", titleDe: "Virtuelle Simulation", icon: "view_in_ar", sortOrder: 1 }
    ]
  },
  {
    slug: "omnichannel-retail-ai",
    titleTr: "Omnichannel Retail AI",
    titleEn: "Omnichannel Retail AI",
    titleDe: "Omnichannel Retail AI",
    overlineTr: "Perakende Teknolojileri",
    overlineEn: "Retail Tech",
    overlineDe: "Einzelhandelstechnologie",
    shortDescriptionTr: "Müşteri deneyimini tüm kanallarda yapay zeka ile kusursuzlaştırın.",
    shortDescriptionEn: "Perfect the customer experience across all channels with AI.",
    shortDescriptionDe: "Perfektionieren Sie das Kundenerlebnis über alle Kanäle mit KI.",
    mainImage: "/omnichannel_retail_ai_viz.png",
    icon: "shopping_cart",
    isDarkTheme: false,
    layout: "standard",
    isPublished: true,
    detailedContentTr: `
      <p>Perakende dünyasında fiziksel mağaza ve dijital dünya arasındaki sınırlar kalkıyor. Softium Omnichannel AI, müşterinin alışveriş yolculuğunu her noktada izleyerek kişiselleştirilmiş teklifler sunan bir zeka katmanıdır.</p>
      <p>Müşterinizin online mağazada sepetine attığı bir ürünü fiziksel mağazaya girdiğinde ona hatırlatan veya stok durumuna göre anlık kampanya kurgulayan bir sistem hayal edin. Biz bunu gerçeğe dönüştürdük.</p>
      <img src="/omnichannel_retail_ai_viz.png" style="width: 100%; border-radius: 1rem; margin: 2rem 0;" />
      <p>Görüntü işleme teknolojimiz ile mağaza içi yoğunluk haritaları oluşturulur ve personel yönetimi trafik akışına göre optimize edilir. Müşterinin hangi reyon önünde ne kadar vakit geçirdiği analiz edilerek mağaza yerleşimi iyileştirilir.</p>
      <p>Stok yönetimi ise yapay zeka tahminleme modelleri ile otomatikleştirilir. Talebin ne zaman artacağı önceden tahmin edilerek lojistik süreçler minimum maliyetle yönetilir.</p>
      <p>Müşteri sadakatini yapay zeka ile artırın. Omnichannel Retail AI, her ziyareti eşsiz bir deneyime dönüştürür.</p>
      <p>Softium ile satışlarınızı değil, müşteri mutluluğunuzu katlıyoruz.</p>
    `,
    features: [
      { titleTr: "Kişiselleştirilmiş Bildirimler", titleEn: "Personalized Notifications", titleDe: "Personalisierte Benachrichtigungen", icon: "notifications_active", sortOrder: 0 },
      { titleTr: "Mağaza Yoğunluk Analizi", titleEn: "In-store Traffic Analysis", titleDe: "In-Store-Verkehrsanalyse", icon: "analytics", sortOrder: 1 }
    ]
  }
];

async function seed() {
  console.log("--- RICH CONTENT PROJECT SEEDING STARTED ---");
  for (const proj of projects) {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj)
      });
      if (response.ok) {
        console.log(`Successfully added project: ${proj.titleTr}`);
      } else {
        const err = await response.text();
        console.error(`Failed to add project ${proj.titleTr}:`, err);
      }
    } catch (error) {
      console.error(`Failed to add project ${proj.titleTr}:`, error.message);
    }
  }
  console.log("--- SEEDING COMPLETED ---");
}

seed();
