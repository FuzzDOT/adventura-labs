import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import { NAV } from '../../utils/data';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled]           = useState(false);
  const [openDropdown, setOpenDropdown]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [darkMode, setDarkMode]           = useState(false);
  const navRef      = useRef<HTMLElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate    = useNavigate();
  const location    = useLocation();

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  // ── DARK MODE DETECTION ──────────────────────────────────────
  // Runs on scroll AND on every route change.
  const checkDark = useCallback(() => {
    const el = document.querySelector('[data-nav-dark]') as HTMLElement | null;
    if (!el) { setDarkMode(false); return; }
    const r = el.getBoundingClientRect();
    // Dark when the dark section covers the nav bar area (top 64px)
    setDarkMode(r.top < 64 && r.bottom > 0);
  }, []);

  // Re-run after route change (DOM has updated by then via rAF)
  useEffect(() => {
    // Two rAFs: first lets React commit the new page DOM,
    // second ensures layout is painted and getBoundingClientRect is fresh
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Reset scroll position state too
        setScrolled(window.scrollY > 40);
        checkDark();
      });
    });
  }, [location.pathname, checkDark]);

  // Re-run on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      checkDark();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [checkDark]);

  // ── CLOSE ON OUTSIDE CLICK ───────────────────────────────────
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenDropdown(null);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  // ── CLOSE DROPDOWNS + MOBILE ON NAVIGATE ────────────────────
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const goTo = (href: string) => {
    navigate(href);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <header
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.solid : ''} ${darkMode ? styles.darkNav : ''}`}
        role="navigation"
      >
        <div className={styles.inner}>
          {/* Logo always gets darkMode — on dark pages it should be light regardless of scroll */}
          <AnimatedLogo scrolled={scrolled} darkMode={darkMode} />

          <nav className={styles.links} aria-label="Main navigation">
            {NAV.map((section) => (
              <div
                key={section.href}
                className={styles.navItem}
                onMouseEnter={() => section.items && openMenu(section.label)}
                onMouseLeave={closeMenu}
              >
                <button
                  className={`${styles.navBtn} ${isActive(section.href) ? styles.navBtnActive : ''}`}
                  onClick={() =>
                    section.items
                      ? setOpenDropdown(openDropdown === section.label ? null : section.label)
                      : goTo(section.href)
                  }
                  aria-expanded={section.items ? openDropdown === section.label : undefined}
                >
                  {section.label}
                  {section.items && (
                    <svg
                      className={`${styles.chevron} ${openDropdown === section.label ? styles.chevronOpen : ''}`}
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {section.items && (
                  <div
                    className={`${styles.dropdown} ${openDropdown === section.label ? styles.dropdownOpen : ''}`}
                    onMouseEnter={() => { if (closeTimer.current) clearTimeout(closeTimer.current); }}
                    onMouseLeave={closeMenu}
                  >
                    <div className={styles.dropdownInner}>
                      <div className={styles.dropdownLabel}>{section.label}</div>
                      {section.items.map((item) => (
                        <button
                          key={item.href}
                          className={styles.dropdownItem}
                          onClick={() => goTo(item.href)}
                        >
                          <span className={styles.dropdownItemName}>{item.label}</span>
                          {item.description && (
                            <span className={styles.dropdownItemDesc}>{item.description}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className={styles.ctas}>
            <button
              className={`${styles.ctaGhost} ${darkMode ? styles.ctaGhostDark : ''}`}
              onClick={() => goTo('/contact')}
            >
              Get in touch
            </button>
          </div>

          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`${styles.mobile} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileInner}>
          {NAV.map((section, si) => (
            <div key={section.href} className={styles.mobileSection}>
              <button
                className={styles.mobileSectionBtn}
                style={{ animationDelay: `${si * 60}ms` }}
                onClick={() => !section.items && goTo(section.href)}
              >
                {section.label}
              </button>
              {section.items && (
                <div className={styles.mobileSubItems}>
                  {section.items.map((item) => (
                    <button
                      key={item.href}
                      className={styles.mobileSubItem}
                      onClick={() => goTo(item.href)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            className="btn btn--primary"
            style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}
            onClick={() => goTo('/contact')}
          >
            Get in touch
          </button>
        </div>
      </div>
    </>
  );
}
