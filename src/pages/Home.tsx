import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, BLOG_POSTS } from '../utils/data';
import styles from './Home.module.css';

/* ─────────────────────────────────────────────
   HERO — CSS entrance only, no observer
───────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className={`${styles.hero} ${loaded ? styles.heroLoaded : ''}`}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowDot} />
          <span className="t-label-accent">Adventura Labs · Pittsburgh, PA</span>
        </div>

        <h1 className={styles.heroHeadline}>
          <span className={styles.heroLine1}>We are building</span>
          <span className={styles.heroLine2}>the most important</span>
          <span className={styles.heroLine3}><em className={styles.heroEm}>AI company</em></span>
          <span className={styles.heroLine4}>on earth.</span>
        </h1>

        <p className={`t-body-lg ${styles.heroSub}`}>
          AI that proves itself mathematically, not just statistically.
          Verifiable. Auditable. Built for the real world.
        </p>

        <div className={styles.heroActions}>
          <button className="btn btn--primary" onClick={() => navigate('/products/coffeemaker')}>
            See Project Coffeemaker
            <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn--ghost" onClick={() => navigate('/research')}>Our research</button>
        </div>

      </div>
      <div className={styles.scrollHint} aria-hidden="true"><div className={styles.scrollLine} /></div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COFFEEMAKER
───────────────────────────────────────────── */
function CoffeemakerVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const SIZE = 480;
    canvas.width = SIZE; canvas.height = SIZE;
    const CX = SIZE / 2, CY = SIZE / 2;
    let frame = 0, animId: number;

    const LAYERS = [
      [{ x: CX, y: CY - 160 }],
      [{ x: CX - 80, y: CY - 60 }, { x: CX + 80, y: CY - 60 }],
      [{ x: CX - 140, y: CY + 40 }, { x: CX, y: CY + 20 }, { x: CX + 140, y: CY + 40 }],
      [{ x: CX - 60, y: CY + 150 }, { x: CX + 60, y: CY + 150 }],
    ];

    type Conn = { ax: number; ay: number; bx: number; by: number; phase: number };
    const conns: Conn[] = [];
    for (let l = 0; l < LAYERS.length - 1; l++)
      for (const a of LAYERS[l]) for (const b of LAYERS[l + 1])
        conns.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, phase: Math.random() * Math.PI * 2 });

    const particles = conns.map((_, ci) => ({ ci, t: Math.random(), speed: 0.003 + Math.random() * 0.004 }));

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      const t = ++frame / 60;

      conns.forEach(c => {
        const p = Math.sin(t * 1.5 + c.phase) * 0.5 + 0.5;
        ctx.beginPath(); ctx.moveTo(c.ax, c.ay); ctx.lineTo(c.bx, c.by);
        ctx.strokeStyle = `rgba(26,86,219,${0.05 + p * 0.08})`; ctx.lineWidth = 1; ctx.stroke();
      });

      particles.forEach(p => {
        p.t += p.speed; if (p.t > 1) p.t = 0;
        const c = conns[p.ci];
        ctx.beginPath();
        ctx.arc(c.ax + (c.bx - c.ax) * p.t, c.ay + (c.by - c.ay) * p.t, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,86,219,${Math.sin(p.t * Math.PI) * 0.8})`; ctx.fill();
      });

      [{ r: 190, spd: 0.10, dash: [3, 12], col: 'rgba(245,242,235,0.04)' },
       { r: 90,  spd: -0.18, dash: [5, 9],  col: 'rgba(26,86,219,0.18)' }].forEach(ring => {
        ctx.save(); ctx.translate(CX, CY); ctx.rotate(t * ring.spd);
        ctx.beginPath(); ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = ring.col; ctx.lineWidth = 1;
        ctx.setLineDash(ring.dash); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
      });

      LAYERS.forEach((layer, li) => layer.forEach(node => {
        const p = Math.sin(t * 2 + li * 1.2) * 0.4 + 0.6;
        [[14, 0.04], [8, 0]].forEach(([r, fill]) => {
          ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
          if (fill) { ctx.fillStyle = `rgba(26,86,219,${fill * p})`; ctx.fill(); }
          else { ctx.strokeStyle = `rgba(26,86,219,${0.28 * p})`; ctx.lineWidth = 1; ctx.stroke(); }
        });
        ctx.beginPath(); ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26,86,219,${0.7 + 0.3 * p})`; ctx.fill();
      }));

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={styles.cmVisual}>
      <canvas ref={canvasRef} className={styles.cmCanvas} />
      <div className={styles.cmVisualLabel}>COFFEEMAKER</div>
    </div>
  );
}

