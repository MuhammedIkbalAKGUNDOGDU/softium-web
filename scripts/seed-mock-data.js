const API_URL = 'http://localhost:5000/api';

const mockProjects = [
  {
    slug: 'softium-neural-mesh',
    titleTr: 'Softium Neural Mesh',
    titleEn: 'Softium Neural Mesh',
    titleDe: 'Softium Neural Mesh',
    overlineTr: 'Yapay Zeka Altyapısı',
    overlineEn: 'AI Infrastructure',
    overlineDe: 'KI-Infrastruktur',
    shortDescriptionTr: 'Gelecek nesil otonom öğrenme ağları için ölçeklenebilir bir mesh mimarisi.',
    shortDescriptionEn: 'A scalable mesh architecture for next-generation autonomous learning networks.',
    shortDescriptionDe: 'Eine skalierbare Mesh-Architektur für autonome Lernnetzwerke der nächsten Generation.',
    detailedContentTr: '<h2>Yapay Zekada Yeni Dönem</h2><p>Neural Mesh, karmaşık veri setlerini gerçek zamanlı olarak işlemek için tasarlanmış hibrit bir yapıdır. <strong>Hız ve doğruluk</strong> ön plandadır.</p><ul><li>Gerçek zamanlı optimizasyon</li><li>Düşük gecikme süresi</li><li>Yüksek güvenlik</li></ul><p>Softium Neural Mesh, kurumsal düzeyde yapay zeka entegrasyonu için gereken tüm altyapıyı sunar.</p>',
    detailedContentEn: '<h2>New Era in AI</h2><p>Neural Mesh is a hybrid structure designed to process complex data sets in real time. <strong>Speed and accuracy</strong> are at the forefront.</p>',
    detailedContentDe: '<h2>Neue Ära in der KI</h2><p>Neural Mesh ist eine Hybridstruktur, die zur Verarbeitung komplexer Datensätze in Echtzeit entwickelt wurde.</p>',
    mainImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    hoverImage: '',
    icon: 'neurology',
    isDarkTheme: true,
    isPublished: true,
    sortOrder: 1,
    demoUrl: 'https://demo.softium.tech/neural',
    features: [
      { titleTr: 'Hızlı İşleme', titleEn: 'Fast Processing', titleDe: 'Schnelle Verarbeitung', icon: 'bolt', sortOrder: 1 },
      { titleTr: 'Veri Güvenliği', titleEn: 'Data Security', titleDe: 'Datensicherheit', icon: 'security', sortOrder: 2 },
      { titleTr: 'Otonom Öğrenme', titleEn: 'Autonomous Learning', titleDe: 'Autonomes Lernen', icon: 'auto_awesome', sortOrder: 3 }
    ]
  },
  {
    slug: 'cloud-quant-os',
    titleTr: 'Cloud Quant OS',
    titleEn: 'Cloud Quant OS',
    titleDe: 'Cloud Quant OS',
    overlineTr: 'Bulut İşletim Sistemi',
    overlineEn: 'Cloud Operating System',
    overlineDe: 'Cloud-Betriebssystem',
    shortDescriptionTr: 'Kuantum bilişim prensipleriyle optimize edilmiş, dağıtık bulut yönetim sistemi.',
    shortDescriptionEn: 'Distributed cloud management system optimized with quantum computing principles.',
    shortDescriptionDe: 'Verteiltes Cloud-Managementsystem, optimiert mit Quantencomputing-Prinzipien.',
    detailedContentTr: '<h2>Bulutun Ötesi</h2><p>Quant OS, kaynak yönetimini akıllı algoritmalarla yaparak %40 enerji tasarrufu sağlar.</p><p>Geleneksel bulut sistemlerinin aksine, Quant OS her iş yükünü en uygun düğüme saniyeler içinde dağıtır.</p>',
    detailedContentEn: '<h2>Beyond the Cloud</h2><p>Quant OS saves 40% energy by managing resources with smart algorithms.</p>',
    detailedContentDe: '<h2>Jenseits der Cloud</h2><p>Quant OS spart 40 % Energie durch Ressourcenmanagement mit intelligenten Algorithmen.</p>',
    mainImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    icon: 'cloud_sync',
    isDarkTheme: false,
    isPublished: true,
    sortOrder: 2,
    features: [
      { titleTr: 'Otomatik Ölçekleme', titleEn: 'Auto Scaling', titleDe: 'Auto-Skalierung', icon: 'dynamic_feed', sortOrder: 1 },
      { titleTr: 'Kuantum Güvenliği', titleEn: 'Quantum Security', titleDe: 'Quantensicherheit', icon: 'shield', sortOrder: 2 }
    ]
  },
  {
    slug: 'cyber-vault-enterprise',
    titleTr: 'Cyber Vault Enterprise',
    titleEn: 'Cyber Vault Enterprise',
    titleDe: 'Cyber Vault Enterprise',
    overlineTr: 'Siber Güvenlik',
    overlineEn: 'Cyber Security',
    overlineDe: 'Cybersicherheit',
    shortDescriptionTr: 'Kurumsal veriler için sıfır güven (Zero Trust) mimarili koruma kalkanı.',
    shortDescriptionEn: 'Zero Trust architecture protection shield for corporate data.',
    shortDescriptionDe: 'Zero-Trust-Architektur Schutzschild für Unternehmensdaten.',
    detailedContentTr: '<h3>Sınır Tanımayan Güvenlik</h3><p>Verileriniz her yönden gelen tehditlere karşı kuantum sonrası şifreleme ile korunur.</p><p>Cyber Vault, tehditleri henüz gerçekleşmeden tespit eden AI tabanlı bir izleme sistemine sahiptir.</p>',
    detailedContentEn: '<h3>Borderless Security</h3><p>Your data is protected with post-quantum encryption against threats from all directions.</p>',
    detailedContentDe: '<h3>Grenzenlose Sicherheit</h3><p>Ihre Daten sind durch Post-Quantum-Verschlüsselung vor Bedrohungen geschützt.</p>',
    mainImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    icon: 'shield_lock',
    isDarkTheme: true,
    isPublished: true,
    sortOrder: 3,
    features: [
      { titleTr: 'Uçtan Uca Şifreleme', titleEn: 'E2E Encryption', titleDe: 'E2E-Verschlüsselung', icon: 'lock', sortOrder: 1 },
      { titleTr: 'Gerçek Zamanlı İzleme', titleEn: 'Real-time Monitoring', titleDe: 'Echtzeit-Überwachung', icon: 'visibility', sortOrder: 2 }
    ]
  }
];

