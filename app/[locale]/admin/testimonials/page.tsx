'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quoteTr: string;
  quoteEn?: string;
  quoteDe?: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
}

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '', role: '', company: '', quoteTr: '', quoteEn: '', quoteDe: '', color: '#135bec', isActive: true, sortOrder: 0
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5262/api/testimonials');
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
        ? `http://localhost:5262/api/testimonials/${formData.id}`
        : 'http://localhost:5262/api/testimonials';
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

  const handleDelete = async (id: string) => {
    if (!confirm('Emin misiniz?')) return;
    try {
      const res = await fetch(`http://localhost:5262/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (e) {
      console.error(e);
    }
  };

  const openNew = () => {
    setFormData({ name: '', role: '', company: '', quoteTr: '', quoteEn: '', quoteDe: '', color: '#135bec', isActive: true, sortOrder: 0 });
    setShowModal(true);
  };

  const openEdit = (t: Testimonial) => {
    setFormData(t);
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Müşteri Yorumları</h1>
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
                <th>Yorum Sahibi</th>
                <th>Şirket & Rol</th>
                <th>Renk</th>
                <th>Sıra</th>
                <th>Durum</th>
                <th style={{ textAlign: 'right' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.name}</td>
                  <td>{t.company} - {t.role}</td>
                  <td>
                    <div style={{ width: '20px', height: '20px', background: t.color, borderRadius: '4px' }} />
                  </td>
                  <td>{t.sortOrder}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${t.isActive ? styles.statusSuccess : styles.statusDanger}`}>
                      {t.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className={styles.actionButtons} style={{ display: 'flex', gap: '0.25rem', justifyContent: 'flex-end' }}>
                      <button className={styles.iconButton} style={{ color: '#3b82f6' }} onClick={() => openEdit(t)}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className={styles.iconButton} style={{ color: '#ef4444' }} onClick={() => handleDelete(t.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>{formData.id ? 'Düzenle' : 'Yeni Yorum'}</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Ad Soyad</label>
                <input type="text" className={styles.input} value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Rol (Örn: CEO)</label>
                <input type="text" className={styles.input} value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
            </div>

            <div className={styles.formGrid}>
               <div className={styles.formGroup}>
                <label className={styles.label}>Şirket Adı</label>
                <input type="text" className={styles.input} value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Renk Kodu (HEX)</label>
                <input type="color" className={styles.input} style={{ height: '42px', padding: '0.2rem' }} value={formData.color || '#135bec'} onChange={e => setFormData({...formData, color: e.target.value})} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Yorum (TR)</label>
              <textarea className={styles.input} rows={3} value={formData.quoteTr || ''} onChange={e => setFormData({...formData, quoteTr: e.target.value})} />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Yorum (EN)</label>
              <textarea className={styles.input} rows={2} value={formData.quoteEn || ''} onChange={e => setFormData({...formData, quoteEn: e.target.value})} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Yorum (DE)</label>
              <textarea className={styles.input} rows={2} value={formData.quoteDe || ''} onChange={e => setFormData({...formData, quoteDe: e.target.value})} />
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
