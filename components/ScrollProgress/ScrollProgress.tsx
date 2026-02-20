'use client';

import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';
import { usePathname } from 'next/navigation';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  if (pathname.includes('/admin')) return null;

  useEffect(() => {
    // Reset progress on route change
    setProgress(0);

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      // Ensure total > 0 to avoid division by zero
      if (total > 0) {
        const currentProgress = (scrollTop / total) * 100;
        setProgress(Math.min(currentProgress, 100));
      } else {
        setProgress(0);
      }
    };

    // Initial update
    update();

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]); // Re-run effect when pathname changes

  return (
    <div className={styles.progressBar} aria-hidden="true">
      <div className={styles.progressFill} style={{ width: `${progress}%` }} />
    </div>
  );
}
