import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  const go = (href: string) => navigate(href);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandName}>Adventura Labs</div>
            <div className={styles.brandSub}>Cutting Edge AI Products</div>
          </div>

          <nav className={styles.navCols}>
            <div className={styles.navCol}>
              <div className={styles.colTitle}>Products</div>
              {[
                { label: 'Project Coffeemaker', id: 'coffeemaker' },
                { label: 'VERITAS', id: 'veritas' },
                { label: 'LUMEN', id: 'lumen' },
                { label: 'Dr. Help', id: 'dr-help' },
              ].map(p => (
                <button key={p.id} className={styles.colLink} onClick={() => go(`/products/${p.id}`)}>
                  {p.label}
                </button>
              ))}
            </div>
            <div className={styles.navCol}>
              <div className={styles.colTitle}>Research</div>
              <button className={styles.colLink} onClick={() => go('/research')}>Overview</button>
              <button className={styles.colLink} onClick={() => go('/research')}>Deterministic AI</button>
              <button className={styles.colLink} onClick={() => go('/research')}>Medical AI</button>
            </div>
            <div className={styles.navCol}>
              <div className={styles.colTitle}>Company</div>
              <button className={styles.colLink} onClick={() => go('/about')}>About</button>
              <button className={styles.colLink} onClick={() => go('/blog')}>Blog</button>
              <button className={styles.colLink} onClick={() => go('/careers')}>Careers</button>
              <button className={styles.colLink} onClick={() => go('/contact')}>Contact</button>
            </div>
            <div className={styles.navCol}>
              <div className={styles.colTitle}>Connect</div>
              <a href="https://linkedin.com/in/faazmohamed" target="_blank" rel="noreferrer" className={styles.colLink}>LinkedIn ↗</a>
              <a href="https://github.com/FuzzDOT" target="_blank" rel="noreferrer" className={styles.colLink}>GitHub ↗</a>
              <a href="https://faazmohamed.com" target="_blank" rel="noreferrer" className={styles.colLink}>Portfolio ↗</a>
            </div>
          </nav>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <div className={styles.copy}>© {new Date().getFullYear()} Adventura Labs. All rights reserved.</div>
          <div className={styles.bottomRight}>
            <span>Pittsburgh, PA</span>
            <span className={styles.dot}>·</span>
            <span>Founded Dec 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
