import { useState, useEffect } from 'react';
import styles from './Admin.module.css';

const MOCK_INQUIRIES = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@sequoiacapital.com', company: 'Sequoia Capital', message: "We've been tracking Adventura Labs. We'd love to discuss Series A timing. VERITAS's determinism architecture is exactly what institutional clients need.", type: 'investor', date: 'May 17, 2026', read: false },
  { id: '2', name: 'Marcus Webb', email: 'm.webb@techcrunch.com', company: 'TechCrunch', message: "Working on a feature on next-gen AI infrastructure. Adventura Labs' approach is the most technically credible I've seen. Brief interview?", type: 'press', date: 'May 17, 2026', read: false },
  { id: '3', name: 'Dr. Anita Patel', email: 'apatel@upmc.edu', company: 'UPMC', message: 'Dr. Help looks exceptional. Our radiology team would love to explore a clinical validation collaboration for the multimodal pipeline. We have access to 12K+ annotated images.', type: 'partner', date: 'May 16, 2026', read: true },
  { id: '4', name: 'James Okafor', email: 'james@cortexai.io', company: 'Cortex AI', message: 'LUMEN interpretability toolkit is exactly what we have been looking for. We are evaluating mechanistic interpretability approaches for our production LLM pipeline.', type: 'partner', date: 'May 15, 2026', read: true },
];

