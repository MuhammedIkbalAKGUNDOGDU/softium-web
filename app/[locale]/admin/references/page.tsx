'use client';
import styles from '../admin.module.css';

export default function ReferencesAdmin() {
  const references = [
    { id: 1, name: 'Global Tech Corp', industry: 'Fintech', status: 'Aktif' },
    { id: 2, name: 'Nexus Health', industry: 'Healthcare', status: 'Aktif' },
    { id: 3, name: 'Future Logistics', industry: 'Logistics', status: 'Pasif' },
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Referans Yönetimi</h1>
        <button className={styles.button}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          Yeni Referans Ekle
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firma Adı</th>
              <th>Sektör</th>
              <th>Durum</th>
              <th style={{ textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {references.map((ref) => (
              <tr key={ref.id}>
                <td style={{ color: '#64748b' }}>#{ref.id}</td>
                <td style={{ fontWeight: 600, color: '#0f172a' }}>{ref.name}</td>
                <td>{ref.industry}</td>
                <td>
                  <span className={`${styles.statusBadge} ${ref.status === 'Aktif' ? styles.statusSuccess : styles.statusWarning}`}>
                    {ref.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className={styles.actionButton} title="Düzenle">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                  </button>
                  <button className={`${styles.actionButton} ${styles.danger}`} title="Sil">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
