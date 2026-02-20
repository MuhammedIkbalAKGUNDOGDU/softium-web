'use client';
import styles from '../admin.module.css';

export default function SettingsAdmin() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Genel Ayarlar</h1>
        <button className={styles.button}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>save</span>
          Değişiklikleri Kaydet
        </button>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formCardTitle}>İletişim Bilgileri</div>
        
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-posta Adresi</label>
            <input type="email" className={styles.input} defaultValue="hello@softium.tech" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Telefon Numarası</label>
            <input type="tel" className={styles.input} defaultValue="+44 20 1234 5678" />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Şirket Adresi (Ofis)</label>
          <input type="text" className={styles.input} defaultValue="One Canada Square, Canary Wharf, London, UK" />
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formCardTitle}>Sosyal Medya Linkleri</div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>LinkedIn Profil URL</label>
          <input type="text" className={styles.input} defaultValue="https://linkedin.com/company/softiumtech" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>X (Twitter) Profil URL</label>
          <input type="text" className={styles.input} defaultValue="https://twitter.com/softiumtech" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>GitHub Profil URL</label>
          <input type="text" className={styles.input} defaultValue="https://github.com/softiumtech" />
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formCardTitle}>Arama Motoru (SEO) Genel Ayarları</div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Varsayılan Site Başlığı (Title)</label>
          <input type="text" className={styles.input} defaultValue="Softium Technologies | Engineering the Future of Intelligence" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Site Açıklaması (Meta Description)</label>
          <textarea 
            className={styles.input} 
            rows={3} 
            defaultValue="Softium Technologies delivers enterprise-grade software solutions for AI, cloud infrastructure, SaaS, and digital transformation." 
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>
    </>
  );
}
