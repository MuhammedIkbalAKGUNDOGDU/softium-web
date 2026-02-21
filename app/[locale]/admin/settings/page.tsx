'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    Email: '',
    Phone: '',
    Address: '',
    LinkedIn: '',
    Twitter: '',
    GitHub: '',
    Instagram: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:5262/api/sitesettings');
      if (res.ok) {
        const data = await res.json();
        
        const newSettings = { ...settings };
        data.forEach((item: any) => {
          if (newSettings.hasOwnProperty(item.settingKey)) {
            (newSettings as any)[item.settingKey] = item.settingValue;
          }
        });
        
        setSettings(newSettings);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('http://localhost:5262/api/sitesettings/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        alert('Ayarlar başarıyla kaydedildi!');
      }
    } catch (e) {
      console.error(e);
      alert('Ayarlar kaydedilemedi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Yükleniyor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Genel Bilgiler</h1>
        <button className={styles.button} onClick={handleSave} disabled={saving}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>save</span>
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formCardTitle}>İletişim Bilgileri</div>
        
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-posta Adresi</label>
            <input 
              type="email" 
              className={styles.input} 
              value={settings.Email} 
              onChange={e => setSettings({...settings, Email: e.target.value})}
              placeholder="Boş bırakılırsa sitede gizlenir"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Telefon Numarası</label>
            <input 
              type="tel" 
              className={styles.input} 
              value={settings.Phone}
              onChange={e => setSettings({...settings, Phone: e.target.value})}
              placeholder="Boş bırakılırsa sitede gizlenir"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Şirket Adresi (Ofis)</label>
          <input 
            type="text" 
            className={styles.input} 
            value={settings.Address}
            onChange={e => setSettings({...settings, Address: e.target.value})}
            placeholder="Boş bırakılırsa sitede gizlenir"
          />
        </div>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formCardTitle}>Sosyal Medya Linkleri</div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>LinkedIn Profil URL</label>
          <input 
            type="text" 
            className={styles.input} 
            value={settings.LinkedIn}
            onChange={e => setSettings({...settings, LinkedIn: e.target.value})}
            placeholder="Link yoksa ikonu sitede görünmez"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>X (Twitter) Profil URL</label>
          <input 
            type="text" 
            className={styles.input} 
            value={settings.Twitter}
            onChange={e => setSettings({...settings, Twitter: e.target.value})}
            placeholder="Link yoksa ikonu sitede görünmez"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>GitHub Profil URL</label>
          <input 
            type="text" 
            className={styles.input} 
            value={settings.GitHub}
            onChange={e => setSettings({...settings, GitHub: e.target.value})}
            placeholder="Link yoksa ikonu sitede görünmez"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Instagram Profil URL</label>
          <input 
            type="text" 
            className={styles.input} 
            value={settings.Instagram}
            onChange={e => setSettings({...settings, Instagram: e.target.value})}
            placeholder="Link yoksa ikonu sitede görünmez"
          />
        </div>
      </div>
    </>
  );
}
