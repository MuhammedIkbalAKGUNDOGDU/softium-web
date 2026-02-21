'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Reference {
  id: string;
  name: string;
  industry: string;
  icon?: string;
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export default function ReferencesAdmin() {
  const [references, setReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    icon: '',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    isActive: true
  });

  const BASE_URL = 'http://localhost:5262/api/references';

  useEffect(() => {
    fetchReferences();
  }, []);

  const fetchReferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setReferences(data);
      }
    } catch (error) {
      console.error('API baðlantý hatası. Backend çalışıyor mu?', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', industry: '', icon: '', logoUrl: '', websiteUrl: '', description: '', isActive: true });
    setIsModalOpen(true);
  };

  const openEditModal = (ref: Reference) => {
    setEditingId(ref.id);
    setFormData({
      name: ref.name,
      industry: ref.industry,
      icon: ref.icon || '',
      logoUrl: ref.logoUrl || '',
      websiteUrl: ref.websiteUrl || '',
      description: ref.description || '',
      isActive: ref.isActive
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    // Yükleniyor durumunu göstermek isterseniz state ekleyebilirsiniz
    // setIsUploading(true);
    
    const formDataObj = new FormData();
    formDataObj.append('file', file);

    try {
      const UPLOAD_URL = 'http://localhost:5262/api/uploads';
      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formDataObj
      });

      if (response.ok) {
        const data = await response.json();
        const fullUrl = `http://localhost:5262${data.url}`;
        setFormData(prev => ({ ...prev, logoUrl: fullUrl }));
        alert('Logo başarıyla yüklendi!');
      } else {
        alert('Logo yüklenemedi.');
      }
    } catch (error) {
      console.error(error);
      alert('Yükleme hatası!');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;
      const method = editingId ? 'PUT' : 'POST';
      
      const payload = editingId ? { id: editingId, ...formData } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchReferences();
      } else {
        alert('Bir hata oluştu.');
      }
    } catch (error) {
      console.error(error);
      alert('Network hatası!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu referansı silmek istediğinize emin misiniz?')) return;
    
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchReferences();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Referans Yönetimi</h1>
        <button className={styles.button} onClick={openAddModal}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          Yeni Referans Ekle
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Firma Adı</th>
              <th>Sektör</th>
              <th>Website</th>
              <th>Durum</th>
              <th style={{ textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} style={{textAlign: 'center', padding: '2rem'}}>Yükleniyor...</td></tr>
            ) : references.length === 0 ? (
              <tr><td colSpan={5} style={{textAlign: 'center', padding: '2rem'}}>Henüz referans eklenmemiş.</td></tr>
            ) : (
              references.map((ref) => (
                <tr key={ref.id}>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {ref.icon && <span className="material-symbols-outlined" style={{color: '#64748b', fontSize: '18px'}}>{ref.icon}</span>}
                      {ref.name}
                    </div>
                  </td>
                  <td>{ref.industry}</td>
                  <td style={{ color: '#3b82f6' }}>
                    {ref.websiteUrl ? (
                      <a href={ref.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {ref.websiteUrl.replace(/https?:\/\//, '')}
                      </a>
                    ) : '-'}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${ref.isActive ? styles.statusSuccess : styles.statusWarning}`}>
                      {ref.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className={styles.actionButton} title="Düzenle" onClick={() => openEditModal(ref)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                    </button>
                    <button className={`${styles.actionButton} ${styles.danger}`} title="Sil" onClick={() => handleDelete(ref.id)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Basic Modal Implementation */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className={styles.formCard} style={{ width: '100%', maxWidth: '600px', margin: '0 1rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className={styles.formCardTitle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {editingId ? 'Referans Düzenle' : 'Yeni Referans Ekle'}
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Firma Adı *</label>
                  <input required type="text" className={styles.input} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Sektör *</label>
                  <input required type="text" className={styles.input} value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Material Icon Kodu (Opsiyonel)</label>
                  <input type="text" className={styles.input} placeholder="ÖRN: account_balance" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Logo Yükle veya Adres (URL) Gir</label>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input type="file" accept="image/*" className={styles.input} style={{ padding: '0.4rem', flex: 1 }} onChange={handleFileUpload} />
                  </div>
                  <input type="text" className={styles.input} placeholder="Veya manuel resim linki yapıştırın..." value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Website URL (Opsiyonel)</label>
                <input type="url" className={styles.input} placeholder="https://..." value={formData.websiteUrl} onChange={e => setFormData({...formData, websiteUrl: e.target.value})} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Özel Açıklama (Opsiyonel)</label>
                <textarea className={styles.input} rows={3} placeholder="Değerli iş ortaklarımızdan biri olan ... ile birlikte sektörde yenilikçi adımlar atıyoruz." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className={styles.formGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} style={{ width: '1.2rem', height: '1.2rem'}} />
                <label htmlFor="isActive" className={styles.label} style={{ margin: 0, cursor: 'pointer' }}>Sitede Göster (Aktif)</label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className={styles.buttonOutline} onClick={() => setIsModalOpen(false)}>İptal</button>
                <button type="submit" className={styles.button} disabled={isSubmitting}>
                  {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
