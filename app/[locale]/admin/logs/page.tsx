'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface LoginLog {
  id: string;
  username: string;
  ipAddress: string;
  userAgent: string;
  location: string;
  loginDate: string;
  isSuccess: boolean;
}

export default function SecurityLogsPage() {
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/AdminLogs`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      }
    } catch (error) {
      console.error('Logs fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Güvenlik ve Erişim Kayıtları</h1>
        <div className={styles.statusBadge} style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>
          Toplam {logs.length} Kayıt
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Admin / Kullanıcı</th>
              <th>IP Adresi</th>
              <th>Tarih / Saat</th>
              <th>Cihaz Bilgisi</th>
              <th style={{ textAlign: 'center' }}>Durum</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>Loglar Yükleniyor...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>Henüz kayıt bulunamadı.</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>person_pin</span>
                      {log.username}
                    </div>
                  </td>
                  <td>
                    <code style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                      {log.ipAddress}
                    </code>
                  </td>
                  <td>{formatDate(log.loginDate)}</td>
                  <td>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.userAgent}>
                      {log.userAgent}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`${styles.statusBadge} ${log.isSuccess ? styles.statusSuccess : styles.statusDanger}`}>
                      {log.isSuccess ? 'Başarılı' : 'Başarısız'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
