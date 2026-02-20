'use client';
import styles from '../admin.module.css';

export default function ContactAdmin() {
  const messages = [
    { id: 'msg_1', name: 'John Doe', email: 'john@example.com', company: 'Acme Inc.', subject: 'Enterprise Cloud System', status: 'Bekliyor', date: 'Bugün 14:30' },
    { id: 'msg_2', name: 'Ayşe Yılmaz', email: 'ayse.y@techstartup.tr', company: 'Tech Startup', subject: 'Softium AI Entegrasyonu', status: 'Okundu', date: 'Dün 09:15' },
    { id: 'msg_3', name: 'Klaus Müller', email: 'klaus@logistics.de', company: null, subject: 'Job Application / Career', status: 'Yanıtlandı', date: '19 Şub 2026' }
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>İletişim Talepleri</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={styles.buttonOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
            Filtrele
          </button>
          <button className={styles.buttonOutline}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
            Dışa Aktar
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Gönderen</th>
              <th>Şirket</th>
              <th>Konu/Mesaj Özeti</th>
              <th>Tarih</th>
              <th>Durum</th>
              <th style={{ textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} style={{ opacity: msg.status === 'Yanıtlandı' ? 0.7 : 1 }}>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{msg.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{msg.email}</div>
                </td>
                <td>{msg.company || '-'}</td>
                <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {msg.subject}
                </td>
                <td style={{ color: '#64748b' }}>{msg.date}</td>
                <td>
                  <span className={`${styles.statusBadge} 
                    ${msg.status === 'Bekliyor' ? styles.statusWarning : 
                      msg.status === 'Okundu' ? 'bg-slate-100 text-slate-700' : 
                      styles.statusSuccess}`
                  } style={{ backgroundColor: msg.status === 'Okundu' ? '#f1f5f9' : undefined, color: msg.status === 'Okundu' ? '#475569' : undefined }}>
                    {msg.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className={styles.buttonOutline} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} title="Oku ve Yanıtla">
                    Detay
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
