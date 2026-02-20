'use client';
import styles from '../admin.module.css';

export default function BlogAdmin() {
  const blogs = [
    { id: 1, title: 'Yapay Zeka Mimarileri 2026', author: 'Dr. Alan Turing', date: '21 Şub 2026', status: 'Yayında', tr: true, en: true, de: false },
    { id: 2, title: 'Otonom Lojistik: Geleceğin Kervanları', author: 'Elon Musk', date: '15 Şub 2026', status: 'Taslak', tr: true, en: false, de: false },
  ];

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blog Yönetimi</h1>
        <button className={styles.button}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
          Yeni Yazı Ekle
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Yazar</th>
              <th>Tarih</th>
              <th>Diller</th>
              <th>Durum</th>
              <th style={{ textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td style={{ fontWeight: 600, color: '#0f172a' }}>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.date}</td>
                <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  {blog.tr ? '🇹🇷 ' : ''}
                  {blog.en ? '🇬🇧 ' : ''}
                  {blog.de ? '🇩🇪 ' : ''}
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${blog.status === 'Yayında' ? styles.statusSuccess : styles.statusWarning}`}>
                    {blog.status}
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
