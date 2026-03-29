'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface ProjectFeature {
  id?: string;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  icon?: string;
  sortOrder: number;
}

interface Project {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  titleDe: string;
  overlineTr: string;
  overlineEn: string;
  overlineDe: string;
  shortDescriptionTr: string;
  shortDescriptionEn: string;
  shortDescriptionDe: string;
  detailedContentTr: string;
  detailedContentEn: string;
  detailedContentDe: string;
  mainImage: string;
  hoverImage?: string;
  icon?: string;
  isDarkTheme: boolean;
  isPublished: boolean;
  sortOrder: number;
  demoUrl?: string;
  documentUrl?: string;
  technicalSpecsTr?: string;
  technicalSpecsEn?: string;
  technicalSpecsDe?: string;
  features: ProjectFeature[];
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'tr' | 'en' | 'de'>('tr');

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    slug: '',
    titleTr: '', titleEn: '', titleDe: '',
    overlineTr: '', overlineEn: '', overlineDe: '',
    shortDescriptionTr: '', shortDescriptionEn: '', shortDescriptionDe: '',
    detailedContentTr: '', detailedContentEn: '', detailedContentDe: '',
    mainImage: '', hoverImage: '', icon: 'hub',
    isDarkTheme: false, isPublished: true, sortOrder: 0,
    demoUrl: '', documentUrl: '',
    technicalSpecsTr: '', technicalSpecsEn: '', technicalSpecsDe: '',
    features: [] as ProjectFeature[]
  });

  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/projects`;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      slug: '',
      titleTr: '', titleEn: '', titleDe: '',
      overlineTr: '', overlineEn: '', overlineDe: '',
      shortDescriptionTr: '', shortDescriptionEn: '', shortDescriptionDe: '',
      detailedContentTr: '', detailedContentEn: '', detailedContentDe: '',
      mainImage: '', hoverImage: '', icon: 'hub',
      isDarkTheme: false, isPublished: true, sortOrder: projects.length,
      demoUrl: '', documentUrl: '',
      technicalSpecsTr: '', technicalSpecsEn: '', technicalSpecsDe: '',
      features: []
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingId(proj.id);
    setFormData({
      ...proj,
      hoverImage: proj.hoverImage || '',
      icon: proj.icon || 'hub',
      demoUrl: proj.demoUrl || '',
      documentUrl: proj.documentUrl || '',
      technicalSpecsTr: proj.technicalSpecsTr || '',
      technicalSpecsEn: proj.technicalSpecsEn || '',
      technicalSpecsDe: proj.technicalSpecsDe || '',
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'mainImage' | 'hoverImage') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploads`, {
        method: 'POST',
        body: uploadFormData
      });
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, [field]: `${process.env.NEXT_PUBLIC_API_URL}${data.url}` }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const addFeature = () => {
    const newFeature: ProjectFeature = {
      titleTr: '', titleEn: '', titleDe: '',
      icon: 'check_circle',
      sortOrder: formData.features.length
    };
    setFormData(prev => ({ ...prev, features: [...prev.features, newFeature] }));
  };

  const updateFeature = (index: number, field: keyof ProjectFeature, value: any) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...formData, id: editingId } : formData)
      });
      if (response.ok) {
        setIsModalOpen(false);
        fetchProjects();
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediðinize emin misiniz?')) return;
    try {
      await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Proje (Ürün) Yönetimi</h1>
        <button className={styles.button} onClick={openAddModal}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          Yeni Teknoloji/Proje Ekle
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Proje / Teknoloji</th>
              <th>Kategori (Overline)</th>
              <th>Tema</th>
              <th>Durum</th>
              <th style={{ textAlign: 'right' }}>Ýþlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Yükleniyor...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Henüz teknoloji eklenmemiþ.</td></tr>
            ) : (
              projects.map((proj) => (
                <tr key={proj.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>{proj.icon || 'hub'}</span>
                      <div>
                        <div>{proj.titleTr}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>/{proj.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>{proj.overlineTr}</td>
                  <td>
                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: proj.isDarkTheme ? '#1e293b' : '#f1f5f9', color: proj.isDarkTheme ? 'white' : '#1e293b', border: '1px solid #e2e8f0' }}>
                      {proj.isDarkTheme ? 'Karanlýk' : 'Aydýnlýk'}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${proj.isPublished ? styles.statusSuccess : styles.statusWarning}`}>
                      {proj.isPublished ? 'Yayýnda' : 'Taslak'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className={styles.actionButton} onClick={() => openEditModal(proj)}><span className="material-symbols-outlined">edit</span></button>
                    <button className={`${styles.actionButton} ${styles.danger}`} onClick={() => handleDelete(proj.id)}><span className="material-symbols-outlined">delete</span></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className={styles.formCard} style={{ width: '95%', maxWidth: '1000px', maxHeight: '95vh', overflowY: 'auto', padding: '2.5rem' }}>
            <div className={styles.formCardTitle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <span className="material-symbols-outlined" style={{ fontSize: '32px', color: 'var(--primary)' }}>settings_suggest</span>
                 <h2 style={{ margin: 0 }}>{editingId ? 'Teknoloji Düzenle' : 'Yeni Teknoloji Kaydı'}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>close</span>
              </button>
            </div>

            {/* Language Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              {(['tr', 'en', 'de'] as const).map(lang => (
                <button 
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  style={{ 
                    padding: '0.75rem 1.5rem', borderRadius: '8px 8px 0 0', border: 'none', cursor: 'pointer', fontWeight: 600,
                    backgroundColor: activeTab === lang ? 'var(--primary)' : 'transparent',
                    color: activeTab === lang ? 'white' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  {lang.toUpperCase()} Ýçerik
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid} style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Left Column: Multilingual Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Baþlýk ({activeTab.toUpperCase()}) *</label>
                    <input required type="text" className={styles.input} 
                      value={activeTab === 'tr' ? formData.titleTr : activeTab === 'en' ? formData.titleEn : formData.titleDe} 
                      onChange={e => setFormData({...formData, [`title${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]: e.target.value})} 
                      placeholder="Örn: Softium Core 2.0"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Kategori / Overline ({activeTab.toUpperCase()}) *</label>
                    <input required type="text" className={styles.input} 
                      value={activeTab === 'tr' ? formData.overlineTr : activeTab === 'en' ? formData.overlineEn : formData.overlineDe} 
                      onChange={e => setFormData({...formData, [`overline${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]: e.target.value})} 
                      placeholder="Örn: Core Infrastructure"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Kýsa Açýklama (Liste Kartý Ýçin - {activeTab.toUpperCase()}) *</label>
                    <textarea required className={styles.input} rows={3}
                      value={activeTab === 'tr' ? formData.shortDescriptionTr : activeTab === 'en' ? formData.shortDescriptionEn : formData.shortDescriptionDe} 
                      onChange={e => setFormData({...formData, [`shortDescription${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]: e.target.value})} 
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Detaylı Ýçerik (HTML/Zengin Metin - {activeTab.toUpperCase()}) *</label>
                    <textarea required className={styles.input} rows={8}
                      value={activeTab === 'tr' ? formData.detailedContentTr : activeTab === 'en' ? formData.detailedContentEn : formData.detailedContentDe} 
                      onChange={e => setFormData({...formData, [`detailedContent${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]: e.target.value})} 
                      placeholder="Projenin tüm detaylarını buraya yazabilirsiniz..."
                    />
                  </div>
                </div>

                {/* Right Column: Configuration & Media */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>URL Slug (Benzersiz) *</label>
                    <input required type="text" className={styles.input} value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="softium-core-v2" />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Ana Görsel (Ürün Resmi) *</label>
                    <input type="file" className={styles.input} onChange={e => handleFileUpload(e, 'mainImage')} />
                    {formData.mainImage && <img src={formData.mainImage} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginTop: '0.5rem' }} />}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Material Icon Kodu</label>
                    <input type="text" className={styles.input} value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Sýralama</label>
                      <input type="number" className={styles.input} value={formData.sortOrder} onChange={e => setFormData({...formData, sortOrder: parseInt(e.target.value)})} />
                    </div>
                    <div className={styles.formGroup}>
                       <label className={styles.label}>Yayın Durumu</label>
                       <select className={styles.input} value={formData.isPublished ? 'true' : 'false'} onChange={e => setFormData({...formData, isPublished: e.target.value === 'true' })}>
                          <option value="true">Yayýnda</option>
                          <option value="false">Taslak</option>
                       </select>
                    </div>
                  </div>

                  <div className={styles.formGroup} style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                      <input type="checkbox" checked={formData.isDarkTheme} onChange={e => setFormData({...formData, isDarkTheme: e.target.checked})} style={{ width: '1.25rem', height: '1.25rem' }} />
                      Karanlýk Tema Kullan (Flow Style)
                    </label>
                  </div>
                </div>
              </div>

              {/* Features Builder */}
              <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#fdfdfd', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                   <h3 style={{ margin: 0 }}>Ürün Özellik Listesi (Features)</h3>
                   <button type="button" onClick={addFeature} className={styles.button} style={{ padding: '0.5rem 1rem' }}>
                      <span className="material-symbols-outlined">add_circle</span> Özellik Ekle
                   </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {formData.features.map((feat, index) => (
                    <div key={index} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'center', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <span className="material-symbols-outlined" style={{ color: '#94a3b8' }}>drag_indicator</span>
                      <input type="text" className={styles.input} placeholder="TR Başlık" value={feat.titleTr} onChange={e => updateFeature(index, 'titleTr', e.target.value)} />
                      <input type="text" className={styles.input} placeholder="EN Title" value={feat.titleEn} onChange={e => updateFeature(index, 'titleEn', e.target.value)} />
                      <input type="text" className={styles.input} placeholder="DE Titel" value={feat.titleDe} onChange={e => updateFeature(index, 'titleDe', e.target.value)} />
                      <button type="button" onClick={() => removeFeature(index)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '3rem' }}>
                <button type="button" className={styles.buttonOutline} onClick={() => setIsModalOpen(false)}>Ýptal</button>
                <button type="submit" className={styles.button} disabled={isSubmitting} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                  {isSubmitting ? 'Veriler Senkronize Ediliyor...' : 'Teknolojiyi Kaydet ve Yayýnla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