const mockBlogs = [
  {
    slug: 'yapay-zeka-ve-gelecegin-endustrisi',
    titleTr: 'Yapay Zeka ve Geleceğin Endüstrisi',
    titleEn: 'AI and the Industry of the Future',
    titleDe: 'KI und die Industrie der Zukunft',
    contentTr: '<p>Yapay zeka sadece bir trend değil, temel bir değişimdir...</p><h2>Yeni Üretim Modelleri</h2><p>Otonom sistemler fabrikaları değiştiriyor.</p><p>Gelecekte üretim süreçleri tamamen veri odaklı olacak.</p>',
    contentEn: '<p>AI is not just a trend, it is a fundamental shift...</p>',
    contentDe: '<p>KI ist nicht nur ein Trend, sondern ein grundlegender Wandel...</p>',
    excerptTr: 'Yapay zekanın endüstriyel devrimdeki rolünü ve geleceği nasıl şekillendirdiğini inceliyoruz.',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    authorName: 'İkbal Bey',
    category: 'Teknoloji',
    readTime: 8,
    isPublished: true,
    isFeatured: true
  },
  {
    slug: 'bulut-mimarilerde-maliyet-optimizasyonu',
    titleTr: 'Bulut Mimarilerde Maliyet Optimizasyonu',
    titleEn: 'Cost Optimization in Cloud Architectures',
    contentTr: '<p>Bulut faturalarınızı düşürmenin 5 etkili yolu...</p><p>Doğru kaynak yönetimi ile %30\'a varan tasarruf sağlayabilirsiniz.</p>',
    excerptTr: 'Gereksiz bulut harcamalarından kurtulmak için uygulamanız gereken temel stratejiler.',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    authorName: 'Softium Analiz',
    category: 'Bulut',
    readTime: 6,
    isPublished: true
  }
];