function rateLimitOk() {
  const raw = sessionStorage.getItem('al_atts');
  const d = raw ? JSON.parse(raw) : { n: 0, t: Date.now() };
  if (Date.now() - d.t > 900_000) { sessionStorage.setItem('al_atts', JSON.stringify({ n: 1, t: Date.now() })); return true; }
  if (d.n >= 5) return false;
  sessionStorage.setItem('al_atts', JSON.stringify({ ...d, n: d.n + 1 }));
  return true;
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<'overview' | 'inquiries' | 'products'>('overview');
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);
  const [selected, setSelected] = useState<typeof MOCK_INQUIRIES[0] | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (sessionStorage.getItem('al_session') === '1') setAuthed(true);
  }, []);

  const unread = inquiries.filter(i => !i.read).length;

  if (!authed) return <Login onAuth={() => { sessionStorage.setItem('al_session', '1'); setAuthed(true); }} />;

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sTop}>
          <div className={styles.sBrand}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="var(--accent)" strokeWidth="1.3" fill="none"/>
              <circle cx="12" cy="12" r="2.5" fill="var(--accent)"/>
            </svg>
            <div>
              <div className={styles.sBrandName}>Adventura Labs</div>
              <div className={styles.sBrandSub}>Admin</div>
            </div>
          </div>
          <nav className={styles.sNav}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'inquiries', label: 'Inquiries', badge: unread || undefined },
              { id: 'products', label: 'Products' },
            ].map(item => (
              <button key={item.id}
                className={`${styles.sNavItem} ${tab === item.id ? styles.sNavActive : ''}`}
                onClick={() => setTab(item.id as typeof tab)}
              >
                {item.label}
                {item.badge !== undefined && <span className={styles.badge}>{item.badge}</span>}
              </button>
            ))}
          </nav>
        </div>
        <div className={styles.sBottom}>
          <div className={styles.sAvatar}>FM</div>
          <div className={styles.sUserInfo}><div className={styles.sUserName}>Faaz Mohamed</div><div className={styles.sUserRole}>CEO · Admin</div></div>
          <button className={styles.sLogout} onClick={() => { sessionStorage.removeItem('al_session'); setAuthed(false); }}>⇥</button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.mainHead}>
          <h1 className={styles.pageTitle}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</h1>
          <div className={styles.pageDate}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>

        {tab === 'overview' && (
          <div className={styles.tabContent}>
            <div className={styles.metricsGrid}>
              {[
                { l: 'Site Visitors', v: '4,281', d: '+18%' },
                { l: 'Inquiries', v: '47', d: '+32%' },
                { l: 'Avg Response', v: '2.4h', d: '−40m' },
                { l: 'Products', v: '5', d: '+1' },
              ].map(m => (
                <div key={m.l} className={styles.metricCard}>
                  <div className={styles.metricDelta}>{m.d}</div>
                  <div className={styles.metricValue}>{m.v}</div>
                  <div className={styles.metricLabel}>{m.l}</div>
                </div>
              ))}
            </div>
            <div className={styles.panel}>
              <div className={styles.panelHead}><span className={styles.panelTitle}>Recent Inquiries</span><button className={styles.panelAction} onClick={() => setTab('inquiries')}>View all →</button></div>
              {inquiries.slice(0, 3).map(i => <InqRow key={i.id} inq={i} onClick={() => { setSelected(i); setTab('inquiries'); setInquiries(p => p.map(x => x.id === i.id ? { ...x, read: true } : x)); }} />)}
            </div>
          </div>
        )}

        {tab === 'inquiries' && (
          <div className={styles.tabContent}>
            <div className={styles.filterRow}>
              {['all', 'investor', 'partner', 'press', 'general'].map(f => (
                <button key={f} className={`${styles.filterBtn} ${filter === f ? styles.filterOn : ''}`} onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className={styles.inqLayout}>
              <div className={styles.inqList}>
                {(filter === 'all' ? inquiries : inquiries.filter(i => i.type === filter)).map(i => (
                  <InqRow key={i.id} inq={i} active={selected?.id === i.id}
                    onClick={() => { setSelected(i); setInquiries(p => p.map(x => x.id === i.id ? { ...x, read: true } : x)); }} />
                ))}
              </div>
              {selected && (
                <div className={styles.inqDetail}>
                  <div className={styles.detailName}>{selected.name}</div>
                  <div className={styles.detailCo}>{selected.company}</div>
                  <a href={`mailto:${selected.email}`} className={styles.detailEmail}>{selected.email}</a>
                  <div className={styles.detailDate}>{selected.date}</div>
                  <div className={styles.detailMsg}>{selected.message}</div>
                  <a href={`mailto:${selected.email}?subject=Re: Adventura Labs`} className="btn btn--accent" style={{ display: 'inline-flex', marginTop: 16, fontSize: 13 }}>Reply →</a>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div className={styles.tabContent}>
            {[
              { n: 'Project Coffeemaker', s: 'Stealth',  c: 'var(--text-muted)' },
              { n: 'VERITAS',             s: 'Beta',     c: 'var(--accent)' },
              { n: 'LUMEN',               s: 'Beta',     c: 'var(--accent)' },
              { n: 'Dr. Help',            s: 'Stealth',  c: 'var(--text-muted)' },
              { n: 'Dr. Help',            s: 'Stealth',  c: 'var(--text-muted)' },
            ].map(p => (
              <div key={p.n} className={styles.productRow}>
                <div className={styles.productName}>{p.n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: p.c }}>● {p.s}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function InqRow({ inq, active, onClick }: { inq: typeof MOCK_INQUIRIES[0]; active?: boolean; onClick: () => void }) {
  return (
    <button className={`${styles.inqRow} ${!inq.read ? styles.inqUnread : ''} ${active ? styles.inqActive : ''}`} onClick={onClick}>
      {!inq.read && <div className={styles.unreadDot} />}
      <div className={styles.inqTop}><span className={styles.inqName}>{inq.name}</span><span className={styles.inqCo}>{inq.company}</span></div>
      <div className={styles.inqPreview}>{inq.message.slice(0, 88)}…</div>
      <div className={styles.inqFoot}><span className={styles.inqType}>{inq.type}</span><span className={styles.inqDate}>{inq.date}</span></div>
    </button>
  );
}

function Login({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [locked, setLocked] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rateLimitOk()) { setLocked(true); setErr('Too many attempts. Wait 15 minutes.'); return; }
    if (email.trim().toLowerCase() === 'admin@adventuralabs.ai' && pwd === 'AdvLabs2026!') {
      onAuth();
    } else {
      setErr('Invalid credentials.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginMark}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="var(--accent)" strokeWidth="1.3" fill="none"/>
            <circle cx="12" cy="12" r="2.5" fill="var(--accent)"/>
          </svg>
        </div>
        <h1 className={styles.loginTitle}>Admin Access</h1>
        <form className={styles.loginForm} onSubmit={submit}>
          <div className={styles.loginField}>
            <label className={styles.loginLabel}>Email</label>
            <input className={styles.loginInput} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@adventuralabs.ai" disabled={locked} maxLength={254} required />
          </div>
          <div className={styles.loginField}>
            <label className={styles.loginLabel}>Password</label>
            <input className={styles.loginInput} type="password" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••" disabled={locked} maxLength={128} required />
          </div>
          {err && <div className={styles.loginErr}>{err}</div>}
          <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} disabled={locked}>
            {locked ? 'Locked' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  );
}
