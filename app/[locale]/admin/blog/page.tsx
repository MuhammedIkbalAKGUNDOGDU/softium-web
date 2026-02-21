'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import styles from '../admin.module.css';

// React-Quill requires dynamic import to prevent "window is not defined" error in Next.js SSR
// Wrapped with a forwardedRef to allow accessing the Quill editor instance
const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    return function ForwardedQuill({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  }, 
  { 
    ssr: false, 
    loading: () => <div style={{height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc'}}>Yükleniyor...</div> 
  }
);
import 'react-quill-new/dist/quill.snow.css';

interface BlogPost {
  id: string;
  slug: string;
  titleTr: string;
  titleEn?: string;
  titleDe?: string;
  contentTr: string;
  contentEn?: string;
  contentDe?: string;
  excerptTr?: string;
  excerptEn?: string;
  excerptDe?: string;
  coverImage?: string;
  readTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  authorName?: string;
  authorRole?: string;
  category?: string;
  publishedAt?: string;
  createdAt: string;
}

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tr' | 'en' | 'de'>('tr');
  const quillRefs = {
    tr: useRef<any>(null),
    en: useRef<any>(null),
    de: useRef<any>(null)
  };

  const defaultFormState = {
    slug: '',
    titleTr: '', titleEn: '', titleDe: '',
    contentTr: '', contentEn: '', contentDe: '',
    excerptTr: '', excerptEn: '', excerptDe: '',
    coverImage: '',
    readTime: 5,
    isPublished: false,
    isFeatured: false,
    authorName: '', authorRole: '', category: ''
  };

  const [formData, setFormData] = useState(defaultFormState);

  const BASE_URL = 'http://localhost:5262/api/blogposts';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(defaultFormState);
    setActiveTab('tr');
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingId(blog.id);
    setFormData({
      slug: blog.slug || '',
      titleTr: blog.titleTr || '', titleEn: blog.titleEn || '', titleDe: blog.titleDe || '',
      contentTr: blog.contentTr || '', contentEn: blog.contentEn || '', contentDe: blog.contentDe || '',
      excerptTr: blog.excerptTr || '', excerptEn: blog.excerptEn || '', excerptDe: blog.excerptDe || '',
      coverImage: blog.coverImage || '',
      readTime: blog.readTime || 5,
      isPublished: blog.isPublished || false,
      isFeatured: blog.isFeatured || false,
      authorName: blog.authorName || '', authorRole: blog.authorRole || '', category: blog.category || ''
    });
    setActiveTab('tr');
    setIsModalOpen(true);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Basligi girdiginde slug'i otomatik olusturur (Sadece yeni kayıtlarda).
  const handleTitleChange = (val: string, lang: 'tr'|'en'|'de') => {
    setFormData(prev => {
      const newData = { ...prev, [`title${lang.charAt(0).toUpperCase() + lang.slice(1)}`]: val };
      if (!editingId && lang === 'tr' && !prev.slug) {
        newData.slug = generateSlug(val);
      }
      return newData;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formDataObj = new FormData();
    formDataObj.append('file', file);
    try {
      const res = await fetch('http://localhost:5262/api/uploads', { method: 'POST', body: formDataObj });
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, coverImage: `http://localhost:5262${data.url}` }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleTr || !formData.contentTr) {
      alert("Türkçe başlık ve içerik alanları zorunludur.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const url = editingId ? `${BASE_URL}/${editingId}` : BASE_URL;
      const method = editingId ? 'PUT' : 'POST';
      const payload = editingId ? { id: editingId, ...formData } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        const err = await res.json();
        alert(err.message || 'Bir hata oluştu.');
      }
    } catch (e) {
      console.error(e);
      alert('Network hatası!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yazıyı silmek istiyor musunuz?')) return;
    try {
      await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const imageHandler = (langType: 'tr' | 'en' | 'de') => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    
    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;
      
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      try {
        const res = await fetch('http://localhost:5262/api/uploads', { method: 'POST', body: uploadData });
        if (res.ok) {
          const data = await res.json();
          const imageUrl = `http://localhost:5262${data.url}`;
          
          const quill = quillRefs[langType].current?.getEditor();
          if (quill) {
            const range = quill.getSelection() || { index: quill.getLength() };
            quill.insertEmbed(range.index, 'image', imageUrl);
            // İmleci resmin sonrasına kaydır
            quill.setSelection(range.index + 1);
          }
        }
      } catch (e) {
        console.error('Image upload failed:', e);
        alert('Sunucuya resim yüklenirken hata oluştu.');
      }
    };
  };

  // React-Quill Zengin Metin ayarları (Bold, Link, Foto, Video, Kod Bloku vs)
  // Dil sekmesine gore ayri handler uretmek icin fonksiyon kullaniyoruz
  const getModules = (lang: 'tr' | 'en' | 'de') => ({
    toolbar: {
      container: [
        [{ 'header': [2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: () => imageHandler(lang)
      }
    }
  });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blog Yönetimi</h1>
        <button className={styles.button} onClick={openAddModal}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          Yeni Yazı Ekle
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Kategori / Yazar</th>
              <th>Tarih</th>
              <th>Diller</th>
              <th>Durum</th>
              <th style={{ textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
               <tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Yükleniyor...</td></tr>
            ) : blogs.length === 0 ? (
               <tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Henüz blog yazısı eklenmemiş.</td></tr>
            ) : (
               blogs.map((blog) => (
                <tr key={blog.id}>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {blog.isFeatured && <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#eab308' }} title="Öne Çıkarılan Blog">star</span>}
                      {blog.titleTr}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{blog.category || '-'}</div>
                    <div style={{ fontSize: '0.8rem' }}>{blog.authorName || '-'}</div>
                  </td>
                  <td>{formatDate(blog.isPublished ? blog.publishedAt! : blog.createdAt)}</td>
                  <td style={{ fontSize: '0.9rem' }}>
                    {blog.titleTr && '🇹🇷 '}
                    {blog.titleEn && '🇬🇧 '}
                    {blog.titleDe && '🇩🇪 '}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${blog.isPublished ? styles.statusSuccess : styles.statusWarning}`}>
                      {blog.isPublished ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className={styles.actionButton} title="Düzenle" onClick={() => openEditModal(blog)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                    </button>
                    <button className={`${styles.actionButton} ${styles.danger}`} title="Sil" onClick={() => handleDelete(blog.id)}>
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className={styles.formCard} style={{ width: '100%', maxWidth: '1000px', margin: '0 1rem', maxHeight: '95vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div className={styles.formCardTitle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1rem' }}>
              {editingId ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı Oluştur'}
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Ust Kisim: Kapak, Kategori, Yazar, Genel Ayarlar */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                 <div>
                   <label className={styles.label}>Özel Slug (Arama Motoru URL'i)</label>
                   <input type="text" className={styles.input} placeholder="ornegin-yapay-zeka-nedir" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
                   <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>Oto oluşturulur. Ancak isterseniz google'da nasıl görüneceğini manuel yazabilirsiniz.</p>
                 </div>
                 
                 <div>
                    <label className={styles.label}>Kapak Görseli</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <input type="file" accept="image/*" className={styles.input} style={{ padding: '0.3rem', flex: 1 }} onChange={handleFileUpload} />
                       <input type="text" className={styles.input} placeholder="Veya URL..." value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} />
                    </div>
                 </div>

                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className={styles.label}>Yazar Adı</label>
                      <input type="text" className={styles.input} value={formData.authorName} onChange={e => setFormData({...formData, authorName: e.target.value})} />
                    </div>
                    <div>
                      <label className={styles.label}>Kategori</label>
                      <input type="text" className={styles.input} placeholder="AI, SaaS vs." value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                    </div>
                 </div>

                 <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div>
                      <label className={styles.label}>Okuma Süresi (Dk)</label>
                      <input type="number" className={styles.input} style={{ width: '80px' }} value={formData.readTime} onChange={e => setFormData({...formData, readTime: parseInt(e.target.value)})} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.2rem' }}>
                      <input type="checkbox" id="isPublished" checked={formData.isPublished} onChange={e => setFormData({...formData, isPublished: e.target.checked})} style={{ width: '1.2rem', height: '1.2rem'}} />
                      <label htmlFor="isPublished" className={styles.label} style={{ margin: 0, cursor: 'pointer', color: formData.isPublished ? '#16a34a' : 'inherit' }}>
                        {formData.isPublished ? 'Yayında' : 'Taslak'}
                      </label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.2rem' }}>
                      <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} style={{ width: '1.2rem', height: '1.2rem'}} />
                      <label htmlFor="isFeatured" className={styles.label} style={{ margin: 0, cursor: 'pointer', color: formData.isFeatured ? '#eab308' : 'inherit' }}>
                        Ana Sayfada Öne Çıkar
                      </label>
                    </div>
                 </div>
              </div>

              {/* Dil Sekmeleri */}
              <div>
                 <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    <button type="button" onClick={() => setActiveTab('tr')} style={{ padding: '0.5rem 1rem', background: activeTab === 'tr' ? '#3b82f6' : 'transparent', color: activeTab === 'tr' ? 'white' : '#64748b', border: 'none', borderRadius: '4px 4px 0 0', cursor: 'pointer', fontWeight: 600 }}>🇹🇷 Türkçe</button>
                    <button type="button" onClick={() => setActiveTab('en')} style={{ padding: '0.5rem 1rem', background: activeTab === 'en' ? '#3b82f6' : 'transparent', color: activeTab === 'en' ? 'white' : '#64748b', border: 'none', borderRadius: '4px 4px 0 0', cursor: 'pointer', fontWeight: 600 }}>🇬🇧 English (Ops.)</button>
                    <button type="button" onClick={() => setActiveTab('de')} style={{ padding: '0.5rem 1rem', background: activeTab === 'de' ? '#3b82f6' : 'transparent', color: activeTab === 'de' ? 'white' : '#64748b', border: 'none', borderRadius: '4px 4px 0 0', cursor: 'pointer', fontWeight: 600 }}>🇩🇪 Deutsch (Ops.)</button>
                 </div>

                 {/*icerik Alanlari*/}
                 <div style={{ display: activeTab === 'tr' ? 'block' : 'none' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Başlık (TR) *</label>
                      <input type="text" className={styles.input} required={activeTab === 'tr'} value={formData.titleTr} onChange={e => handleTitleChange(e.target.value, 'tr')} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Kısa Özet (Ana sayfada görünen)</label>
                      <textarea className={styles.input} rows={2} value={formData.excerptTr} onChange={e => setFormData({...formData, excerptTr: e.target.value})} maxLength={150} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Detaylı İçerik (Zengin Metin / Resim/ Kod)</label>
                      <div style={{ backgroundColor: 'white' }}>
                        <ReactQuillWrapper forwardedRef={quillRefs.tr} theme="snow" value={formData.contentTr} onChange={(val: string) => setFormData({...formData, contentTr: val})} modules={getModules('tr')} style={{ height: '350px', marginBottom: '3rem' }} />
                      </div>
                    </div>
                 </div>

                 <div style={{ display: activeTab === 'en' ? 'block' : 'none' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Başlık (EN)</label>
                      <input type="text" className={styles.input} value={formData.titleEn} onChange={e => handleTitleChange(e.target.value, 'en')} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Kısa Özet</label>
                      <textarea className={styles.input} rows={2} value={formData.excerptEn} onChange={e => setFormData({...formData, excerptEn: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Detaylı İçerik</label>
                      <div style={{ backgroundColor: 'white' }}>
                        <ReactQuillWrapper forwardedRef={quillRefs.en} theme="snow" value={formData.contentEn} onChange={(val: string) => setFormData({...formData, contentEn: val})} modules={getModules('en')} style={{ height: '350px', marginBottom: '3rem' }} />
                      </div>
                    </div>
                 </div>

                 <div style={{ display: activeTab === 'de' ? 'block' : 'none' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Başlık (DE)</label>
                      <input type="text" className={styles.input} value={formData.titleDe} onChange={e => handleTitleChange(e.target.value, 'de')} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Kısa Özet</label>
                      <textarea className={styles.input} rows={2} value={formData.excerptDe} onChange={e => setFormData({...formData, excerptDe: e.target.value})} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Detaylı İçerik</label>
                      <div style={{ backgroundColor: 'white' }}>
                         <ReactQuillWrapper forwardedRef={quillRefs.de} theme="snow" value={formData.contentDe} onChange={(val: string) => setFormData({...formData, contentDe: val})} modules={getModules('de')} style={{ height: '350px', marginBottom: '3rem' }} />
                      </div>
                    </div>
                 </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <button type="button" className={styles.buttonOutline} onClick={() => setIsModalOpen(false)}>İptal</button>
                <button type="submit" className={styles.button} disabled={isSubmitting}>
                  {isSubmitting ? 'Kaydediliyor...' : 'Yazıyı Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
