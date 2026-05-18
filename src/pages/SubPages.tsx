import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BLOG_POSTS, CAREERS } from '../utils/data';
import styles from './SubPages.module.css';

function sanitize(s: string) {
  return s.replace(/[<>]/g,'').replace(/javascript:/gi,'').replace(/on\w+=/gi,'').trim().slice(0,2000);
}
function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;
}

/* ════════════════════════════
   RESEARCH
════════════════════════════ */
export function ResearchPage() {
  const navigate = useNavigate();

  const AREAS = [
    { n:'01', title:'Deterministic AI Evaluation', product:'VERITAS', href:'/research/deterministic',
      body:'Non-determinism in AI is an engineering failure. We treat reproducibility as a hard constraint. VERITAS proves this is achievable: every output is SHA-256 hashed, chained cryptographically, and replayable byte-for-byte on demand. Nine microservices. Four explicit failure modes. Zero silent degradation.',
      stats:[{v:'SHA-256',l:'Audit Chain'},{v:'400+',l:'Test Cases'},{v:'4',l:'Failure Modes'},{v:'9',l:'Services'}] },
    { n:'02', title:'Medical AI at Consequence Scale', product:'Dr. Help', href:'/research/medical',
      body:'When the domain is clinical, a wrong answer has a cost. Dr. Help synthesizes text, structured patient data, and medical imaging through a unified preprocessing pipeline for downstream diagnostic inference. Designed for real clinical workflows — not demo environments where inputs are clean and stakes are low.',
      stats:[{v:'3',l:'Modalities'},{v:'Unified',l:'Pipeline'},{v:'Stealth',l:'Stage'},{v:'Clinical',l:'Domain'}] },
    { n:'03', title:'Mechanistic Interpretability', product:'LUMEN', href:'/research/interpretability',
      body:'Understanding what neural networks are actually doing, not just what they output. LUMEN is a 10M+ parameter transformer built from scratch in raw PyTorch — no high-level libraries — paired with attention visualization, activation probing, and gradient attribution tools. The 30% validation loss reduction came from ablation experiments that isolated which architectural choices were doing real work.',
      stats:[{v:'10M+',l:'Parameters'},{v:'30%',l:'Loss reduction'},{v:'30MB',l:'Training data'},{v:'3',l:'Interp. tools'}] },
    { n:'04', title:'Frontier AI', product:'Project Coffeemaker', href:'/products/coffeemaker',
      body:'Project Coffeemaker is our most ambitious research program. We are working on something at the cutting edge of what AI can do — built around verifiability and interpretability as hard constraints, not afterthoughts. We are not ready to say exactly what it is. Active and ongoing.',
      stats:[{v:'Frontier',l:'Class'},{v:'Stealth',l:'Stage'},{v:'2026',l:'Active'},{v:'#1',l:'Priority'}] },
  ];

  const PUBS = [
    { title:'Non-Determinism is an Engineering Failure', venue:'Internal Technical Report · 2025',
      desc:'The theoretical foundation for VERITAS: AI evaluation systems must treat reproducibility as a first-class correctness property, not a best-effort goal.' },
    { title:'Ensemble ViT+ResNet for Oral Cancer Detection: Surpassing Prior Benchmarks', venue:'In Preparation for Peer Review · 2026',
      desc:'99.5% accuracy on 950-image clinical dataset. Full methodology, ablation study, and comparison to four prior published baselines.' },
    { title:'What We Found Inside a 10M Parameter Transformer: LUMEN Interpretability Results', venue:'Technical Report · 2026',
      desc:'Mechanistic interpretability findings from LUMEN: layer-wise probe accuracy, attention pattern analysis, and the 30% loss reduction from depth-vs-width ablation experiments.' },
  ];

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={`${styles.pageHeader} page-header`}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className="section-label rv"><span className="t-label-accent">Research</span></div>
            <h1 className="t-h1 rv">We publish when we have<br />something to prove.</h1>
            <p className="t-body-lg rv" style={{maxWidth:600}}>
              Every paper at Adventura Labs is paired with a working system. We publish when the work is real and the results are verifiable.
            </p>
          </div>
        </div>
      </div>

      {/* CONVICTION QUOTE */}
      <div className={styles.convictionBand}>
        <div className="container">
          <div className="rv">
            <p className={styles.convictionText}>
              "Non-determinism in AI is an engineering failure,<br />not a statistical inevitability."
            </p>
            <p className={styles.convictionSub} style={{marginTop:16}}>The thesis behind every product we build.</p>
          </div>
        </div>
      </div>

      {/* RESEARCH AREAS */}
      <div className={styles.bodySection}>
        <div className="container">
          <div className="section-label rv"><span className="t-label-accent">Research Areas</span></div>
          {AREAS.map((a, i) => (
            <div key={a.n} className={`${styles.researchRow} rv`} style={{transitionDelay:`${i*80}ms`}}>
              <div className={styles.researchMeta}>
                <span className={styles.ruleNum}>{a.n}</span>
                <button className={styles.researchTag} onClick={() => navigate(a.href)}>{a.product} →</button>
              </div>
              <div className={styles.researchBody}>
                <h3 className={styles.ruleTitle}>{a.title}</h3>
                <p className="t-body" style={{marginTop:12, maxWidth:600}}>{a.body}</p>
              </div>
              <div className={styles.researchStats}>
                {a.stats.map(s => (
                  <div key={s.l} className={styles.resStat}>
                    <div className={styles.resStatVal}>{s.v}</div>
                    <div className={styles.resStatLabel}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PUBLICATIONS */}
      <div className={`${styles.bodySection} ${styles.borderedSection}`}>
        <div className="container">
          <div className="section-label rv"><span className="t-label-accent">Publications & Reports</span></div>
          {PUBS.map((p, i) => (
            <div key={i} className={`${styles.pubRow} rv`} style={{transitionDelay:`${i*70}ms`}}>
              <div className={styles.pubVenue}>{p.venue}</div>
              <div className={styles.pubContent}>
                <h3 className={styles.pubTitle}>{p.title}</h3>
                <p className={styles.pubDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DARK BAND */}
      <div className={styles.darkBand}>
        <div className="container">
          <div className="rv">
            <h2 className={styles.darkH2}>Technical depth, full-stack.</h2>
            <p className={styles.darkBody} style={{marginTop:16, maxWidth:540}}>
              We operate across the complete spectrum — from SIMD intrinsics in C++20 to multimodal deep learning in PyTorch.
              The best AI researchers are also strong engineers. We treat these as the same discipline.
            </p>
            <div className={styles.stackGrid} style={{marginTop:24}}>
              {['Python','FastAPI','PostgreSQL','C++20','PyTorch','TensorFlow','React','TypeScript','CUDA','SHA-256','HNSW','AVX2 / NEON'].map(s => (
                <span key={s} className={styles.stackChip}>{s}</span>
              ))}
            </div>
            <button className="btn btn--white" style={{marginTop:32}} onClick={() => navigate('/contact')}>Talk to our research team →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════
   ABOUT
════════════════════════════ */
export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={`${styles.pageHeader} page-header`}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className="section-label rv"><span className="t-label-accent">About</span></div>
            <h1 className="t-h1 rv">We are Adventura Labs.</h1>
            <p className="t-body-lg rv" style={{maxWidth:580}}>
              Founded December 2025 in Pittsburgh, PA. Built from nothing — no co-founder, no template, no institutional backing. Just a conviction that AI that actually works is worth building.
            </p>
          </div>
        </div>
      </div>

      {/* MISSION DARK BAND */}
      <div className={styles.darkBand}>
        <div className="container">
          <div className="rv">
            <h2 className={styles.darkH2}>The mandate is simple.</h2>
            <p className={styles.darkBody} style={{marginTop:20, maxWidth:680, fontSize:'clamp(17px,2vw,22px)', lineHeight:1.6}}>
              Build AI-driven software products that are verifiable, safe, and genuinely useful. Not demo-ware dressed up as product. Software that does something real — in medicine, finance, law, infrastructure. Environments where wrong answers have consequences.
            </p>
          </div>
        </div>
      </div>

      {/* FOUNDER */}
      <div className={styles.bodySection}>
        <div className="container">
          <div className={styles.founderGrid}>
            <div className={styles.founderLeft}>
              <div className="section-label rv"><span className="t-label-accent">Founder</span></div>
              <h2 className="t-h2 rv" style={{marginTop:16}}>Faaz Mohamed</h2>
              <div className={`${styles.founderRole} rv`}>CEO & Founder · Pittsburgh, PA</div>
              <p className="t-body-lg rv" style={{marginTop:20, maxWidth:520}}>
                I founded Adventura Labs because I got tired of waiting for someone else to build the kind of AI company I wanted to exist.
              </p>
              <p className="t-body rv" style={{maxWidth:520}}>
                I operate across the full stack — from SIMD intrinsics in C++20 to multimodal deep learning in PyTorch, to production systems architecture in FastAPI and PostgreSQL. The best AI researchers are also strong engineers. I don't draw a line between the two.
              </p>
              <p className="t-body rv" style={{maxWidth:520}}>
                I'm a sophomore at the University of Pittsburgh. NSF ExLAIM research fellow (2026). CTF competitor. Adventura Labs is not a side project. It is the main event.
              </p>
              <div className={`${styles.founderStats} rv`}>
                {[{v:'5',l:'Products built'},{v:'NSF',l:'Research Fellow'},{v:'3.14',l:'GPA at Pitt'},{v:'Dec 2025',l:'Founded'}].map(s => (
                  <div key={s.l} className={styles.founderStat}>
                    <div className={styles.founderStatVal}>{s.v}</div>
                    <div className={styles.founderStatLabel}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div className={`${styles.founderLinks} rv`}>
                <a href="https://faazmohamed.com" target="_blank" rel="noreferrer" className={styles.founderLink}>faazmohamed.com ↗</a>
                <a href="https://linkedin.com/in/faazmohamed" target="_blank" rel="noreferrer" className={styles.founderLink}>LinkedIn ↗</a>
                <a href="https://github.com/FuzzDOT" target="_blank" rel="noreferrer" className={styles.founderLink}>GitHub ↗</a>
              </div>
            </div>
            <div className={`${styles.founderCard} rv`}>
              <div className={styles.founderAvatar}>FM</div>
              <div className={styles.founderCardName}>Faaz Mohamed</div>
              <div className={styles.founderCardTitle}>CEO & Founder</div>
              <div className={styles.founderCardOrg}>Adventura Labs · Pittsburgh, PA</div>
              <div className={styles.founderDivider} />
              <div className={styles.founderCardSection}>Currently building</div>
              {['Project Coffeemaker','VERITAS v2','LUMEN v1.1'].map(s => (
                <div key={s} className={styles.founderCardItem}>→ {s}</div>
              ))}
              <div className={styles.founderDivider} />
              <div className={styles.founderCardSection}>Core stack</div>
              <div className={styles.founderSkillGrid}>
                {['Python','C++20','PyTorch','FastAPI','React/TS','CUDA'].map(s => (
                  <span key={s} className={styles.founderSkill}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className={`${styles.bodySection} ${styles.borderedSection}`}>
        <div className="container">
          <div className="section-label rv"><span className="t-label-accent">What we believe</span></div>
          <div className={styles.valuesGrid}>
            {[
              {n:'01',t:'Verifiable by design',b:'Every output must be traceable, reproducible, and formally accountable. Statistical plausibility is not a success criterion.'},
              {n:'02',t:'Refusal is a feature',b:'Systems that fail silently are liabilities. We build explicit failure modes and structured degradation — never optimistic catch-alls.'},
              {n:'03',t:'Ship real software',b:'We do not ship demos. Every product is benchmarked against prior work and tested against adversarial inputs before release.'},
              {n:'04',t:'The stakes matter',b:'We build for medicine, finance, law, and infrastructure. Environments where wrong answers have consequences drive every architectural decision.'},
              {n:'05',t:'Engineering is research',b:'The best researchers are strong engineers. The best engineers understand theory. We don\'t draw a line between the two.'},
              {n:'06',t:'Velocity is not a tradeoff',b:'Rigorous engineering and commercial speed are not in tension. Sloppy code is what\'s slow. We ship fast because we build correctly.'},
            ].map((v, i) => (
              <div key={v.n} className={`${styles.valueCard} rv`} style={{transitionDelay:`${i*55}ms`}}>
                <div className={styles.valueNum}>{v.n}</div>
                <h3 className={styles.valueTitle}>{v.t}</h3>
                <p className="t-body" style={{marginTop:10}}>{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className={`${styles.bodySection} ${styles.borderedSection}`}>
        <div className="container">
          <div className={styles.tlLayout}>
            <div>
              <div className="section-label rv"><span className="t-label-accent">Timeline</span></div>
              <h2 className="t-h2 rv" style={{marginTop:16}}>Built in the open.<br />Shipped for real.</h2>
              <p className="t-body rv" style={{marginTop:16, maxWidth:280}}>Every milestone below is a working system, not a roadmap item.</p>
            </div>
            <div className={styles.timeline}>
              {[
                {y:'Dec 2025',e:'Adventura Labs founded',d:'No co-founder. No template. No institutional backing.'},
                {y:'Dec 2025',e:'VERITAS v1 shipped',d:'9 microservices, SHA-256 audit chains, 400+ automated tests.'},
                {y:'Dec 2025',e:'Dr. Help (stealth)',d:'Multimodal clinical AI. 3 input modalities, unified preprocessing.'},
                {y:'May 2026',e:'LUMEN complete',d:'10M+ parameter transformer from scratch. 30% validation loss reduction via ablation. Full interpretability toolkit.'},
                {y:'2026',e:'Project Coffeemaker initiated',d:'Our most ambitious research program begins. We are not ready to say more yet.'},
              ].map((t, i) => (
                <div key={i} className={`${styles.tlRow} rv`} style={{transitionDelay:`${i*55}ms`}}>
                  <div className={styles.tlYear}>{t.y}</div>
                  <div className={styles.tlDot}>
                    <div className={styles.tlDotInner} />
                    {i < 4 && <div className={styles.tlLine} />}
                  </div>
                  <div className={styles.tlContent}>
                    <div className={styles.tlEvent}>{t.e}</div>
                    <div className={styles.tlDesc}>{t.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.darkBand}>
        <div className="container">
          <div className="rv">
            <h2 className={styles.darkH2}>We're just getting started.</h2>
            <p className={styles.darkBody} style={{marginTop:16, maxWidth:480}}>
              If you're serious about building AI that actually works — as an engineer, researcher, investor, or partner — we want to hear from you.
            </p>
            <div style={{display:'flex', gap:12, marginTop:28, flexWrap:'wrap'}}>
              <button className="btn btn--white" onClick={() => navigate('/careers')}>See open roles</button>
              <button className="btn" style={{border:'1px solid var(--dark-border)', color:'var(--dark-text-2)'}} onClick={() => navigate('/contact')}>Get in touch</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════
   BLOG LIST
════════════════════════════ */
export function BlogPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState('All');
  const CATS = ['All','Announcement','Research','Engineering','Company'];
  const filtered = active === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === active);

  return (
    <div className={styles.page}>
      <div className={`${styles.pageHeader} page-header`}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className="section-label rv"><span className="t-label-accent">Blog</span></div>
            <h1 className="t-h1 rv">Thoughts, research,<br />announcements.</h1>
            <p className="t-body-lg rv" style={{maxWidth:520}}>We write when we have something worth saying. Technical depth, no fluff.</p>
          </div>
        </div>
      </div>
      <div className={styles.bodySection}>
        <div className="container">
          <div className={`${styles.catRow} rv`}>
            {CATS.map(c => (
              <button key={c} className={`${styles.catBtn} ${active===c ? styles.catBtnOn : ''}`} onClick={() => setActive(c)}>{c}</button>
            ))}
          </div>
          {filtered.map((post, i) => (
            <div key={post.slug} className={`${styles.blogRow} rv`} style={{transitionDelay:`${i*60}ms`}} onClick={() => navigate(`/blog/${post.slug}`)}>
              <div className={styles.blogRowMeta}>
                <span className={`status-badge status-${post.category==='Announcement'?'beta':'research'}`}><span className="status-dot" />{post.category}</span>
                <span className="t-label">{post.date}</span>
              </div>
              <h2 className={styles.blogRowTitle}>{post.title}</h2>
              <p className={styles.blogRowExcerpt}>{post.excerpt}</p>
              <div className={styles.blogRowRead}>Read article →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════
   BLOG POST
════════════════════════════ */
export function BlogPostPage() {
  const { slug } = useParams<{slug:string}>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  const CONTENT: Record<string, string[]> = {
    'introducing-coffeemaker': [
      "Today we are sharing, for the first time publicly, the existence of Project Coffeemaker.",
      "The name is deliberately unglamorous. We chose it to make a point: whatever sits at the cutting edge of AI, it is plumbing — not magic. It is engineering. You build it with discipline, rigor, and a refusal to accept statistical approximation where formal correctness is achievable.",
      "Most of the industry is approaching the frontier through scale alone. Bigger models, more compute, more data. We think this produces systems that are impressive and unreliable in equal measure — capable of generating convincing output and incapable of telling you whether that output is actually correct.",
      "Our approach is different. Project Coffeemaker is built around verifiability and interpretability as hard architectural constraints, not post-hoc goals. Every inference chain must be traceable. Every output must be formally accountable. We do not ship until those properties hold.",
      "We have more to share soon. This is the beginning.",
    ],
    'non-determinism-engineering-failure': [
      "Here is the problem with most AI evaluation infrastructure: run the same evaluation twice, get different results. Not slightly different — meaningfully different. Different enough to change a product decision.",
      "The industry has accepted this as an inevitable property of AI systems. We disagree. Non-determinism in evaluation is not a statistical inevitability. It is an engineering failure.",
      "VERITAS is our answer. Nine FastAPI microservices. SHA-256 audit chains linking every evaluation to every input, every intermediate state, and every output. Four explicit, named failure modes. And byte-for-byte reproducible pipelines, on demand, for any evaluation we have ever run.",
      "The result is an evaluation platform where 'this model passed our tests last Thursday' means something specific: these inputs, this model version, this evaluation logic, this output hash. Verifiable.",
    ],
    'lumen-interpretability': [
      "Building the model from scratch was a prerequisite for trusting the interpretability results. If you use a library's attention implementation, you do not know exactly what the attention patterns mean.",
      "LUMEN is a 10M+ parameter transformer built entirely in raw PyTorch — tokenization, positional embeddings, multi-head attention, optimization — without relying on Hugging Face, NanoGPT, or any reference codebase. The goal was to understand every tensor operation well enough to instrument it precisely.",
      "The interpretability toolkit consists of three tools: attention visualization (rendering per-head attention weight matrices as heatmaps), activation probing (training linear classifiers on layer-wise hidden states to test for linearly encoded properties), and gradient attribution (computing gradient of output probability with respect to input token embeddings).",
      "The ablation experiments produced a 30% validation loss reduction by systematically isolating the contribution of depth, head count, and hidden dimension to performance. The finding: at this parameter scale, depth dominated over width.",
      "Early layers show strong syntactic structure in attention patterns and probe accuracy. Middle layers show semantic content emerging. Late layers show concentrated gradient attribution on semantically predictive tokens. These findings align with results from larger models in the interpretability literature — suggesting the phenomena are architectural, not scale-dependent.",
    ],
    'oral-cancer-99-5': [
      "Oral carcinoma is the 16th most common cancer globally, with a survival rate that drops from above 80% to below 40% if caught late. The detection gap is a resource problem: early-stage oral lesions are easy to miss without specialized training.",
      "Our research produced an ensemble of a Vision Transformer (ViT-B/16) and ResNet-18 with soft voting over the models' probability distributions. The ViT was selected over the Swin Transformer after controlled evaluation — outperforming by 2.2% validation accuracy with perfect precision.",
      "On a 950-image clinical dataset: 99.5% classification accuracy. 1 false positive, 0 false negatives. Four prior published baselines ranged from 91.2% to 97.4%. We surpassed all of them.",
      "The paper — An Enhanced Hybrid Diagnostic Deep Learning Framework Using Ensemble ViT-ResNets for Oral Carcinoma Detection — is published. DOI: 10.5281/zenodo.20274795.",
    ],
  };

  if (!post) return (
    <div className={styles.page} style={{paddingTop:'var(--nav-h)'}}>
      <div className="container" style={{padding:'120px var(--gutter)'}}>
        <h1 className="t-h2">Post not found.</h1>
        <button className="btn btn--ghost" style={{marginTop:24}} onClick={() => navigate('/blog')}>← Back</button>
      </div>
    </div>
  );

  const paragraphs = CONTENT[post.slug] || [post.excerpt,'Full article coming soon.'];

  return (
    <div className={styles.page}>
      <div className={`${styles.pageHeader} page-header`}>
        <div className="container">
          <button className={`${styles.backLink} rv`} onClick={() => navigate('/blog')}>← All posts</button>
          <div className={`${styles.postMeta} rv`} style={{marginTop:24}}>
            <span className={`status-badge status-${post.category==='Announcement'?'beta':'research'}`}><span className="status-dot" />{post.category}</span>
            <span className="t-label">{post.date}</span>
          </div>
          <h1 className="t-h1 rv" style={{marginTop:20, maxWidth:760}}>{post.title}</h1>
          <div className={`${styles.postAuthor} rv`}>Faaz Mohamed · Adventura Labs</div>
        </div>
      </div>
      <div className={styles.bodySection}>
        <div className="container--narrow">
          {paragraphs.map((p, i) => (
            <p key={i} className={`${styles.postParagraph} rv`} style={{transitionDelay:`${i*60}ms`}}>{p}</p>
          ))}
          <div className={`${styles.postFooter} rv`} style={{transitionDelay:`${paragraphs.length*60}ms`}}>
            <div>
              <div className={styles.postFooterName}>Faaz Mohamed</div>
              <div className={styles.postFooterTitle}>CEO & Founder, Adventura Labs</div>
            </div>
            <button className="btn btn--ghost" onClick={() => navigate('/blog')}>← Back to Blog</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════
   CAREERS
════════════════════════════ */
export function CareersPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={`${styles.pageHeader} page-header`}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className="section-label rv"><span className="t-label-accent">Careers</span></div>
            <h1 className="t-h1 rv">Build AI that matters.<br />Own what you ship.</h1>
            <p className="t-body-lg rv" style={{maxWidth:560}}>
              We're building the most consequential AI company on earth. We need people who believe rigorous engineering and commercial velocity are not a tradeoff.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bodySection}>
        <div className="container">
          <div className="section-label rv"><span className="t-label-accent">Why Adventura Labs</span></div>
          <div className={styles.whyGrid}>
            {[
              {t:'The work is real', b:'Every product we ship is benchmarked, tested, and deployed. You will see your work in production — not a demo environment.'},
              {t:'The problems are hard', b:'Deterministic AI evaluation, systems-level ML infrastructure, and frontier AI research. If you want easy, this isn\'t the place.'},
              {t:'Small team, full ownership', b:'You will own large parts of the system, make real architectural decisions, and directly shape what Adventura Labs becomes.'},
              {t:'Fast and correct', b:'We believe rigorous engineering and commercial velocity are not a tradeoff. Sloppy engineering is what\'s slow. We prove it every sprint.'},
            ].map((w, i) => (
              <div key={w.t} className={`${styles.whyCard} rv`} style={{transitionDelay:`${i*60}ms`}}>
                <h3 className={styles.whyTitle}>{w.t}</h3>
                <p className="t-body" style={{marginTop:10}}>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.bodySection} ${styles.borderedSection}`}>
        <div className="container">
          <div className="section-label rv"><span className="t-label-accent">Open Roles</span></div>
          <div className={styles.roleList}>
            {CAREERS.map((job, i) => (
              <div key={job.title} className={`${styles.roleRow} rv`} style={{transitionDelay:`${i*60}ms`}}>
                <div className={styles.roleInfo}>
                  <div className={styles.roleTitle}>{job.title}</div>
                  <div className={styles.roleMeta}>
                    <span className="status-badge status-beta"><span className="status-dot" />Hiring</span>
                    <span className={styles.roleDept}>{job.dept}</span>
                    <span className={styles.roleSep}>·</span>
                    <span className={styles.roleType}>{job.type}</span>
                    <span className={styles.roleSep}>·</span>
                    <span className={styles.roleLoc}>{job.location}</span>
                  </div>
                </div>
                <button className="btn btn--ghost" onClick={() => navigate('/contact')}>Apply →</button>
              </div>
            ))}
          </div>
          <div className={`${styles.openNote} rv`} style={{marginTop:40}}>
            <h3 className={styles.openNoteTitle}>Don't see your role?</h3>
            <p className="t-body" style={{marginTop:12, maxWidth:500}}>
              If you're an exceptional engineer, researcher, or builder who cares about the work — reach out directly. We hire on quality, not headcount plans.
            </p>
            <button className="btn btn--primary" style={{marginTop:20}} onClick={() => navigate('/contact')}>Reach out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════
   CONTACT
════════════════════════════ */
export function ContactPage() {
  const [form, setForm] = useState({name:'',email:'',company:'',message:'',type:'general'});
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [status, setStatus] = useState<'idle'|'loading'|'done'>('idle');
  const [honeypot, setHoneypot] = useState('');

  const set = (k: string, v: string) => {
    setForm(f => ({...f,[k]:v}));
    setErrors(e => {const n={...e}; delete n[k]; return n;});
  };
  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Required';
    if (!validEmail(form.email)) e.email = 'Invalid email';
    if (!form.message.trim() || form.message.length < 20) e.message = 'At least 20 characters';
    setErrors(e); return Object.keys(e).length === 0;
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) { setStatus('done'); return; }
    if (!validate()) return;
    setStatus('loading');
    console.log('Submission:', {name:sanitize(form.name),email:sanitize(form.email),company:sanitize(form.company),message:sanitize(form.message),type:form.type});
    await new Promise(r => setTimeout(r, 900));
    setStatus('done');
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.pageHeader} page-header`}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className="section-label rv"><span className="t-label-accent">Contact</span></div>
            <h1 className="t-h1 rv">Let's build<br />something real.</h1>
            <p className="t-body-lg rv" style={{maxWidth:520}}>
              We respond to every serious inquiry. Investors, researchers, enterprise partners, press, and potential team members — all welcome.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bodySection}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactLeft}>
              <div className="section-label rv"><span className="t-label-accent">Reach us</span></div>
              <div className={`${styles.contactChannels} rv`}>
                {[
                  {l:'Email',v:'contact@adventuralabs.ai',href:'mailto:contact@adventuralabs.ai'},
                  {l:'LinkedIn',v:'/in/faazmohamed',href:'https://linkedin.com/in/faazmohamed'},
                  {l:'GitHub',v:'github.com/FuzzDOT',href:'https://github.com/FuzzDOT'},
                  {l:'Location',v:'Pittsburgh, PA',href:null},
                ].map(c => (
                  <div key={c.l} className={styles.channelRow}>
                    <span className={styles.channelLabel}>{c.l}</span>
                    {c.href
                      ? <a href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel="noreferrer" className={styles.channelVal}>{c.v}</a>
                      : <span className={styles.channelVal}>{c.v}</span>
                    }
                  </div>
                ))}
              </div>
              <div className={`${styles.contactNote} rv`}>
                <h3 className={styles.contactNoteTitle}>Response time</h3>
                <p className="t-body" style={{marginTop:8}}>We aim to respond to all serious inquiries within 24–48 hours. For investor and partnership inquiries, include relevant context about your firm and what you'd like to discuss.</p>
              </div>
              <div className={`${styles.contactNote} rv`}>
                <h3 className={styles.contactNoteTitle}>Press</h3>
                <p className="t-body" style={{marginTop:8}}>For media inquiries or interview requests, select "Press" in the form. We're happy to discuss our products, research, and the broader questions around verifiable AI.</p>
              </div>
            </div>

            <div className={`${styles.formBox} rv`}>
              {status === 'done' ? (
                <div className={styles.formSuccess}>
                  <div className={styles.successIcon}>✓</div>
                  <div className={styles.successTitle}>Message received.</div>
                  <div className={styles.successSub}>We'll be in touch within 48 hours.</div>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submit} noValidate>
                  <div style={{position:'absolute',left:'-9999px'}} aria-hidden="true">
                    <input tabIndex={-1} name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} autoComplete="off" />
                  </div>
                  <div className={styles.typeRow}>
                    {[{v:'investor',l:'Investor'},{v:'partner',l:'Partnership'},{v:'press',l:'Press'},{v:'careers',l:'Careers'},{v:'general',l:'General'}].map(t => (
                      <button key={t.v} type="button" className={`${styles.typeBtn} ${form.type===t.v?styles.typeBtnOn:''}`} onClick={() => set('type',t.v)}>{t.l}</button>
                    ))}
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="c-name">Name *</label>
                      <input id="c-name" className={`${styles.input} ${errors.name?styles.inputErr:''}`} type="text" value={form.name} onChange={e => set('name',e.target.value)} placeholder="Your name" maxLength={100} autoComplete="name" />
                      {errors.name && <span className={styles.fieldErr}>{errors.name}</span>}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.fieldLabel} htmlFor="c-email">Email *</label>
                      <input id="c-email" className={`${styles.input} ${errors.email?styles.inputErr:''}`} type="email" value={form.email} onChange={e => set('email',e.target.value)} placeholder="you@company.com" maxLength={254} autoComplete="email" />
                      {errors.email && <span className={styles.fieldErr}>{errors.email}</span>}
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="c-co">Company / Organization</label>
                    <input id="c-co" className={styles.input} type="text" value={form.company} onChange={e => set('company',e.target.value)} placeholder="Your organization" maxLength={200} autoComplete="organization" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="c-msg">Message *</label>
                    <textarea id="c-msg" className={`${styles.textarea} ${errors.message?styles.inputErr:''}`} value={form.message} onChange={e => set('message',e.target.value)} placeholder="Tell us what you're thinking about, what you're building, or what you want to discuss..." maxLength={2000} rows={6} />
                    <div className={styles.charCount}>{form.message.length}/2000</div>
                    {errors.message && <span className={styles.fieldErr}>{errors.message}</span>}
                  </div>
                  <button type="submit" className={`btn btn--primary ${styles.submitBtn}`} disabled={status==='loading'}>
                    {status==='loading' ? <><span className={styles.spinner}/>Sending</> : 'Send message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
