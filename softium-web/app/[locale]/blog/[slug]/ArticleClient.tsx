'use client';

import { useEffect, useState, useCallback } from 'react';
import styles from './article.module.css';


/* ─── Scroll-to-top Button ────────────────────── */
export function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  return (
    <button
      id="scroll-top-btn"
      className={`${styles.scrollTopBtn} ${visible ? styles.scrollTopVisible : styles.scrollTopHidden}`}
      onClick={scrollTop}
      aria-label="Sayfanın başına dön"
    >
      <span className="material-symbols-outlined">north</span>
    </button>
  );
}

/* ─── Side Action Buttons ─────────────────────── */
interface SideControlsProps {
  likeCount?: string;
  likeLabel: string;
  shareLabel: string;
}

export function SideControls({ likeCount = '1.2K', likeLabel, shareLabel }: SideControlsProps) {
  const [liked, setLiked] = useState(false);

  return (
    <aside className={styles.sideControls} aria-label="Article actions">
      <button
        id="article-like-btn"
        className={styles.sideBtn}
        onClick={() => setLiked((v) => !v)}
        aria-pressed={liked}
        style={liked ? { color: 'var(--primary)' } : undefined}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: '1.5rem',
            fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          thumb_up
        </span>
        <span className={styles.sideBtnLabel}>{likeCount}</span>
      </button>

      <button id="article-share-btn" className={styles.sideBtn} aria-label={shareLabel}>
        <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>share</span>
        <span className={styles.sideBtnLabel}>{shareLabel}</span>
      </button>
    </aside>
  );
}

/* ─── Newsletter Form ─────────────────────────── */
interface NewsletterFormProps {
  placeholder: string;
  btnLabel: string;
}

export function NewsletterForm({ placeholder, btnLabel }: NewsletterFormProps) {
  const [email, setEmail] = useState('');

  return (
    <form
      className={styles.newsletterForm}
      onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
      aria-label="Newsletter subscription"
    >
      <input
        id="article-newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className={styles.newsletterInput}
        required
        aria-label={placeholder}
      />
      <button type="submit" id="article-newsletter-submit" className={styles.newsletterBtn}>
        {btnLabel}
      </button>
    </form>
  );
}
