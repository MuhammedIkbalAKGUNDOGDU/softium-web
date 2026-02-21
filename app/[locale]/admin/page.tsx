'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

interface DashboardStats {
  totalReferences: number;
  publishedBlogs: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5262/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Veriler çekilemedi', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Özeti</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Stat Cards */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>Tüm Referanslar</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {loading ? '...' : stats?.totalReferences || 0}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>Yayındaki Bloglar</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
            {loading ? '...' : stats?.publishedBlogs || 0}
          </p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>Okunmamış Mesajlar</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>
            {loading ? '...' : stats?.unreadMessages || 0}
          </p>
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#0f172a' }}>Sistem Notları</div>
        <div style={{ padding: '1.5rem', color: '#64748b', fontSize: '0.875rem' }}>
          Tüm verileriniz otomatik olarak yedeklenmektedir. Yeni blog veya referans eklendiğinde canlı yayına anında yansır.
        </div>
      </div>
    </>
  );
}