function CoffeemakerSection() {
  const navigate = useNavigate();
  return (
    <section className={styles.coffeemaker} data-nav-dark="true">
      <div className="container">
        <div className={styles.cmInner}>
          <div className={styles.cmLeft}>
            <div className="rv"><span className="t-label" style={{ color: 'rgba(245,242,235,0.3)' }}>Flagship · 2026</span></div>
            <h2 className="t-h1 rv" style={{ color: 'var(--dark-text)' }}>
              Project<br /><em className={styles.cmEm}>Coffeemaker</em>
            </h2>
            <p className="t-body-lg rv" style={{ color: 'var(--dark-text-2)', maxWidth: 480 }}>
              Our most ambitious project. We are working on something at the cutting edge of what AI can do —
              verifiable, interpretable, and built to matter. We are not ready to say exactly what it is.
            </p>
            <p className="t-body rv" style={{ color: 'var(--dark-text-2)', maxWidth: 480 }}>
              We will say this: it is the most important thing we are working on, and it is coming soon.
            </p>
            <div className={`${styles.cmActions} rv`}>
              <button className="btn btn--white" onClick={() => navigate('/products/coffeemaker')}>
                Learn more
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="rv">
            <CoffeemakerVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRODUCTS GRID
───────────────────────────────────────────── */
function ProductsSection() {
  const navigate = useNavigate();
  return (
    <section className={styles.productsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="section-label rv"><span className="t-label-accent">Products</span></div>
          <div className={styles.sectionHeaderRight}>
            <h2 className="t-h2 rv">Four products.<br />One conviction.</h2>
            <button className="btn btn--ghost rv" onClick={() => navigate('/products')}>
              All products
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.productsGrid}>
          {PRODUCTS.filter(p => !p.flagship).map((p) => (
            <div
              key={p.id}
              className={`${styles.productCard} rv-card`}
              onClick={() => navigate(`/products/${p.id}`)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/products/${p.id}`)}
            >
              <div className={styles.productCardTop}>
                <span className="t-label">{p.index}</span>
                <span className={`status-badge status-${p.status}`}><span className="status-dot" />{p.status}</span>
              </div>
              <h3 className={styles.productName}>{p.name}</h3>
              <p className={styles.productTagline}>{p.tagline}</p>
              <div className={styles.productStats}>
                {p.stats.slice(0, 2).map(s => (
                  <div key={s.label} className={styles.productStat}>
                    <span className={styles.productStatVal}>{s.value}</span>
                    <span className={styles.productStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.productArrow}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MANIFESTO
───────────────────────────────────────────── */
function ManifestoSection() {
  return (
    <section className={styles.manifesto}>
      <div className="container">
        <p className={`${styles.manifestoText} rv`}>
          "AI that doesn't just perform —<br /><em>it proves itself."</em>
        </p>
        <div className={`${styles.manifestoAttr} rv`}>— Faaz Mohamed, CEO & Founder</div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BLOG PREVIEW
───────────────────────────────────────────── */
function BlogSection() {
  const navigate = useNavigate();
  return (
    <section className={styles.blogSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className="section-label rv"><span className="t-label-accent">Latest</span></div>
          <button className="btn btn--ghost rv" onClick={() => navigate('/blog')}>
            All posts
            <svg className="btn-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className={styles.blogGrid}>
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className={`${styles.blogCard} rv`}
              onClick={() => navigate(`/blog/${post.slug}`)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${post.slug}`)}
            >
              <div className={styles.blogCardTop}>
                <span className="t-label">{post.category}</span>
                <span className="t-label">{post.date}</span>
              </div>
              <h3 className={styles.blogTitle}>{post.title}</h3>
              <p className={styles.blogExcerpt}>{post.excerpt}</p>
              <div className={styles.blogReadMore}>Read →</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */
function CtaBanner() {
  const navigate = useNavigate();
  return (
    <section className={styles.ctaBanner}>
      <div className="container">
        <div className={styles.ctaInner}>
          <div className={styles.ctaLeft}>
            <h2 className={`${styles.ctaHeading} rv`}>
              If you build things<br />that matter — let's talk.
            </h2>
          </div>
          <div className={`${styles.ctaRight} rv`}>
            <p className={styles.ctaBody}>Investors, researchers, enterprise partners, and serious builders.</p>
            <button className="btn btn--white" style={{ marginTop: 24, alignSelf: 'flex-start' }} onClick={() => navigate('/contact')}>
              Get in touch
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CoffeemakerSection />
      <ProductsSection />
      <ManifestoSection />
      <BlogSection />
      <CtaBanner />
    </>
  );
}
