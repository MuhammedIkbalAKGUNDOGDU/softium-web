'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('errors');
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sitesettings`);
        if (res.ok) {
          const data = await res.json();
          const newSettings: Record<string, string> = {};
          data.forEach((item: any) => {
            newSettings[item.settingKey] = item.settingValue;
          });
          setSettings(newSettings);
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '80vh', 
      color: 'white',
      padding: '4rem 0'
    }}>
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Modern Background Elements */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '20%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(circle, rgba(19, 91, 236, 0.08) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '20%',
            width: '30vw',
            height: '30vw',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(60px)',
          }} />
        </div>

        <div style={{ 
          textAlign: 'center', 
          zIndex: 1,
          maxWidth: '800px',
          width: '100%'
        }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
             <h1 style={{ 
              fontSize: 'clamp(8rem, 20vw, 14rem)', 
              margin: 0, 
              lineHeight: 0.8,
              fontWeight: 900,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.05em',
              userSelect: 'none'
            }}>
              404
            </h1>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              marginTop: '1rem'
            }}>
              Page Not Found
            </div>
          </div>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-muted)',
            marginTop: '2rem',
            marginBottom: '3rem',
            maxWidth: '500px',
            marginInline: 'auto',
            lineHeight: '1.6'
          }}>
            {t('pageNotFound')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
            <Link 
              href={`/${locale}`}
              style={{
                padding: '1rem 2.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--text-primary)',
                color: 'var(--bg)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.875rem',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t('backToHome')}
            </Link>
          </div>

          {/* Quick Contact Info from Settings */}
          {(settings.Phone || settings.Email || settings.Address) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              padding: '2.5rem',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(10px)',
              textAlign: 'left'
            }}>
              {settings.Email && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>alternate_email</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</div>
                  <a href={`mailto:${settings.Email}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>{settings.Email}</a>
                </div>
              )}
              {settings.Phone && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>headset_mic</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Destek Hattı</div>
                  <a href={`tel:${settings.Phone}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>{settings.Phone}</a>
                </div>
              )}
              {settings.Address && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>location_on</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ofis</div>
                  <div style={{ color: 'white', fontWeight: 500, fontSize: '0.9rem', lineHeight: '1.4' }}>{settings.Address}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
