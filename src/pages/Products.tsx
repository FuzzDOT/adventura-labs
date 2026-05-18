import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTS } from '../utils/data';
import styles from './Products.module.css';

/* ─── ALL PRODUCTS LIST ─── */
export function ProductsPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <div className={`${styles.header} page-header`}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className="section-label rv"><span className="t-label-accent">Products</span></div>
            <h1 className="t-h1 rv">What we've built.</h1>
            <p className="t-body-lg rv" style={{ maxWidth: 540 }}>
              Four products. Each one a conviction. None of them are demos.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <div className="container">
          {PRODUCTS.filter(p => p.flagship).map(p => (
            <div key={p.id} className={`${styles.flagship} rv`} onClick={() => navigate(`/products/${p.id}`)}>
              <div className={styles.flagshipLabel}><span className="t-label-accent">Flagship · Stealth</span></div>
              <div className={styles.flagshipMain}>
                <div className={styles.flagshipLeft}>
                  <h2 className={styles.flagshipName}>{p.name}</h2>
                  <p className={styles.flagshipTagline}>{p.tagline}</p>
                  <p className="t-body" style={{ maxWidth: 480, marginTop: 16 }}>{p.description}</p>
                </div>
                <div className={styles.flagshipRight}>
                  <span className="status-badge status-stealth"><span className="status-dot" />stealth</span>
                  <div className={styles.flagshipArrow}>→</div>
                </div>
              </div>
            </div>
          ))}
          {PRODUCTS.filter(p => !p.flagship).map((p) => (
            <div key={p.id} className={`${styles.productRow} rv`} onClick={() => navigate(`/products/${p.id}`)}>
              <div className={styles.rowLeft}><span className="t-label">{p.index}</span></div>
              <div className={styles.rowMain}>
                <div className={styles.rowTop}>
                  <h3 className={styles.rowName}>{p.name}</h3>
                  <span className={`status-badge status-${p.status}`}><span className="status-dot" />{p.status}</span>
                </div>
                <p className={styles.rowTagline}>{p.tagline}</p>
                <p className={styles.rowDesc}>{p.description}</p>
              </div>
              <div className={styles.rowStats}>
                {p.stats.slice(0, 2).map(s => (
                  <div key={s.label} className={styles.rowStat}>
                    <div className={styles.rowStatVal}>{s.value}</div>
                    <div className={styles.rowStatLabel}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className={styles.rowArrow}>→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCT DETAIL ROUTER ─── */
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (id === 'veritas') return <VeritasPage />;
  if (id === 'lumen') return <LumenPage />;
  if (id === 'dr-help') return <DrHelpPage />;
  if (id === 'coffeemaker') return <CoffeemakerPage />;

  return (
    <div className={styles.page} style={{ paddingTop: 'var(--nav-h)' }}>
      <div className="container" style={{ padding: '120px var(--gutter)' }}>
        <h1 className="t-h2">Product not found.</h1>
        <button className="btn btn--ghost" style={{ marginTop: 24 }} onClick={() => navigate('/products')}>← Back</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════ */

function ProductBack({ label = 'All products' }: { label?: string }) {
  const navigate = useNavigate();
  return (
    <div className={styles.detailBack}>
      <div className="container">
        <button className={`${styles.backBtn} rv`} onClick={() => navigate('/products')}>← {label}</button>
      </div>
    </div>
  );
}

function StatCallout({ stats }: { stats: { value: string; label: string; sub?: string }[] }) {
  return (
    <div className={`${styles.statCallout} rv`}>
      {stats.map((s, i) => (
        <div key={i} className={styles.statCalloutItem}>
          <div className={styles.statCalloutVal}>{s.value}</div>
          <div className={styles.statCalloutLabel}>{s.label}</div>
          {s.sub && <div className={styles.statCalloutSub}>{s.sub}</div>}
        </div>
      ))}
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className={`${styles.pullQuote} rv`}>
      {children}
    </blockquote>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className={`${styles.sectionDivider} rv`}>
      <span className={styles.sectionDividerLabel}>{label}</span>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className={`${styles.codeBlock} rv`}>
      <pre><code>{children}</code></pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   VERITAS PAGE
═══════════════════════════════════════════════════════ */
function VeritasPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.editorialPage}>
      <ProductBack />

      {/* HERO */}
      <div className={`${styles.editorialHero} page-header`}>
        <div className="container--narrow">
          <div className={styles.editorialMeta}>
            <span className="t-label-accent rv">AI Systems · Auditability</span>
            <span className="t-label rv">December 2025</span>
          </div>
          <h1 className={`${styles.editorialTitle} rv`}>
            Introducing VERITAS
          </h1>
          <p className={`${styles.editorialLede} rv`}>
            A deterministic AI evaluation engine. Nine independently deployable services.
            SHA-256 audit chains on every output. A refusal-first architecture that refuses
            to produce low-confidence results rather than degrade silently. Every evaluation
            byte-for-byte reproducible, months later, on demand.
          </p>
          <div className={`${styles.editorialLinks} rv`}>
            <a href="https://veritas-chi-ten.vercel.app/" target="_blank" rel="noreferrer" className="btn btn--primary">
              View live →
            </a>
            <a href="https://github.com/FuzzDOT/VERITAS" target="_blank" rel="noreferrer" className="btn btn--ghost">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className={styles.editorialBody}>
        <div className="container--narrow">

          <StatCallout stats={[
            { value: '9', label: 'Microservices', sub: 'independently deployable' },
            { value: '427', label: 'Tests passing', sub: '71% overall coverage' },
            { value: '100%', label: 'Model & schema coverage', sub: 'full data-layer guarantees' },
            { value: '4', label: 'Structured failure modes', sub: 'explicit, never silent' },
          ]} />

          <SectionDivider label="The problem" />

          <p className={`${styles.prose} rv`}>
            The standard approach to AI evaluation has a silent failure mode. Run the same evaluation
            twice on a system with any stochastic component — temperature, sampling, batch ordering —
            and you get different results. Run it six months later and the environment has changed.
            Run it after a model update and the comparison is meaningless. The industry has normalized
            this. We decided not to.
          </p>

          <p className={`${styles.prose} rv`}>
            The problem is not just that outputs vary. It is that there is no record of what produced
            a given output. In a consequential evaluation — financial solvency, regulatory compliance,
            clinical risk — "the model said so" is not an audit trail. VERITAS was built to answer a
            specific question: can an AI system make a consequential determination in a way that is
            fully traceable and completely reproducible months later? The answer required solving
            several distinct problems simultaneously.
          </p>

          <PullQuote>
            "A structured REFUSED response with specific missing items is more useful to downstream
            consumers than a degraded evaluation that looks like a real result."
          </PullQuote>

          <SectionDivider label="Architecture" />

          <p className={`${styles.prose} rv`}>
            VERITAS is nine independently deployable FastAPI services. Each service is a bounded
            context with its own database schema, its own container, and its own failure boundary.
            The pipeline runs: API Gateway → Orchestrator → Claim Registration → Evidence Collection
            → Fact Extraction → Reasoning Engine → Audit Logger → Report Generator → Notification.
          </p>

          <p className={`${styles.prose} rv`}>
            The Reasoning Engine is a pure function library — no HTTP interface, no database, no side
            effects. This was a deliberate architectural choice. A networked reasoning service would
            introduce latency, serialization overhead, and a new failure mode for the most critical
            part of the pipeline. Pure functions are testable in isolation, trivially parallelizable,
            and inherently deterministic. Given identical inputs, the Reasoning Engine produces
            identical outputs. Always.
          </p>

          <CodeBlock>{`# Service topology
API Gateway           → auth, rate limiting, request routing
Orchestrator          → workflow coordination, state machine
Claim Registration    → ULID generation, schema validation
Evidence Collection   → async document retrieval, normalization
Fact Extraction       → structured entity extraction from evidence
Reasoning Engine      → pure function evaluation logic (no I/O)
Audit Logger          → SHA-256 hash chain construction
Report Generator      → structured output assembly
Notification          → async delivery, retry logic`}</CodeBlock>

          <SectionDivider label="The audit chain" />

          <p className={`${styles.prose} rv`}>
            Every evaluation entry in the audit log is hashed. Each hash is computed over the entry
            content plus the hash of the previous entry — a SHA-256 hash chain. This means tampering
            with any historical record breaks the chain at that point. No write-once storage required.
            No trusted third party required. The chain is self-authenticating: anyone with the log
            can verify that no entry has been modified since it was written.
          </p>

          <p className={`${styles.prose} rv`}>
            ULID identifiers are used throughout rather than UUIDs. The difference matters at scale:
            ULIDs are time-sortable, which preserves database index locality as records insert and
            makes time-window queries readable without parsing timestamps. A small choice with real
            performance and maintainability implications.
          </p>

          <StatCallout stats={[
            { value: 'SHA-256', label: 'Hash algorithm', sub: 'chained across all audit entries' },
            { value: 'ULID', label: 'Identifier scheme', sub: 'time-sortable, DB index locality' },
            { value: '8', label: 'Database tables', sub: 'PostgreSQL + async SQLAlchemy' },
            { value: 'MinIO/S3', label: 'Object storage', sub: 'evidence blobs, report artifacts' },
          ]} />

          <SectionDivider label="Refusal-first design" />

          <p className={`${styles.prose} rv`}>
            VERITAS has four structured failure modes: <code>MISSING_EVIDENCE</code>,
            {' '}<code>INSUFFICIENT_FACTS</code>, <code>CONFLICTING_DATA</code>,
            {' '}and <code>POLICY_VIOLATION</code>. When any of these conditions are met, the system
            refuses to produce an evaluation. It returns a structured REFUSED response that specifies
            exactly which condition was triggered and which required inputs were missing or invalid.
          </p>

          <p className={`${styles.prose} rv`}>
            This is a deliberate epistemic stance. A degraded evaluation — one that looks like a real
            result but was produced under insufficient evidence — is worse than no evaluation at all.
            It gives downstream consumers false confidence and pollutes the audit record with a result
            that should never have been produced. The refusal-first policy makes the system's
            uncertainty explicit rather than hiding it behind a plausible-looking output.
          </p>

          <PullQuote>
            "Explicit failure is more useful than silent degradation. VERITAS was designed
            to say 'I cannot evaluate this' rather than 'here is my best guess.'"
          </PullQuote>

          <SectionDivider label="Testing philosophy" />

          <p className={`${styles.prose} rv`}>
            427 tests passing. 71% overall coverage. 100% coverage on all data models and API schemas.
            The coverage split is intentional. Data models and API schemas are the contract between
            services — any untested path there is an undocumented behavior that can break silently
            when consumers change. Everywhere else, 71% reflects the reality that integration tests
            on the pure Reasoning Engine cover more meaningful behavior than line coverage metrics
            would suggest.
          </p>

          <p className={`${styles.prose} rv`}>
            Each microservice has an independent test suite runnable without the rest of the system.
            The Reasoning Engine tests are entirely in-memory. No Docker, no database, no network.
            This is the only way to make the tests run fast enough to actually run them.
          </p>

          <SectionDivider label="Stack" />

          <div className={`${styles.tagList} rv`}>
            {['Python', 'FastAPI', 'PostgreSQL', 'async SQLAlchemy', 'MinIO / S3', 'Docker', 'pydantic', 'structlog', 'pytest', 'SHA-256', 'ULID'].map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>

          <div className={`${styles.editorialFooter} rv`}>
            <div className={styles.editorialFooterLinks}>
              <a href="https://veritas-chi-ten.vercel.app/" target="_blank" rel="noreferrer" className="btn btn--primary">
                View live deployment →
              </a>
              <a href="https://github.com/FuzzDOT/VERITAS" target="_blank" rel="noreferrer" className="btn btn--ghost">
                GitHub ↗
              </a>
            </div>
            <button className={styles.editorialNext} onClick={() => navigate('/products/lumen')}>
              Next: LUMEN →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LUMEN PAGE
═══════════════════════════════════════════════════════ */
function LumenPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.editorialPage}>
      <ProductBack />

      {/* HERO */}
      <div className={`${styles.editorialHero} page-header`}>
        <div className="container--narrow">
          <div className={styles.editorialMeta}>
            <span className="t-label-accent rv">ML Research · Interpretability</span>
            <span className="t-label rv">March 2026</span>
          </div>
          <h1 className={`${styles.editorialTitle} rv`}>
            Introducing LUMEN
          </h1>
          <p className={`${styles.editorialLede} rv`}>
            A 10M+ parameter transformer language model built from scratch — no high-level
            model libraries — paired with a full mechanistic interpretability toolkit.
            Attention visualization, activation probing, gradient attribution. Built to
            understand what neural networks are actually doing, not just what they output.
          </p>
          <div className={`${styles.editorialLinks} rv`}>
            <a href="https://github.com/FuzzDOT/LUMEN" target="_blank" rel="noreferrer" className="btn btn--primary">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className={styles.editorialBody}>
        <div className="container--narrow">

          <StatCallout stats={[
            { value: '10M+', label: 'Parameters', sub: 'built without high-level libraries' },
            { value: '30MB', label: 'Training corpus', sub: 'Project Gutenberg classic literature' },
            { value: '30%', label: 'Validation loss reduction', sub: 'via targeted ablation' },
            { value: '3', label: 'Interpretability tools', sub: 'attention, probing, attribution' },
          ]} />

          <SectionDivider label="Why build from scratch" />

          <p className={`${styles.prose} rv`}>
            If you use a library's attention implementation, you do not know exactly what the
            attention patterns mean. The implementation details — how queries and keys are scaled,
            how the softmax is computed, whether there is any numerical stabilization happening —
            affect what the attention weights actually represent. Using a black box to study a
            black box produces results you cannot fully trust.
          </p>

          <p className={`${styles.prose} rv`}>
            LUMEN was built from scratch because the interpretability work required it. Every
            component — tokenization, positional embeddings, multi-head attention, the feed-forward
            network, layer normalization, gradient-based optimization — was implemented directly
            in raw PyTorch, without relying on Hugging Face, Karpathy's NanoGPT, or any other
            reference implementation as a codebase. The goal was to understand every tensor
            operation well enough to instrument it precisely.
          </p>

          <PullQuote>
            "Building the model from scratch was a prerequisite for trusting the interpretability
            results. If you use a library's attention implementation, you do not know exactly
            what the attention patterns mean."
          </PullQuote>

          <SectionDivider label="Architecture" />

          <p className={`${styles.prose} rv`}>
            The model is a decoder-only transformer with 10M+ parameters trained on 30MB of
            public domain classic literature from Project Gutenberg. The corpus was chosen
            deliberately: literary prose has consistent long-range dependencies, complex syntactic
            structures, and meaningful semantic content — all properties that make interpretability
            experiments more informative than on purely technical text.
          </p>

          <p className={`${styles.prose} rv`}>
            The architecture follows the standard decoder-only layout — causal self-attention,
            feed-forward sublayers, residual connections, layer normalization — but implemented
            at the tensor level. This meant writing the multi-head attention mechanism as explicit
            matrix multiplications with the correct causal mask, rather than calling
            {' '}<code>torch.nn.MultiheadAttention</code>. The tokenizer is a character-level
            BPE implementation, again written from scratch, because character-level tokenization
            makes the relationship between tokens and model internals more interpretable.
          </p>

          <StatCallout stats={[
            { value: 'Decoder-only', label: 'Architecture', sub: 'causal self-attention' },
            { value: 'BPE', label: 'Tokenizer', sub: 'character-level, from scratch' },
            { value: 'Raw PyTorch', label: 'Implementation', sub: 'no nn.MultiheadAttention' },
            { value: 'AdamW', label: 'Optimizer', sub: 'with cosine annealing' },
          ]} />

          <SectionDivider label="The interpretability toolkit" />

          <p className={`${styles.prose} rv`}>
            LUMEN ships with three interpretability tools, each targeting a different level of
            the model's internals.
          </p>

          <p className={`${styles.prose} rv`}>
            <strong>Attention visualization</strong> renders per-head, per-layer attention weight
            matrices as heatmaps over token sequences. The implementation hooks into the attention
            computation to extract the pre-softmax scores (logits) as well as the post-softmax
            weights, allowing comparison between what the model "considered" and what it
            "attended to" after normalization.
          </p>

          <p className={`${styles.prose} rv`}>
            <strong>Activation probing</strong> trains lightweight linear classifiers on the
            hidden state activations at each layer to test whether specific semantic or syntactic
            properties are linearly encoded in the representation. Probe accuracy across layers
            reveals where in the network a property is learned — and crucially, whether it
            persists or decays in later layers.
          </p>

          <p className={`${styles.prose} rv`}>
            <strong>Gradient attribution</strong> computes the gradient of the model's output
            probability with respect to each input token embedding, producing a saliency map
            that shows which input tokens most influenced the prediction. This technique is
            model-agnostic but particularly clean here because we have full access to the
            computation graph.
          </p>

          <SectionDivider label="Ablation experiments" />

          <p className={`${styles.prose} rv`}>
            The 30% validation loss reduction was not the result of a lucky hyperparameter search.
            It came from controlled ablation experiments that isolated the contribution of
            specific architectural choices to model performance.
          </p>

          <p className={`${styles.prose} rv`}>
            The experiments systematically varied depth (number of layers), attention head count,
            hidden dimension size, and learning rate schedule, while holding other variables fixed.
            Each configuration was trained to convergence on the same corpus split. The results
            showed that for this corpus size and model scale, depth dominated over width — adding
            layers was more effective than widening existing layers — and that attention head count
            had diminishing returns past 4 heads at this parameter count.
          </p>

          <PullQuote>
            "The 30% validation loss reduction via ablation experiments was not a lucky
            hyperparameter search — it was the result of understanding which architectural
            choices were doing real work and which were not."
          </PullQuote>

          <SectionDivider label="What we found" />

          <p className={`${styles.prose} rv`}>
            The interpretability experiments produced several concrete findings. Early layers
            (layers 1–3) show strong syntactic structure in both attention patterns and probe
            accuracy — high probe accuracy for part-of-speech and basic clause boundaries.
            Middle layers (4–6) show the emergence of semantic content: probe accuracy for
            entity type and semantic role increases sharply. Late layers (7+) show degraded
            probe accuracy for syntactic properties and concentrated gradient attribution on
            semantically predictive tokens.
          </p>

          <p className={`${styles.prose} rv`}>
            The attention visualization results confirmed the layer-level pattern: early attention
            heads show local, syntactic attention patterns (attending to adjacent tokens and
            clause boundaries), while later heads show longer-range, more diffuse patterns
            consistent with semantic composition. These findings align with results from larger
            models in the interpretability literature, which is a useful sanity check — it
            suggests the phenomena are architectural rather than scale-dependent.
          </p>

          <SectionDivider label="Stack" />

          <div className={`${styles.tagList} rv`}>
            {['Python', 'PyTorch', 'Raw attention impl.', 'BPE tokenizer', 'Gradient attribution', 'Activation probing', 'Attention visualization', 'Ablation experiments'].map(t => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>

          <div className={`${styles.editorialFooter} rv`}>
            <div className={styles.editorialFooterLinks}>
              <a href="https://github.com/FuzzDOT/LUMEN" target="_blank" rel="noreferrer" className="btn btn--primary">
                GitHub ↗
              </a>
            </div>
            <button className={styles.editorialNext} onClick={() => navigate('/products/dr-help')}>
              Next: Dr. Help →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DR. HELP PAGE
═══════════════════════════════════════════════════════ */
function DrHelpPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.editorialPage}>
      <ProductBack />
      <div className={`${styles.editorialHero} page-header`}>
        <div className="container--narrow">
          <div className={styles.editorialMeta}>
            <span className="t-label-accent rv">Healthcare AI · Multimodal</span>
            <span className="t-label rv">2026 · Stealth</span>
          </div>
          <h1 className={`${styles.editorialTitle} rv`}>Dr. Help</h1>
          <p className={`${styles.editorialLede} rv`}>
            Multimodal clinical decision support AI synthesizing text, structured patient data, and
            medical imaging through a unified preprocessing pipeline. Built for real clinical
            workflows — not demo environments where inputs are clean and stakes are low.
          </p>
        </div>
      </div>
      <div className={styles.editorialBody}>
        <div className="container--narrow">
          <StatCallout stats={[
            { value: '3', label: 'Input modalities', sub: 'text, structured data, imaging' },
            { value: 'Unified', label: 'Preprocessing pipeline', sub: 'single normalization layer' },
            { value: 'Stealth', label: 'Stage', sub: 'active development' },
            { value: 'Clinical', label: 'Target domain', sub: 'real workflow constraints' },
          ]} />
          <SectionDivider label="The problem" />
          <p className={`${styles.prose} rv`}>
            Clinical decision support tools typically fail at the data layer, not the model layer.
            Real patient data arrives in three forms simultaneously: unstructured text (physician
            notes, discharge summaries, referral letters), structured records (lab values, vitals,
            medication history), and imaging (X-rays, CTs, pathology slides). Most tools handle
            one of these well and paper over the others. Dr. Help treats multimodal fusion as a
            first-class engineering problem.
          </p>
          <p className={`${styles.prose} rv`}>
            The unified preprocessing pipeline normalizes all three input modalities into a shared
            representational space before any model inference occurs. This is the architectural
            decision that distinguishes Dr. Help from systems that concatenate modal representations
            and hope the model learns to reconcile them. Reconciliation happens at the data layer,
            where it can be tested, monitored, and debugged independently of the model.
          </p>
          <PullQuote>
            "Most multimodal clinical AI fails at the data layer, not the model layer.
            Dr. Help was built to treat multimodal fusion as a first-class engineering problem."
          </PullQuote>
          <SectionDivider label="Status" />
          <p className={`${styles.prose} rv`}>
            Dr. Help is in active stealth development. Architecture and initial pipeline work is
            complete. Model development and clinical validation are ongoing. We will share more
            when we are ready.
          </p>
          <div className={`${styles.editorialFooter} rv`}>
            <button className="btn btn--primary" onClick={() => navigate('/contact')}>
              Inquire about access →
            </button>
            <button className={styles.editorialNext} onClick={() => navigate('/products/coffeemaker')}>
              Next: Project Coffeemaker →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   COFFEEMAKER PAGE
═══════════════════════════════════════════════════════ */
function CoffeemakerPage() {
  const navigate = useNavigate();
  return (
    <div className={`${styles.editorialPage} ${styles.cmEditorialPage}`} data-nav-dark="true">
      <ProductBack />
      <div className={`${styles.editorialHero} ${styles.cmHero} page-header`}>
        <div className="container--narrow">
          <div className={styles.editorialMeta}>
            <span className="rv" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,242,235,0.4)' }}>Advanced AI Research</span>
            <span className="rv" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,242,235,0.4)' }}>2026 · Stealth</span>
          </div>
          <h1 className={`${styles.editorialTitle} ${styles.cmTitle} rv`}>
            Project Coffeemaker
          </h1>
          <p className={`${styles.editorialLede} ${styles.cmLede} rv`}>
            Our most ambitious project. We are pushing the frontier of what AI can do.
            Not a product that demos well — something more fundamental than that.
            Verifiable. Interpretable. Built to last. Coming soon.
          </p>
        </div>
      </div>
      <div className={`${styles.editorialBody} ${styles.cmBody}`}>
        <div className="container--narrow">
          <p className={`${styles.prose} ${styles.cmProse} rv`}>
            The name is deliberately unglamorous. We chose it to make a point: whatever the
            cutting edge of AI looks like, it is plumbing — not magic. It is engineering.
            You build it with discipline, rigor, and a refusal to accept "probably correct"
            where verifiably correct is achievable.
          </p>
          <p className={`${styles.prose} ${styles.cmProse} rv`}>
            Most approaches to frontier AI are approaches to scale. More parameters, more compute, more data.
            We believe this produces systems that are impressive and unreliable in equal measure —
            capable of generating convincing text about a surgical procedure and incapable of
            telling you whether the procedure it described was actually correct.
          </p>
          <p className={`${styles.prose} ${styles.cmProse} rv`}>
            Project Coffeemaker is built around verifiability and interpretability as hard
            architectural constraints. Every inference chain must be traceable. Every output must
            be formally accountable. We do not ship until those properties hold.
            We are not ready to share more. When we are, you will hear about it.
          </p>
          <p className={`${styles.prose} ${styles.cmProse} rv`}>
            We are not ready to share more. When we are, you will hear from us.
          </p>
          <div className={`${styles.editorialFooter} rv`}>
            <button className="btn btn--white" onClick={() => navigate('/contact')}>
              Get in touch →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