const mockReferences = [
  { name: 'TeknoHolding', industry: 'Finans', icon: 'account_balance', websiteUrl: 'https://teknoholding.com.tr', isActive: true, description: 'Türkiye\'nin öncü finans kuruluşlarından biri olan TeknoHolding ile dijital dönüşüm yolculuğundayız.' },
  { name: 'Global Logistic', industry: 'Lojistik', icon: 'local_shipping', isActive: true, description: 'Lojistik operasyonlarını Softium Cloud OS ile optimize eden Global Logistic, verimliliğini %25 artırdı.' },
  { name: 'Aero Dynamics', industry: 'Havacılık', icon: 'flight', isActive: true, description: 'Yüksek teknoloji havacılık çözümlerinde siber güvenlik altyapımızı tercih eden Aero Dynamics ile güvenle uçuyoruz.' }
];

const mockTestimonials = [
  { name: 'Ahmet Yılmaz', role: 'CTO', company: 'TeknoHolding', quoteTr: 'Softium ile çalışmak vizyonumuzu genişletti. Teknolojik altyapımız hiç olmadığı kadar sağlam.', quoteEn: 'Working with Softium expanded our vision. Our technology infrastructure is more solid than ever.', color: '#135bec', isActive: true, sortOrder: 1 },
  { name: 'Selin Demir', role: 'Operasyon Müdürü', company: 'Global Logistic', quoteTr: 'Lojistik ağımızı Softium Neural Mesh sayesinde saniyeler içinde yönetebiliyoruz. Muazzam bir hız kazandık.', color: '#7c3aed', isActive: true, sortOrder: 2 }
];

const mockStats = [
  { key: 'grid_projects', value: '150+', labelTr: 'Tamamlanan Proje', labelEn: 'Completed Projects', icon: 'task_alt', isActive: true, sortOrder: 1 },
  { key: 'grid_clients', value: '40+', labelTr: 'Mutlu Müşteri', labelEn: 'Happy Clients', icon: 'sentiment_satisfied', isActive: true, sortOrder: 2 },
  { key: 'grid_engineers', value: '25+', labelTr: 'Uzman Mühendis', labelEn: 'Expert Engineers', icon: 'engineering', isActive: true, sortOrder: 3 },
  { key: 'grid_uptime', value: '%99.9', labelTr: 'Çalışma Süresi', labelEn: 'Uptime', icon: 'timer', isActive: true, sortOrder: 4 }
];

async function seed() {
  console.log('--- SEEDING STARTED (FETCH API) ---');
  
  try {
    // Projects
    for (const proj of mockProjects) {
       const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj)
      });
      console.log(`Project add status: ${res.status} - ${proj.titleTr}`);
    }

    // Blogs
    for (const blog of mockBlogs) {
       const res = await fetch(`${API_URL}/blogposts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog)
      });
      console.log(`Blog add status: ${res.status} - ${blog.titleTr}`);
    }

    // References
    for (const ref of mockReferences) {
       const res = await fetch(`${API_URL}/references`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ref)
      });
      console.log(`Reference add status: ${res.status} - ${ref.name}`);
    }

    // Testimonials
    for (const test of mockTestimonials) {
       const res = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test)
      });
      console.log(`Testimonial add status: ${res.status} - ${test.name}`);
    }

    // Stats
    for (const stat of mockStats) {
       const res = await fetch(`${API_URL}/statistics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stat)
      });
      console.log(`Stat add status: ${res.status} - ${stat.key}`);
    }

    console.log('--- SEEDING COMPLETED SUCCESSFULLY ---');
  } catch (error) {
    console.error('Seed error:', error.message);
  }
}

seed();
