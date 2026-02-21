'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import styles from './ContactForm.module.css';

const SERVICE_KEYS = ['ai', 'cloud', 'saas', 'data', 'marketing', 'devops', 'other'] as const;

type FormState = 'idle' | 'submitting' | 'success';

export default function ContactForm() {
  const t = useTranslations('contact');
  const f = useTranslations('contact.form');

  const [formState, setFormState] = useState<FormState>('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: '', email: '', company: '', service: '', message: '',
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const response = await fetch('http://localhost:5262/api/contactrequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          message: `[Kategori/Servis: ${values.service || 'Belirtilmedi'}]\n\n${values.message}`
        })
      });

      if (response.ok) {
        setFormState('success');
      } else {
        setFormState('idle');
        alert('Talep oluşturulurken bir hata meydana geldi. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      setFormState('idle');
      alert('Ağ bağlantısı hatası oluştu!');
    }
  };

  const handleReset = () => {
    setValues({ name: '', email: '', company: '', service: '', message: '' });
    setFormState('idle');
  };

  return (
    <div ref={sectionRef} className={styles.wrapper}>
      {/* ── LEFT: Info Panel ─────────────────────── */}
      <aside className={`${styles.infoPanel} reveal`}>
        {/* Gradient orb */}
        <div className={styles.infoBg} aria-hidden="true" />

        <div className={styles.infoInner}>
          {/* headline */}
          <div>
            <div className={`badge ${styles.badge}`} style={{ marginBottom: '1.5rem' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>send</span>
              {t('badge')}
            </div>
            <h1 className={styles.headline}>
              {t('headline1')}{' '}
              <span className={styles.accentWord}>{t('headline2')}</span>
            </h1>
            <p className={styles.subtitle}>{t('subtitle')}</p>
          </div>

          {/* Info rows */}
          <div className={styles.infoList}>
            <div className={styles.infoItem} id="contact-email">
              <div className={styles.infoIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>mail</span>
              </div>
              <div>
                <div className={styles.infoLabel}>{t('info.emailLabel')}</div>
                <a href="mailto:hello@softium.tech" className={styles.infoValue}>
                  hello@softium.tech
                </a>
              </div>
            </div>

            <div className={styles.infoItem} id="contact-phone">
              <div className={styles.infoIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>call</span>
              </div>
              <div>
                <div className={styles.infoLabel}>{t('info.phoneLabel')}</div>
                <a href="tel:+902121234567" className={styles.infoValue}>
                  {t('info.phone')}
                </a>
              </div>
            </div>

            <div className={styles.infoItem} id="contact-hours">
              <div className={styles.infoIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>schedule</span>
              </div>
              <div>
                <div className={styles.infoLabel}>{t('info.hoursLabel')}</div>
                <div className={styles.infoValue}>{t('info.hours')}</div>
              </div>
            </div>

            <div className={styles.infoItem} id="contact-response">
              <div className={styles.infoIcon}>
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>timer</span>
              </div>
              <div>
                <div className={styles.infoLabel}>{t('info.responseLabel')}</div>
                <div className={styles.infoValue}>{t('info.response')}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── RIGHT: Form ──────────────────────────── */}
      <div className={`${styles.formCard} reveal reveal-delay-1`}>
        {formState === 'success' ? (
          /* ── Success State ── */
          <div className={styles.successState} id="contact-success">
            <div className={styles.successIcon} aria-hidden="true">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '2.5rem', color: '#22c55e', fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h2 className={styles.successTitle}>{f('successTitle')}</h2>
            <p className={styles.successMessage}>{f('successMessage')}</p>
            <button
              id="contact-new-message-btn"
              onClick={handleReset}
              className={styles.newMsgBtn}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>refresh</span>
              {f('newMessage')}
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form id="contact-form" onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              {/* Name */}
              <div className={`${styles.inputGroup} ${focused === 'name' ? styles.focused : ''}`}>
                <label htmlFor="contact-name" className={styles.label}>{f('name')}</label>
                <div className={styles.inputWrap}>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={f('namePlaceholder')}
                    value={values.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className={styles.input}
                  />
                  <div className={styles.inputLine} aria-hidden="true" />
                </div>
              </div>

              {/* Email */}
              <div className={`${styles.inputGroup} ${focused === 'email' ? styles.focused : ''}`}>
                <label htmlFor="contact-email-field" className={styles.label}>{f('email')}</label>
                <div className={styles.inputWrap}>
                  <input
                    id="contact-email-field"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={f('emailPlaceholder')}
                    value={values.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={styles.input}
                  />
                  <div className={styles.inputLine} aria-hidden="true" />
                </div>
              </div>

              {/* Company */}
              <div className={`${styles.inputGroup} ${focused === 'company' ? styles.focused : ''}`}>
                <label htmlFor="contact-company" className={styles.label}>{f('company')}</label>
                <div className={styles.inputWrap}>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder={f('companyPlaceholder')}
                    value={values.company}
                    onChange={handleChange}
                    onFocus={() => setFocused('company')}
                    onBlur={() => setFocused(null)}
                    className={styles.input}
                  />
                  <div className={styles.inputLine} aria-hidden="true" />
                </div>
              </div>

              {/* Service */}
              <div className={`${styles.inputGroup} ${focused === 'service' ? styles.focused : ''}`}>
                <label htmlFor="contact-service" className={styles.label}>{f('service')}</label>
                <div className={styles.inputWrap}>
                  <select
                    id="contact-service"
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                    onFocus={() => setFocused('service')}
                    onBlur={() => setFocused(null)}
                    className={`${styles.input} ${styles.select} ${!values.service ? styles.selectEmpty : ''}`}
                  >
                    <option value="" disabled>{f('servicePlaceholder')}</option>
                    {SERVICE_KEYS.map((key) => (
                      <option key={key} value={key}>
                        {f(`serviceOptions.${key}`)}
                      </option>
                    ))}
                  </select>
                  <span className={`material-symbols-outlined ${styles.selectArrow}`} aria-hidden="true">
                    expand_more
                  </span>
                  <div className={styles.inputLine} aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Message — full width */}
            <div className={`${styles.inputGroup} ${styles.fullWidth} ${focused === 'message' ? styles.focused : ''}`} style={{ marginTop: '2rem' }}>
              <label htmlFor="contact-message" className={styles.label}>{f('message')}</label>
              <div className={styles.inputWrap}>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder={f('messagePlaceholder')}
                  value={values.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`${styles.input} ${styles.textarea}`}
                />
                <div className={styles.inputLine} aria-hidden="true" />
              </div>
            </div>

            {/* Submit */}
            <div className={styles.submitRow}>
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={formState === 'submitting'}
                className={styles.submitBtn}
              >
                {formState === 'submitting' ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    {f('submitting')}
                  </>
                ) : (
                  <>
                    {f('submit')}
                    <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
              <p className={styles.privacyNote}>
                {/* Privacy micro-copy */}
                <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', color: 'var(--text-faint)', fontVariationSettings: "'FILL' 1" }}>
                  lock
                </span>
                {' '}
                {/* Static — could be added to i18n too */}
                Bilgileriniz güvende tutulur.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
