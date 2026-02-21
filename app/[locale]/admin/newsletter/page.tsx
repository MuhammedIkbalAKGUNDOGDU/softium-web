'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export default function NewsletterAdmin() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    try {
      const res = await fetch('http://localhost:5262/api/newsletter');
      if (res.ok) {
        const data = await res.json();
        setSubs(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    window.location.href = 'http://localhost:5262/api/newsletter/export';
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu aboneyi silmek istediğinize emin misiniz?')) return;
    
    try {
      const res = await fetch(`http://localhost:5262/api/newsletter/${id}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        setSubs(subs.filter(s => s.id !== id));
      }
    } catch (e) {
      console.error(e);
      alert('Silme sırasında hata oluştu.');
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Bülten Aboneleri</h1>
        <button className={styles.button} onClick={handleExport}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
          Excel (CSV) İndir
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: '2rem' }}>Yükleniyor...</div>
        ) : subs.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>Henüz sisteme kayıtlı bir e-posta bülteni abonesi bulunmuyor.</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>E-Posta Adresi</th>
                <th>Kayıt Tarihi</th>
                <th>Durum</th>
                <th style={{ width: '100px', textAlign: 'right' }}>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {subs.map(sub => (
                <tr key={sub.id}>
                  <td style={{ fontWeight: 600 }}>{sub.email}</td>
                  <td>{new Date(sub.subscribedAt).toLocaleString('tr-TR')}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${sub.isActive ? styles.statusSuccess : styles.statusDanger}`}>
                      {sub.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.iconButton} 
                        style={{ color: '#ef4444' }} 
                        title="Aboneyi Sil"
                        onClick={() => handleDelete(sub.id)}
                      >
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
    </>
  );
}
