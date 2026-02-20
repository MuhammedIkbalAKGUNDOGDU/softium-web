import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Özeti</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Stat Cards */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>Tüm Referanslar</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>6</p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>Yayındaki Bloglar</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>4</p>
        </div>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>Okunmamış Mesajlar</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>2</p>
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#0f172a' }}>Son Aktiviteler</div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Aktivite</th>
              <th>Tarih</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Yeni İletişim Talebi (ikbal@softium.tech)</td>
              <td>2 mins ago</td>
              <td><span className={`${styles.statusBadge} ${styles.statusWarning}`}>Bekliyor</span></td>
            </tr>
            <tr>
              <td>"Yapay Zeka Mimarisi" blog yazısı güncellendi</td>
              <td>5 hours ago</td>
              <td><span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Başarılı</span></td>
            </tr>
            <tr>
              <td>Nexus Health referansı eklendi</td>
              <td>1 day ago</td>
              <td><span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Başarılı</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
