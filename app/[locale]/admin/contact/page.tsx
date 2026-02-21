'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export default function ContactAdmin() {
  const [messages, setMessages] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [selectedMessage, setSelectedMessage] = useState<ContactRequest | null>(null);
  const [notes, setNotes] = useState('');

  const BASE_URL = 'http://localhost:5262/api/contactrequests';

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openMessageDetail = async (msg: ContactRequest) => {
    setSelectedMessage(msg);
    setNotes(msg.notes || '');

    // Eger durumu "Bekliyor" ise otomatik "Okundu" olarak isaretle
    if (msg.status === 'Bekliyor') {
      try {
        await fetch(`${BASE_URL}/status/${msg.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify('Okundu')
        });
        fetchMessages(); // Tabloyu guncelle
      } catch (e) {
        console.error(e);
      }
    }
  };

  const closeModal = () => {
    setSelectedMessage(null);
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedMessage) return;
    try {
      const res = await fetch(`${BASE_URL}/status/${selectedMessage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStatus)
      });
      if (res.ok) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
        fetchMessages();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    try {
      const res = await fetch(`${BASE_URL}/notes/${selectedMessage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notes)
      });
      if (res.ok) {
        alert('Notlar kaydedildi.');
        fetchMessages();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istiyor musunuz? Geri alınamaz.')) return;
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedMessage && selectedMessage.id === id) closeModal();
        fetchMessages();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>İletişim Talepleri</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={styles.buttonOutline} onClick={fetchMessages}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>refresh</span>
            Yenile
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Gönderen</th>
              <th>Şirket</th>
              <th>Mesaj Özeti</th>
              <th>Tarih</th>
              <th>Durum</th>
              <th style={{ textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
               <tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Yükleniyor...</td></tr>
            ) : messages.length === 0 ? (
               <tr><td colSpan={6} style={{textAlign: 'center', padding: '2rem'}}>Henüz iletişim talebi bulunmuyor.</td></tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg.id} style={{ opacity: msg.status === 'Yanıtlandı' ? 0.7 : 1 }}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{msg.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{msg.email}</div>
                  </td>
                  <td>{msg.company || '-'}</td>
                  <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.message}
                  </td>
                  <td style={{ color: '#64748b', fontSize: '0.9rem' }}>{formatDate(msg.createdAt)}</td>
                  <td>
                    <span className={`${styles.statusBadge} 
                      ${msg.status === 'Bekliyor' ? styles.statusWarning : 
                        msg.status === 'Okundu' ? 'bg-slate-100 text-slate-700' : 
                        msg.status === 'İşlem Sürüyor' ? 'bg-blue-100 text-blue-700' :
                        styles.statusSuccess}`
                    } style={{ backgroundColor: msg.status === 'Okundu' ? '#e2e8f0' : msg.status === 'İşlem Sürüyor' ? '#dbeafe' : undefined, color: msg.status === 'Okundu' ? '#475569' : msg.status === 'İşlem Sürüyor' ? '#1d4ed8' : undefined }}>
                      {msg.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className={styles.buttonOutline} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => openMessageDetail(msg)}>
                      Detay / Oku
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mesaj Detay Modeli */}
      {selectedMessage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className={styles.formCard} style={{ width: '100%', maxWidth: '750px', margin: '0 1rem', maxHeight: '95vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div className={styles.formCardTitle} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                Mesaj Detayı 
                <span className={`${styles.statusBadge} ${selectedMessage.status === 'Bekliyor' ? styles.statusWarning : selectedMessage.status === 'Okundu' ? 'bg-slate-100' : selectedMessage.status === 'İşlem Sürüyor' ? 'bg-blue-100' : styles.statusSuccess}`} style={{marginLeft: '1rem', fontSize: '0.75rem', padding: '0.2rem 0.6rem', backgroundColor: selectedMessage.status === 'Okundu' ? '#e2e8f0' : selectedMessage.status === 'İşlem Sürüyor' ? '#dbeafe' : undefined, color: selectedMessage.status === 'Okundu' ? '#475569' : selectedMessage.status === 'İşlem Sürüyor' ? '#1d4ed8' : undefined }}>
                  Durum: {selectedMessage.status}
                </span>
              </div>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '2rem' }}>
              {/* Sol: Gonderen Bilgileri */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', height: 'fit-content' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Gönderen Bilgileri</h4>
                <div style={{ marginBottom: '1rem' }}>
                  <label className={styles.label} style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>İsim Soyisim</label>
                  <div style={{ fontWeight: 600 }}>{selectedMessage.name}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className={styles.label} style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>E-Posta Adresi</label>
                  <div style={{ color: 'var(--primary)', fontWeight: 500 }}><a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className={styles.label} style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Şirket Adı</label>
                  <div>{selectedMessage.company || '-'}</div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className={styles.label} style={{ fontSize: '0.75rem', marginBottom: '0.2rem' }}>Tarih</label>
                  <div style={{ fontSize: '0.85rem' }}>{formatDate(selectedMessage.createdAt)}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                   <label className={styles.label} style={{ fontSize: '0.75rem', marginBottom: '0' }}>Durum İşlemi</label>
                   {selectedMessage.status !== 'İşlem Sürüyor' && selectedMessage.status !== 'Yanıtlandı' && (
                     <button className={styles.buttonOutline} style={{ padding: '0.5rem', borderColor: '#3b82f6', color: '#3b82f6' }} onClick={() => handleUpdateStatus('İşlem Sürüyor')}>
                       Süreci Başlat (İşlem Sürüyor)
                     </button>
                   )}
                   {selectedMessage.status !== 'Yanıtlandı' && (
                     <button className={styles.button} style={{ padding: '0.5rem' }} onClick={() => handleUpdateStatus('Yanıtlandı')}>
                       Yanıtlandı Olarak İşaretle
                     </button>
                   )}
                   {(selectedMessage.status === 'Yanıtlandı' || selectedMessage.status === 'İşlem Sürüyor') && (
                     <button className={styles.buttonOutline} style={{ padding: '0.5rem' }} onClick={() => handleUpdateStatus('Okundu')}>
                       Okundu'ya Geri Çek
                     </button>
                   )}
                </div>
              </div>

              {/* Sağ: Mesaj ve Notlar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Mesaj İçeriği:</h4>
                  <div style={{ padding: '1.5rem', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {selectedMessage.message}
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>Yönetici Notları (Sadece Admin Görebilir):</h4>
                  <textarea 
                    className={styles.input} 
                    rows={4} 
                    value={notes} 
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Gönderenle ilgili veya dönüşünüz hakkında bir not bırakın..."
                  ></textarea>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button className={styles.buttonOutline} style={{ padding: '0.4rem 1rem' }} onClick={handleSaveNotes}>
                      Notu Kaydet
                    </button>
                  </div>
                </div>
                
                <div style={{ marginTop: 'auto', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button className={`${styles.buttonOutline} ${styles.danger}`} style={{ padding: '0.5rem 1rem' }} onClick={() => handleDelete(selectedMessage.id)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '4px' }}>delete</span>
                    Sil
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
