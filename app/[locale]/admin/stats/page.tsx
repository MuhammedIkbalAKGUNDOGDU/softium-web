'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Statistic {
  id: string;
  key: string;
  value: string;
  labelTr: string;
  labelEn?: string;
  labelDe?: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

export default function StatsAdmin() {
  const [items, setItems] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Statistic>>({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5262/api/statistics');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const url = formData.id 
        ? `http://localhost:5262/api/statistics/${formData.id}`
        : 'http://localhost:5262/api/statistics';
      const method = formData.id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Kaydedildi!');
        setShowModal(false);
        fetchItems();
      }
    } catch (e) {
      console.error(e);
      alert('Hata oluştu.');
    }
  };

  const openNew = () => {
    setFormData({ key: '', value: '', labelTr: '', icon: 'folder_open', isActive: true, sortOrder: 0 });
    setShowModal(true);
  };

  const openEdit = (s: Statistic) => {
    setFormData(s);
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>İstatistikler & Rakamlar</h1>
        <button className={styles.button} onClick={openNew}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          Yeni Ekle
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '2rem' }}>Yükleniyor...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Kayıt bulunamadı.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Anahtar (Key)</th>
                <th>Değer</th>
                <th>Etiket (TR)</th>
                <th>Sıra</th>
                <th>Durum</th>
                <th style={{ textAlign: 'right' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {items.map(s => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{s.key}</td>
                  <td style={{ fontWeight: 600 }}>{s.value}</td>
                  <td>{s.labelTr}</td>
                  <td>{s.sortOrder}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${s.isActive ? styles.statusSuccess : styles.statusDanger}`}>
                      {s.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className={styles.actionButtons} style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                      <button className={styles.iconButton} style={{ color: '#3b82f6' }} onClick={() => openEdit(s)}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#eff6ff', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#1e40af' }}>
          <strong>İpucu:</strong> Sistemdeki mevcut alanları değiştirmek için şu anahtarları (Key) kullanın: 
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
              <li><code>experience_value</code>: "10+" yazan büyük rozet</li>
              <li><code>iso_title</code>: ISO 27001 yazan rozet</li>
              <li><code>grid_projects</code>, <code>grid_clients</code>, <code>grid_engineers</code>, <code>grid_uptime</code>: Alt kısımdaki 4'lü kartlar</li>
          </ul>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>{formData.id ? 'Düzenle' : 'Yeni İstatistik'}</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Anahtar (Key)</label>
                <input type="text" className={styles.input} value={formData.key || ''} onChange={e => setFormData({...formData, key: e.target.value})} placeholder="Örn: grid_projects" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Değer (Value)</label>
                <input type="text" className={styles.input} value={formData.value || ''} onChange={e => setFormData({...formData, value: e.target.value})} placeholder="Örn: 500+" />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Etiket (TR)</label>
              <input type="text" className={styles.input} value={formData.labelTr || ''} onChange={e => setFormData({...formData, labelTr: e.target.value})} />
            </div>

            <div className={styles.formGrid}>
               <div className={styles.formGroup}>
                <label className={styles.label}>Etiket (EN)</label>
                <input type="text" className={styles.input} value={formData.labelEn || ''} onChange={e => setFormData({...formData, labelEn: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>İkon (Material Symbol)</label>
                <input type="text" className={styles.input} value={formData.icon || 'folder_open'} onChange={e => setFormData({...formData, icon: e.target.value})} />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Sıralama Göstergesi</label>
                <input type="number" className={styles.input} value={formData.sortOrder || 0} onChange={e => setFormData({...formData, sortOrder: parseInt(e.target.value)})} />
              </div>
              <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                <label className={styles.label} style={{ margin: 0 }}>Sitede Görünsün</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className={styles.buttonOutline} onClick={() => setShowModal(false)} style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>İptal</button>
              <button className={styles.button} onClick={handleSave}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
