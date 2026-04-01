const API_URL = 'http://localhost:5262/api';

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
    detailedContentTr: '<h2>Yapay Zekada Yeni Dönem</h2><p>Neural Mesh, karmaşık veri setlerini gerçek zamanlı olarak işlemek için tasarlanmış hibrit bir yapıdır.</p>',
    mainImage: '/uploads/dashboard-mockup.png',
    icon: 'neurology',
    isDarkTheme: true,
    layout: 'standard',
    isPublished: true,
    sortOrder: 1,
    features: [
      { titleTr: 'Hızlı İşleme', titleEn: 'Fast Processing', icon: 'bolt', sortOrder: 1 },
      { titleTr: 'Veri Güvenliği', titleEn: 'Data Security', icon: 'security', sortOrder: 2 }
    ]
  },
  {
    slug: 'cloud-quant-os',
    titleTr: 'Cloud Quant OS',
    titleEn: 'Cloud Quant OS',
    overlineTr: 'Bulut İşletim Sistemi',
    shortDescriptionTr: 'Kuantum bilişim prensipleriyle optimize edilmiş, dağıtık bulut yönetim sistemi.',
    detailedContentTr: '<h2>Bulutun Ötesi</h2><p>Quant OS, kaynak yönetimini akıllı algoritmalarla yaparak %40 enerji tasarrufu sağlar.</p>',
    mainImage: '/uploads/hero-sphere.png',
    icon: 'cloud_sync',
    isDarkTheme: false,
    layout: 'split',
    isPublished: true,
    sortOrder: 2,
    features: [
      { titleTr: 'Otomatik Ölçekleme', titleEn: 'Auto Scaling', icon: 'dynamic_feed', sortOrder: 1 }
    ]
  },
  {
    slug: 'cyber-vault-enterprise',
    titleTr: 'Cyber Vault Enterprise',
    titleEn: 'Cyber Vault Enterprise',
    overlineTr: 'Siber Güvenlik',
    shortDescriptionTr: 'Kurumsal veriler için sıfır güven (Zero Trust) mimarili koruma kalkanı.',
    detailedContentTr: '<h3>Sınır Tanımayan Güvenlik</h3><p>Verileriniz her yönden gelen tehditlere karşı kuantum sonrası şifreleme ile korunur.</p>',
    mainImage: '/uploads/mobile-mockup.png',
    icon: 'shield_lock',
    isDarkTheme: true,
    layout: 'standard',
    isPublished: true,
    sortOrder: 3,
    features: [
      { titleTr: 'Uçtan Uca Şifreleme', titleEn: 'E2E Encryption', icon: 'lock', sortOrder: 1 }
    ]
  }
];

const mockReferences = [
  "TeknoHolding", "Global Logistic", "Aero Dynamics", "SoftBank TR", "Nova Systems",
  "Zenith Corp", "Alpha Solutions", "Infinity Tech", "Quantum Labs", "Cyber Shield",
  "Data Flow", "Blue Ocean", "Cloud Peak", "Silver Lining", "Iron Guard",
  "Future Vision", "Next Gen", "Smart Bridge", "Echo Tech", "Prime Digital",
  "Elite Soft", "Turbo Code", "Mega Net", "Ultra Secure", "Titan Group",
  "Vanguard", "Summit AI", "Solaris", "Luna Tech", "Mars Terra"
].map((name, index) => ({
  name,
  industry: ["Yazılım", "Finans", "E-Ticaret", "Lojistik", "Havacılık"][index % 5],
  icon: ["code", "account_balance", "shopping_cart", "local_shipping", "flight"][index % 5],
  logoUrl: null,
  websiteUrl: `https://${name.toLowerCase().replace(' ', '')}.com`,
  description: `${name} için geliştirilen özel yazılım çözümleri ile dijital dönüşüm başarıyla tamamlandı.`,
  isActive: true
}));

async function seed() {
  console.log('--- MEGA SEEDING STARTED ---');
  try {
    // Delete existing references to prevent duplicates if needed
    // (Skipping delete for safety, normally we'd truncate)

    for (const proj of mockProjects) {
       await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj)
      });
      console.log(`Project: ${proj.titleTr}`);
    }

    for (const ref of mockReferences) {
       await fetch(`${API_URL}/references`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ref)
      });
      console.log(`Reference ${ref.name} added.`);
    }

    console.log('--- SEEDING COMPLETED ---');
  } catch (error) {
    console.error('Seed error:', error.message);
  }
}

seed();
