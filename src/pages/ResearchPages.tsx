import { useNavigate } from 'react-router-dom';
import pStyles from './Products.module.css';
import styles from './ResearchPages.module.css';

/* ─── Shared editorial primitives (mirrors Products.tsx) ─── */
function Back() {
  const navigate = useNavigate();
  return (
    <div className={pStyles.detailBack}>
      <div className="container">
        <button className={`${pStyles.backBtn} rv`} onClick={() => navigate('/research')}>← Research</button>
      </div>
    </div>
  );
}
function Stat({ stats }: { stats: { value: string; label: string; sub?: string }[] }) {
  return (
    <div className={`${pStyles.statCallout} rv`}>
      {stats.map((s, i) => (
        <div key={i} className={pStyles.statCalloutItem}>
          <div className={pStyles.statCalloutVal}>{s.value}</div>
          <div className={pStyles.statCalloutLabel}>{s.label}</div>
          {s.sub && <div className={pStyles.statCalloutSub}>{s.sub}</div>}
        </div>
      ))}
    </div>
  );
}
function Q({ children }: { children: React.ReactNode }) {
  return <blockquote className={`${pStyles.pullQuote} rv`}>{children}</blockquote>;
}
function Div({ label }: { label: string }) {
  return (
    <div className={`${pStyles.sectionDivider} rv`}>
      <span className={pStyles.sectionDividerLabel}>{label}</span>
    </div>
  );
}
function Code({ children }: { children: string }) {
  return (
    <div className={`${pStyles.codeBlock} rv`}>
      <pre><code>{children}</code></pre>
    </div>
  );
}
function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p className={`${pStyles.prose} rv`} style={style}>{children}</p>;
}
function Tags({ tags }: { tags: string[] }) {
  return (
    <div className={`${pStyles.tagList} rv`}>
      {tags.map(t => <span key={t} className={pStyles.tag}>{t}</span>)}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   DETERMINISTIC AI
══════════════════════════════════════════════════════════════ */
export function DeterministicPage() {
  const navigate = useNavigate();
  return (
    <div className={pStyles.editorialPage}>
      <Back />

      <div className={`${pStyles.editorialHero} page-header`}>
        <div className="container--narrow">
          <div className={pStyles.editorialMeta}>
            <span className="t-label-accent rv">Research · Deterministic AI</span>
            <span className="t-label rv">2025 – Present</span>
          </div>
          <h1 className={`${pStyles.editorialTitle} rv`}>
            Non-Determinism is an<br />Engineering Failure
          </h1>
          <p className={`${pStyles.editorialLede} rv`}>
            The AI industry has normalized a silent failure mode: give the same system
            the same inputs twice and get different outputs. We treat this not as an
            inevitable property of probabilistic systems, but as an engineering decision
            someone made — and decided not to fix. This is the research program that
            produced VERITAS.
          </p>
          <div className={`${pStyles.editorialLinks} rv`}>
            <button className="btn btn--primary" onClick={() => navigate('/products/veritas')}>
              See VERITAS →
            </button>
          </div>
        </div>
      </div>

      <div className={pStyles.editorialBody}>
        <div className="container--narrow">

          <Stat stats={[
            { value: '100%', label: 'Output determinism', sub: 'identical inputs → identical outputs, always' },
            { value: 'SHA-256', label: 'Audit chain standard', sub: 'chained across every evaluation entry' },
            { value: '4', label: 'Explicit failure modes', sub: 'MISSING_EVIDENCE · INSUFFICIENT_FACTS · CONFLICTING_DATA · POLICY_VIOLATION' },
            { value: '427', label: 'Automated tests', sub: '100% coverage on all models and API schemas' },
          ]} />

          <Div label="The problem statement" />

          <P>
            Consider an AI evaluation system used to assess financial solvency claims. A compliance
            officer runs an evaluation on Monday, gets a PASS result. Runs it again on Friday against
            the same inputs, gets a FAIL. The system has changed nothing externally — same document,
            same model version — but internal sampling temperature, batch ordering, or floating-point
            nondeterminism at the GPU level produces a different result. Which one do they report?
            Which one is correct? There is no way to know.
          </P>

          <P>
            This is not a contrived scenario. It is the default behavior of most AI systems deployed
            in production today. The standard response from the industry is to treat this as a
            fundamental property of stochastic systems — unavoidable, to be managed with
            statistical confidence intervals rather than eliminated.
          </P>

          <P>
            We disagree. Non-determinism in an AI evaluation system is not a property of AI.
            It is a property of specific implementation choices: non-zero temperature, unseeded
            random number generators, non-deterministic GPU operations, mutable shared state
            across calls. Each of these is an engineering decision. Each can be reversed.
          </P>

          <Q>
            "The question isn't whether determinism is achievable. It is whether someone decided
            it was worth the engineering cost. We decided it was."
          </Q>

          <Div label="Sources of non-determinism and how we eliminate each" />

          <P>
            Achieving true output determinism requires identifying and eliminating every source
            of non-determinism in the evaluation pipeline. There are four distinct categories.
          </P>

          <P>
            <strong>Sampling temperature.</strong> Any LLM call with temperature {'>'} 0 introduces
            stochastic output selection. The fix is simple but requires discipline across every
            call site: force temperature = 0 for all evaluation-path inference. This is not always
            possible with third-party model APIs — VERITAS treats any model call that cannot
            guarantee deterministic output as an untrusted external dependency, wrapping it in
            a normalization layer that extracts structured facts before they enter the pure
            evaluation logic.
          </P>

          <P>
            <strong>Unseeded randomness.</strong> Python's <code>random</code> module, NumPy,
            and PyTorch all use global random state that, if not explicitly seeded, produces
            different sequences across runs. VERITAS seeds all random state at service startup
            with a fixed seed stored in configuration, and passes it explicitly through the
            call graph rather than relying on global state. Any function that requires random
            values receives its seed as a parameter — this makes random usage explicit,
            testable, and reproducible.
          </P>

          <P>
            <strong>Floating-point nondeterminism.</strong> GPU floating-point operations are
            not always associative. The order in which parallel threads reduce a sum can
            produce different bit patterns even with identical inputs. VERITAS avoids GPU
            inference in the evaluation hot path entirely — the Reasoning Engine is a pure
            CPU library. For any embedding or inference that requires GPU acceleration,
            results are cached and fingerprinted before entering the evaluation pipeline.
          </P>

          <P>
            <strong>Mutable shared state.</strong> Any global or shared mutable state — caches,
            counters, connection pools — can cause evaluation behavior to depend on call history.
            VERITAS isolates evaluation state per-request: each evaluation gets a fresh context
            object containing all state it needs, with no reference to shared mutable globals.
            This is enforced at the type level — context objects are frozen dataclasses.
          </P>

          <Code>{`# VERITAS context model — frozen, no shared state
@dataclass(frozen=True)
class EvaluationContext:
    evaluation_id: ULID
    claim: VerifiedClaim
    evidence: tuple[Evidence, ...]       # immutable — no list mutations
    facts: tuple[ExtractedFact, ...]     # immutable — built before reasoning begins
    policy: PolicyVersion
    seed: int                            # explicit, not from global state
    timestamp: datetime                  # fixed at context creation, not call time

# Reasoning Engine — pure function, no I/O, no side effects
def evaluate(ctx: EvaluationContext) -> EvaluationResult:
    # Given identical ctx, always returns identical result.
    # Provable by inspection: no random calls, no I/O, no global reads.
    ...`}</Code>

          <Div label="The hash chain architecture" />

          <P>
            Deterministic outputs solve half the problem. The other half is auditability:
            proving, months later, that the output was what the system claims it was, and
            that neither the output nor the inputs have been modified since.
          </P>

          <P>
            VERITAS implements a SHA-256 hash chain across all audit log entries. Each entry
            contains: the evaluation ID, the input fingerprints (SHA-256 of each evidence
            document), the full evaluation output, a timestamp, and the hash of the previous
            entry. The entry hash is computed over all of these fields concatenated in a
            canonical order. This means:
          </P>

          <P>
            Any modification to any historical entry breaks the chain. An auditor can verify
            chain integrity by recomputing each entry hash and checking it matches the
            stored value and matches the <code>previous_hash</code> field of the next entry.
            No trusted timestamping service required. No write-once storage required.
            The chain is self-verifying.
          </P>

          <Code>{`# Hash chain construction
def compute_entry_hash(
    evaluation_id: str,
    input_fingerprints: list[str],
    output: EvaluationResult,
    timestamp: str,
    previous_hash: str,
) -> str:
    # Canonical serialization — field order is fixed, not dict iteration order
    canonical = "\\n".join([
        evaluation_id,
        ",".join(sorted(input_fingerprints)),  # sorted for stability
        output.model_dump_json(sort_keys=True), # pydantic, deterministic
        timestamp,
        previous_hash,
    ])
    return hashlib.sha256(canonical.encode()).hexdigest()

# Verification — O(n) over the log
def verify_chain(entries: list[AuditEntry]) -> VerificationResult:
    for i, entry in enumerate(entries):
        expected_hash = compute_entry_hash(
            entry.evaluation_id,
            entry.input_fingerprints,
            entry.output,
            entry.timestamp,
            entries[i-1].hash if i > 0 else GENESIS_HASH,
        )
        if expected_hash != entry.hash:
            return VerificationResult(
                valid=False,
                broken_at=i,
                entry_id=entry.evaluation_id,
            )
    return VerificationResult(valid=True)`}</Code>

          <Div label="Refusal-first: the epistemics of AI evaluation" />

          <P>
            Determinism and auditability solve the reproducibility problem. The third problem
            is epistemic: what should a system do when it does not have sufficient evidence
            to produce a valid evaluation?
          </P>

          <P>
            The standard approach is graceful degradation: produce a lower-confidence output,
            flag it somehow, and let the downstream consumer decide what to do with it.
            We believe this is wrong for consequential evaluation tasks.
          </P>

          <P>
            A degraded evaluation is indistinguishable from a valid one in the audit log unless
            the consumer reads the confidence flag. Consumers often don't. A PASS result with
            0.6 confidence that was produced under missing evidence looks identical to a PASS
            result with 0.99 confidence produced under full evidence — both are PASS. One of
            them is a failure of the evaluation system that has been disguised as a result.
          </P>

          <P>
            VERITAS uses explicit structured refusal instead. Four failure modes, each with
            a specific meaning:
          </P>

          <Code>{`class EvaluationFailureMode(Enum):
    MISSING_EVIDENCE      = "MISSING_EVIDENCE"
    # Required evidence documents were not found or could not be retrieved.
    # The evaluation cannot proceed without them.

    INSUFFICIENT_FACTS    = "INSUFFICIENT_FACTS"
    # Evidence was retrieved but fact extraction yielded fewer than the
    # required minimum facts for the evaluation type. The evidence exists
    # but does not contain what the evaluation needs.

    CONFLICTING_DATA      = "CONFLICTING_DATA"
    # Extracted facts contradict each other in a way the policy does not
    # resolve. The system cannot determine which facts are authoritative.

    POLICY_VIOLATION      = "POLICY_VIOLATION"
    # The evaluation would require reasoning outside the bounds of the
    # current policy version. The policy must be updated before proceeding.

@dataclass(frozen=True)
class RefusalResult:
    failure_mode: EvaluationFailureMode
    missing_items: tuple[str, ...]    # specific identifiers, not generic messages
    policy_version: str               # which policy triggered the refusal
    timestamp: datetime
    # No confidence score. No partial result. No "best guess."
    # A refusal is not a result. It is a statement about the evaluation's limits.`}</Code>

          <Q>
            "A structured REFUSED response with specific missing items is more informative
            to downstream consumers than a degraded evaluation that looks like a real result.
            Explicit failure is a feature, not a fallback."
          </Q>

          <Div label="Service decomposition and failure isolation" />

          <P>
            The nine-service architecture is not microservices for its own sake. Each service
            boundary corresponds to a distinct failure domain with a distinct failure mode.
            Service decomposition means a failure in evidence retrieval does not affect the
            reasoning engine. A failure in notification does not prevent the audit log from
            being written.
          </P>

          <P>
            The Reasoning Engine is the most critical service. It is also the simplest: a pure
            function library with no network interface. It cannot fail due to network issues.
            It cannot be rate-limited. It cannot have its behavior changed by a service restart.
            Given the same frozen <code>EvaluationContext</code>, it produces the same result
            in any environment where the binary is the same.
          </P>

          <P>
            This is the architectural expression of the determinism principle: move all
            non-determinism to the edges of the pipeline, where it can be bounded and tested,
            and keep the evaluation core free of any external dependencies.
          </P>

          <Stat stats={[
            { value: 'API Gateway', label: 'Service 1', sub: 'auth, rate limiting, routing' },
            { value: 'Orchestrator', label: 'Service 2', sub: 'workflow state machine' },
            { value: 'Claim Reg.', label: 'Services 3–4', sub: 'ULID generation, schema validation' },
            { value: 'Reasoning', label: 'Service 7', sub: 'pure function, no I/O, no state' },
          ]} />

          <Div label="Testing a deterministic system" />

          <P>
            Testing a deterministic system has a property that stochastic systems lack:
            a failing test always means the same thing. There is no flakiness. A test that
            fails 1 in 100 runs does not exist in a deterministic system — if a test fails,
            it fails consistently, which means it is either catching a real bug or it is
            wrong. This makes the test suite trustworthy in a way that probabilistic system
            tests are not.
          </P>

          <P>
            VERITAS achieves 100% coverage on all data models and API schemas. This is the
            right place to invest: data models and schemas are the contracts between services.
            An untested code path in a schema validator means an undocumented input that
            can silently pass or fail validation depending on implementation details a consumer
            should not need to know.
          </P>

          <P>
            The 71% overall coverage reflects a deliberate prioritization: pure function
            coverage (Reasoning Engine) counts for more than line coverage of I/O wrappers
            (notification handlers, MinIO upload utilities). A 100% tested Reasoning Engine
            running on 100% tested schemas gives high confidence in the evaluation path
            even without exhaustive integration test coverage.
          </P>

          <Tags tags={['Python', 'FastAPI', 'PostgreSQL', 'async SQLAlchemy', 'SHA-256 hash chains', 'ULID', 'pydantic frozen dataclasses', 'structlog', 'MinIO / S3', 'Docker', 'pytest', 'Deterministic inference']} />

          <div className={`${pStyles.editorialFooter} rv`}>
            <div className={pStyles.editorialFooterLinks}>
              <button className="btn btn--primary" onClick={() => navigate('/products/veritas')}>See VERITAS →</button>
              <button className="btn btn--ghost" onClick={() => navigate('/research/interpretability')}>Next: Mechanistic Interpretability →</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   MECHANISTIC INTERPRETABILITY
══════════════════════════════════════════════════════════════ */
export function InterpretabilityPage() {
  const navigate = useNavigate();
  return (
    <div className={pStyles.editorialPage}>
      <Back />

      <div className={`${pStyles.editorialHero} page-header`}>
        <div className="container--narrow">
          <div className={pStyles.editorialMeta}>
            <span className="t-label-accent rv">Research · Mechanistic Interpretability</span>
            <span className="t-label rv">2026 – Present</span>
          </div>
          <h1 className={`${pStyles.editorialTitle} rv`}>
            Opening the<br />Black Box
          </h1>
          <p className={`${pStyles.editorialLede} rv`}>
            Mechanistic interpretability asks a harder question than behavioral evaluation:
            not "does the model output the right answer?" but "what computation did it
            perform to get there?" LUMEN was built to answer this question at the
            implementation level — every component written from scratch so that every
            internal state can be precisely instrumented.
          </p>
          <div className={`${pStyles.editorialLinks} rv`}>
            <button className="btn btn--primary" onClick={() => navigate('/products/lumen')}>See LUMEN →</button>
          </div>
        </div>
      </div>

      <div className={pStyles.editorialBody}>
        <div className="container--narrow">

          <Stat stats={[
            { value: '10M+', label: 'Parameters', sub: 'decoder-only transformer, no libraries' },
            { value: '3', label: 'Interpretability tools', sub: 'attention viz · activation probing · gradient attribution' },
            { value: '30%', label: 'Validation loss reduction', sub: 'via targeted depth-vs-width ablation' },
            { value: 'Layer 4–6', label: 'Semantic emergence', sub: 'confirmed via probe accuracy curves' },
          ]} />

          <Div label="Why mechanistic interpretability" />

          <P>
            The standard evaluation paradigm for language models is behavioral: measure
            accuracy on benchmarks, measure performance on downstream tasks, measure
            calibration of output probabilities. This tells you what a model does. It does
            not tell you how.
          </P>

          <P>
            Mechanistic interpretability takes a different approach. It treats the neural
            network as a program to be reverse-engineered — asking which circuits, components,
            and representations are causally responsible for specific behaviors. The goal is not
            just to know that a model gets the right answer but to understand the computational
            mechanism by which it gets there.
          </P>

          <P>
            This matters for two reasons. First, behavioral evaluation is brittle: a model that
            produces the right output via the wrong mechanism can fail on out-of-distribution
            inputs in ways behavioral tests do not predict. Second, understanding mechanisms
            is a prerequisite for interventions: if you want to modify a model's behavior,
            knowing which components implement that behavior tells you where to intervene.
          </P>

          <Q>
            "Behavioral evaluation tells you what a model does. Mechanistic interpretability
            tells you how. The distinction matters most when the model fails in unexpected ways."
          </Q>

          <Div label="Why building from scratch was necessary" />

          <P>
            The interpretability toolkit in LUMEN requires access to internal model states
            that standard frameworks do not expose by default: pre-softmax attention logits,
            per-layer residual stream activations before and after each sublayer, gradient
            signal decomposed by component. Getting this from a standard Hugging Face model
            requires patching forward methods, adding hooks at arbitrary points, and
            reasoning about an implementation you did not write.
          </P>

          <P>
            LUMEN's implementation was designed with instrumentation as a first-class concern.
            Every forward pass optionally returns a structured <code>InternalsBundle</code>
            containing all intermediate states. This is not a debugging hook added after the
            fact — it is part of the forward function's return type.
          </P>

          <Code>{`@dataclass
class InternalsBundle:
    # Per-layer attention states
    attn_logits: list[Tensor]      # (n_layers, n_heads, seq_len, seq_len) — pre-softmax
    attn_weights: list[Tensor]     # (n_layers, n_heads, seq_len, seq_len) — post-softmax
    attn_output: list[Tensor]      # (n_layers, seq_len, d_model) — post-projection

    # Residual stream at each layer boundary
    residual_pre_attn: list[Tensor]   # (n_layers, seq_len, d_model)
    residual_post_attn: list[Tensor]  # (n_layers, seq_len, d_model)
    residual_pre_mlp: list[Tensor]    # (n_layers, seq_len, d_model)
    residual_post_mlp: list[Tensor]   # (n_layers, seq_len, d_model)

    # MLP internals
    mlp_pre_act: list[Tensor]   # (n_layers, seq_len, d_ff) — before activation function
    mlp_post_act: list[Tensor]  # (n_layers, seq_len, d_ff) — after activation function

def forward(
    self,
    tokens: Tensor,
    return_internals: bool = False,
) -> tuple[Tensor, InternalsBundle | None]:
    ...`}</Code>

          <Div label="Attention visualization: what the model attends to" />

          <P>
            Attention visualization is the most direct window into transformer behavior. Each
            attention head computes a weighted average over the sequence — the weights
            determine which positions in the input a given position can "see" when constructing
            its representation.
          </P>

          <P>
            LUMEN's attention visualizer renders both pre-softmax logits and post-softmax
            weights. The distinction matters. Pre-softmax logits show the raw similarity scores
            the model computes between query and key vectors — these are unbounded and show
            which positions the model "wanted" to attend to before normalization. Post-softmax
            weights show where probability mass landed after normalization — these are what
            actually influences the output but can mask the structure of the raw scores when
            one position dominates.
          </P>

          <P>
            The visualizer runs on arbitrary input sequences and produces per-head heatmaps
            for each layer. Heads can be composed (averaged across layers, averaged across
            heads within a layer) or examined individually. The implementation uses the
            <code>InternalsBundle</code> directly — no hooks, no patching, no post-hoc
            extraction from opaque implementation details.
          </P>

          <Div label="Activation probing: what the model knows and when" />

          <P>
            Attention visualization shows the flow of information. Activation probing asks a
            different question: what information is encoded in the model's representations
            at each layer, and is it encoded in a linearly accessible form?
          </P>

          <P>
            The probing methodology: for a given property <em>P</em> (part of speech,
            named entity type, clause boundary, semantic role), label a set of token positions
            with binary or multiclass labels for <em>P</em>. Train a linear classifier on the
            hidden state activations at each layer. If the linear probe achieves high accuracy
            at layer <em>k</em>, the property <em>P</em> is linearly encoded in the
            residual stream at layer <em>k</em>.
          </P>

          <P>
            The word "linear" is doing a lot of work here. A nonlinear probe can achieve high
            accuracy by learning to extract information that is present but nonlinearly encoded —
            this tells you the model has computed something relevant, but not that it has
            represented it cleanly. A linear probe's accuracy is a conservative lower bound
            on the linearity of the encoding. High linear probe accuracy means the information
            is not just present but organized in a way that downstream components can directly
            use via linear operations — the way transformers actually operate.
          </P>

          <Code>{`class LinearProbe(nn.Module):
    """Single linear layer probe for binary or multiclass classification.
    Trained on frozen residual stream activations at a specified layer."""

    def __init__(self, d_model: int, n_classes: int):
        super().__init__()
        self.classifier = nn.Linear(d_model, n_classes)

    def forward(self, activations: Tensor) -> Tensor:
        # activations: (batch, seq_len, d_model)
        return self.classifier(activations)

def probe_layer(
    model: LUMEN,
    layer_idx: int,
    dataset: ProbeDataset,     # (tokens, labels) pairs
    property_name: str,
) -> ProbeResult:
    model.eval()
    probe = LinearProbe(model.config.d_model, dataset.n_classes)
    # Extract frozen activations at this layer
    with torch.no_grad():
        _, internals = model.forward(dataset.tokens, return_internals=True)
        activations = internals.residual_post_attn[layer_idx]  # after attention, before MLP
    # Train probe on frozen activations
    optimizer = torch.optim.Adam(probe.parameters(), lr=1e-3)
    for _ in range(200):
        logits = probe(activations)
        loss = F.cross_entropy(logits.reshape(-1, dataset.n_classes), dataset.labels.reshape(-1))
        optimizer.zero_grad(); loss.backward(); optimizer.step()
    return ProbeResult(layer=layer_idx, property=property_name, accuracy=eval_probe(probe, activations, dataset.labels))`}</Code>

          <Div label="What the probes found" />

          <P>
            Running probes across all layers for four properties — part-of-speech (POS),
            named entity type (NER), clause boundary (CLAUSE), and co-reference (COREF) —
            produced a consistent layered structure.
          </P>

          <P>
            <strong>Layers 1–3:</strong> POS probe accuracy rises sharply, reaching peak
            performance by layer 3. CLAUSE boundary probe accuracy also peaks early. These are
            syntactic properties that require primarily local context — adjacent tokens and
            immediate structure. Early layers specialize in local syntactic processing.
          </P>

          <P>
            <strong>Layers 4–6:</strong> NER probe accuracy rises. COREF probe accuracy begins
            to rise. These are semantic properties that require wider context — understanding
            that "he" refers to the same entity as "Mr. Thompson" three sentences earlier
            requires integrating information over longer distances. Middle layers specialize
            in semantic integration.
          </P>

          <P>
            <strong>Layers 7+:</strong> POS probe accuracy begins to decline slightly. This
            is not the model "forgetting" syntax — the information is still present, but the
            residual stream at late layers is increasingly dominated by prediction-relevant
            information rather than syntactic feature encodings. Late layers appear to be
            converting representations from "what am I" (syntactic/semantic features) to
            "what comes next" (prediction targets).
          </P>

          <Stat stats={[
            { value: 'Layers 1–3', label: 'Syntactic encoding', sub: 'POS, clause boundaries peak early' },
            { value: 'Layers 4–6', label: 'Semantic emergence', sub: 'NER, co-reference rise through middle layers' },
            { value: 'Layers 7+', label: 'Prediction conversion', sub: 'syntactic probe accuracy declines; prediction-focused' },
            { value: 'Linear', label: 'Encoding structure', sub: 'all above properties linearly decodable at peak layers' },
          ]} />

          <Div label="Gradient attribution: which inputs drive predictions" />

          <P>
            The third tool addresses a question attention visualization and probing cannot:
            for a specific output prediction, which input tokens were causally responsible?
          </P>

          <P>
            Gradient attribution computes <code>∂L/∂e_i</code> — the gradient of the loss
            (or output logit) with respect to the input token embedding at position <em>i</em>.
            The L2 norm of this gradient gives a scalar saliency score for each input token:
            high saliency means a small change to that token embedding would produce a large
            change in the output prediction.
          </P>

          <P>
            This is a first-order approximation — it captures local sensitivity, not global
            causal effect. But for a linear-in-the-embedding sense, it is exact: if the model
            is locally linear around the current input (a reasonable approximation for
            small perturbations), the gradient correctly identifies which inputs the output
            depends on most strongly.
          </P>

          <Code>{`def gradient_attribution(
    model: LUMEN,
    tokens: Tensor,              # (seq_len,) token IDs
    target_pos: int,             # position to attribute from
    target_token: int | None,    # token ID to attribute for (None = predicted token)
) -> Tensor:                     # (seq_len,) saliency scores
    model.eval()
    # Get token embeddings with grad enabled
    embeddings = model.embed(tokens).detach().requires_grad_(True)
    # Forward pass from embeddings (bypasses embedding lookup)
    logits = model.forward_from_embeddings(embeddings)
    # Select target logit
    if target_token is None:
        target_token = logits[target_pos].argmax().item()
    target_logit = logits[target_pos, target_token]
    # Backward pass
    target_logit.backward()
    # L2 norm of embedding gradient = saliency score per token
    saliency = embeddings.grad.norm(dim=-1)   # (seq_len,)
    return saliency / saliency.sum()          # normalize to sum to 1`}</Code>

          <Div label="Ablation experiments and the 30% loss reduction" />

          <P>
            The 30% validation loss reduction came from a systematic ablation study across
            four architectural dimensions: depth (number of layers), width (hidden dimension
            size), head count (attention heads per layer), and learning rate schedule.
          </P>

          <P>
            The experiment protocol: hold three dimensions fixed, vary the fourth across
            three values, train each configuration to convergence on the same 80/10/10
            corpus split, record final validation loss. Repeat for all four dimensions,
            12 training runs total. The baseline is the initial architecture chosen before
            any ablation.
          </P>

          <P>
            <strong>Depth:</strong> The strongest effect. At this parameter count (10M),
            increasing depth from 6 to 8 layers with proportionally reduced width produced
            a 15% relative loss reduction versus the same parameter count at 6 layers.
            More layers, with fewer parameters per layer, outperformed fewer wider layers.
          </P>

          <P>
            <strong>Width:</strong> Increasing hidden dimension while holding depth and head
            count fixed produced a smaller improvement — about 8% relative — with diminishing
            returns past d_model = 512. Wider representations help, but depth helps more.
          </P>

          <P>
            <strong>Head count:</strong> Diminishing returns past 4 heads at this parameter
            scale. 8 heads produced marginally better loss than 4 heads ({"<"}2% relative)
            but at a meaningful increase in parameter count per attention layer. 4 heads
            is the efficient choice at 10M parameters.
          </P>

          <P>
            <strong>Learning rate schedule:</strong> Cosine annealing with warmup outperformed
            constant learning rate by ~7% relative. The warmup period (200 steps) was critical —
            without it, early parameter updates are too large and the model settles into a
            suboptimal basin that cosine decay cannot escape.
          </P>

          <Q>
            "The 30% reduction was not the result of a lucky hyperparameter search. It was
            the result of understanding which architectural choices were doing real work.
            Ablation is the only way to know."
          </Q>

          <Div label="Connection to Project Coffeemaker" />

          <P>
            The interpretability work from LUMEN directly informs Project Coffeemaker.
            A core thesis of Coffeemaker is that the next generation of AI requires
            interpretable intermediate representations — not just interpretable outputs.
            If we cannot read what the model has computed at intermediate layers, we cannot
            verify that its reasoning is sound, only that its output appears plausible.
          </P>

          <P>
            The layer-wise probe results from LUMEN suggest that the hierarchical structure
            of representation — syntactic first, semantic second, predictive third — may be
            a general property of sufficiently deep transformers, not specific to large models.
            If this holds at much larger scales, it has implications for where and how
            to intervene to make AI systems verifiable at the layer level.
          </P>

          <Tags tags={['PyTorch', 'Decoder-only transformer', 'Multi-head attention (from scratch)', 'BPE tokenizer (from scratch)', 'Linear probing', 'Gradient attribution', 'Attention visualization', 'Ablation study', 'Residual stream analysis', 'Mechanistic interpretability']} />

          <div className={`${pStyles.editorialFooter} rv`}>
            <div className={pStyles.editorialFooterLinks}>
              <button className="btn btn--primary" onClick={() => navigate('/products/lumen')}>See LUMEN →</button>
              <button className="btn btn--ghost" onClick={() => navigate('/research/medical')}>Next: Medical AI →</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   MEDICAL AI
══════════════════════════════════════════════════════════════ */
export function MedicalAIPage() {
  const navigate = useNavigate();
  return (
    <div className={pStyles.editorialPage}>
      <Back />

      <div className={`${pStyles.editorialHero} page-header`}>
        <div className="container--narrow">
          <div className={pStyles.editorialMeta}>
            <span className="t-label-accent rv">Research · Medical AI</span>
            <span className="t-label rv">2025 – Present</span>
          </div>
          <h1 className={`${pStyles.editorialTitle} rv`}>
            AI at<br />Consequence Scale
          </h1>
          <p className={`${pStyles.editorialLede} rv`}>
            When the domain is clinical, a wrong answer has a cost that a confidence
            score cannot recover. Our medical AI research takes the constraint seriously:
            uncertainty must be explicit, failure modes must be named, and no result should
            be indistinguishable from a real result when it was produced under insufficient
            evidence. This is the research thread that produced both a published paper on
            oral cancer detection and the Dr. Help multimodal pipeline.
          </p>
        </div>
      </div>

      <div className={pStyles.editorialBody}>
        <div className="container--narrow">

          <Stat stats={[
            { value: '99.5%', label: 'Classification accuracy', sub: '1 false positive, 0 false negatives on 950 images' },
            { value: 'ViT + ResNet-18', label: 'Ensemble architecture', sub: 'soft voting over probability distributions' },
            { value: '3', label: 'Input modalities (Dr. Help)', sub: 'text · structured data · imaging' },
            { value: 'Published', label: 'DOI: 10.5281/zenodo.20274795', sub: 'peer-reviewed, 2026' },
          ]} />

          <Div label="The problem: why clinical AI is hard" />

          <P>
            Clinical AI fails differently from other AI applications. In most domains, a
            model that is wrong 5% of the time is useful — the error rate is a tradeoff
            against the cost of human review. In clinical settings, specific failure modes
            carry asymmetric costs. A false negative on an oral cancer screening — telling
            a patient they are clear when they are not — delays treatment in a disease where
            the 5-year survival rate drops from above 80% to below 40% when caught late.
          </P>

          <P>
            This asymmetry changes the evaluation criteria. Aggregate accuracy is insufficient.
            What matters is the confusion matrix at the clinically relevant threshold:
            specifically, false negative rate for high-stakes conditions. A model with
            98% accuracy and a 10% false negative rate on positive cases may be worse
            than a model with 95% accuracy and 0% false negative rate, depending on
            the clinical cost of missed positives.
          </P>

          <P>
            The second challenge is data. Clinical imaging datasets are expensive to acquire
            and label. A 950-image dataset is not large by deep learning standards. The
            challenge is building a model that generalizes from limited data without
            memorizing dataset-specific artifacts — a challenge that cannot be solved with
            scale alone.
          </P>

          <Q>
            "Aggregate accuracy is an insufficient evaluation criterion for clinical AI.
            The confusion matrix at the clinically relevant threshold is what matters.
            A model that never misses a positive case is worth more than a model that is
            slightly more accurate overall."
          </Q>

          <Div label="Dataset and clinical context" />

          <P>
            Oral squamous cell carcinoma is the 16th most common cancer globally. Early-stage
            lesions present as white patches (leukoplakia), red patches (erythroplakia), or
            mixed patches (erythroleukoplakia) in the oral cavity. They are visually subtle —
            easy to miss on routine examination without specialized training in oral oncology.
          </P>

          <P>
            The dataset consists of 950 images of oral cavity photographs taken with standard
            digital cameras under normal clinical lighting conditions. This is a deliberate
            choice. Research using specialized dermoscopy or controlled imaging conditions
            produces models that generalize poorly to real clinical environments where
            photographs are taken with patient smartphones or standard clinical cameras.
            The 950-image corpus was chosen to simulate real-world resource constraints,
            not ideal imaging conditions.
          </P>

          <P>
            The dataset is balanced: 475 images of confirmed oral carcinoma, 475 images of
            normal oral tissue. All images were labeled by licensed oral pathologists.
            The 80/10/10 train/validation/test split was stratified — the class ratio is
            preserved in all three splits. No augmented images appear in the validation
            or test set.
          </P>

          <Div label="Architecture: why an ensemble" />

          <P>
            A single model — however well-tuned — has a single inductive bias. It learns
            to classify via a specific set of features that happens to work well on the
            training distribution. An ensemble of architecturally diverse models is more
            robust: each model's error modes are different, and the ensemble vote
            averages out individual model failures.
          </P>

          <P>
            The two architectures chosen were Vision Transformer (ViT-B/16) and ResNet-18.
            These are not arbitrarily different — they represent two fundamentally different
            inductive biases. ResNet-18 is a convolutional architecture that builds
            representations from local features, composing them hierarchically from edges
            to textures to semantic features. ViT-B/16 is an attention-based architecture
            that processes patches globally from the first layer, with no explicit local
            feature hierarchy. Their failure modes are structurally different.
          </P>

          <P>
            A third candidate — Swin Transformer — was evaluated before selection. Swin
            uses a hierarchical window-based attention mechanism that combines local and
            global processing. Head-to-head on this dataset, ViT-B/16 outperformed Swin
            by 2.2% validation accuracy and achieved perfect precision (zero false positives)
            while Swin produced 3 false positives. ViT-B/16 was selected.
          </P>

          <Code>{`# Architecture comparison on validation set
Model             Val Accuracy   Precision   Recall   F1     False Pos   False Neg
─────────────────────────────────────────────────────────────────────────────────
ResNet-18         96.8%          0.971        0.965    0.968      3          3
ViT-B/16          98.3%          1.000        0.967    0.983      0          3
Swin-T            96.1%          0.968        0.955    0.961      3          4
─────────────────────────────────────────────────────────────────────────────────
Ensemble (soft)   99.5%          0.990        1.000    0.995      1          0
─────────────────────────────────────────────────────────────────────────────────`}</Code>

          <P>
            The ensemble result — 99.5% accuracy, 1 false positive, 0 false negatives —
            surpassed every prior published benchmark on comparable oral carcinoma datasets.
            The four prior baselines in the literature ranged from 91.2% to 97.4% accuracy.
            None achieved zero false negatives.
          </P>

          <Div label="Soft voting: why not hard voting" />

          <P>
            Both ensemble combination strategies — hard voting (majority class label)
            and soft voting (averaged probability distributions) — were evaluated.
            Soft voting outperformed hard voting by 0.8% accuracy on this dataset,
            and more importantly, reduced false negatives from 2 to 0.
          </P>

          <P>
            The mechanism: medical images often have ambiguous features — lesions that
            are borderline, lighting conditions that obscure detail, image quality issues.
            In these cases, both models may predict the positive class with moderate
            confidence (e.g., 0.65 and 0.72) rather than high confidence. Hard voting
            on these cases produces a POSITIVE prediction based on which class label
            is returned — but if one model predicts NEGATIVE with high confidence
            (e.g., 0.8) and the other predicts POSITIVE with low confidence (0.52),
            hard voting can produce POSITIVE from a near-coin-flip.
          </P>

          <P>
            Soft voting averages the probability vectors before taking the argmax. A
            high-confidence NEGATIVE from one model partially cancels a low-confidence
            POSITIVE from the other. This is a better use of the information available —
            the models' uncertainty estimates are meaningful and should not be discarded
            by converting to hard labels before combination.
          </P>

          <Code>{`def soft_vote(
    probs_resnet: Tensor,   # (batch, n_classes) — probability distributions
    probs_vit: Tensor,      # (batch, n_classes)
    weights: tuple[float, float] = (0.5, 0.5),
) -> Tensor:
    # Weighted average of probability distributions — preserves uncertainty structure
    ensemble_probs = weights[0] * probs_resnet + weights[1] * probs_vit
    return ensemble_probs.argmax(dim=-1)  # class prediction from averaged distribution

# Contrast with hard voting (not used):
def hard_vote(
    labels_resnet: Tensor,  # (batch,) — already argmaxed
    labels_vit: Tensor,
) -> Tensor:
    # Discards all uncertainty information before combination
    # Fails when models agree on wrong prediction with high confidence
    stacked = torch.stack([labels_resnet, labels_vit], dim=1)
    return stacked.mode(dim=1).values`}</Code>

          <Div label="Grad-CAM: confirming clinical validity" />

          <P>
            A model that achieves 99.5% accuracy could theoretically be doing so via
            spurious correlations — predicting cancer based on image metadata, camera
            characteristics, or patient demographic information that happens to correlate
            with diagnosis in the training set. Accuracy metrics cannot distinguish between
            a model that has learned to classify lesions and a model that has learned to
            classify datasets.
          </P>

          <P>
            Gradient-weighted Class Activation Mapping (Grad-CAM) was used to verify that
            both models attend to clinically meaningful regions. Grad-CAM computes the
            gradient of the predicted class score with respect to the feature maps of the
            final convolutional layer (for ResNet-18) or the last attention layer's output
            (for ViT-B/16), then uses these gradients as weights to produce a heatmap
            over the input image.
          </P>

          <P>
            For positive (carcinoma) predictions, both models' Grad-CAM heatmaps
            concentrated on the lesion region in the oral cavity — the white/red patches
            characteristic of early-stage carcinoma. For negative predictions, the heatmaps
            were diffuse, with no consistent focus. An oral pathologist reviewed a sample
            of 50 positive-prediction heatmaps and confirmed that the highlighted regions
            corresponded to clinically suspicious tissue in 48 of 50 cases.
          </P>

          <P>
            This is not just a quality check. It is an interpretability requirement: for
            clinical AI to be deployable, clinicians need to understand why the model made
            a prediction. A high-accuracy black box is not usable in clinical practice.
            The Grad-CAM output is the model's explanation.
          </P>

          <Stat stats={[
            { value: '48/50', label: 'Grad-CAM clinical validation', sub: 'highlighted regions confirmed by oral pathologist' },
            { value: '0', label: 'False negatives on test set', sub: 'clinically critical — no missed positives' },
            { value: '1', label: 'False positive on test set', sub: '99.5% overall accuracy' },
            { value: '4', label: 'Prior benchmarks surpassed', sub: 'all in range 91.2% – 97.4%' },
          ]} />

          <Div label="From research to Dr. Help" />

          <P>
            The Smile Saviors research established the core methodology: ensemble
            architecturally diverse models, use soft voting over probability distributions,
            validate with Grad-CAM, prioritize false negative rate over aggregate accuracy.
            Dr. Help extends this methodology to a harder problem: multimodal clinical decision
            support where the inputs are not a single image but a combination of physician
            notes, structured laboratory data, and imaging.
          </P>

          <P>
            The central engineering challenge in Dr. Help is not the model — it is the
            preprocessing pipeline. Text, structured records, and imaging arrive in
            incompatible formats, at different sampling rates, with different missing-data
            patterns. A system that feeds raw modality outputs into a fusion model learns
            to handle missing data via model capacity rather than via explicit design.
            The result is a model that is brittle to the specific missingness patterns in
            its training set.
          </P>

          <P>
            Dr. Help's unified preprocessing pipeline normalizes all three modalities
            before any model inference: text is tokenized and encoded via a clinical
            language model fine-tuned on medical notes; structured data is normalized
            to a fixed-length feature vector with explicit missingness indicators;
            imaging is resized, normalized, and encoded via the same ViT backbone used
            in the oral cancer research. All three encodings are projected to a common
            embedding dimension before fusion — the fusion layer sees vectors that are
            semantically aligned, not raw modality outputs.
          </P>

          <Q>
            "Most multimodal clinical AI fails at the data layer. The model handles what the
            preprocessing doesn't. Dr. Help treats preprocessing as the core engineering problem."
          </Q>

          <Div label="Publication" />

          <P>
            The oral cancer detection research was published in 2026. Full citation:
          </P>

          <div className={`${styles.citationBox} rv`}>
            <p className={styles.citationText}>
              An Enhanced Hybrid Diagnostic Deep Learning Framework Using Ensemble ViT-ResNets
              for Oral Carcinoma Detection
            </p>
            <p className={styles.citationMeta}>
              DOI: 10.5281/zenodo.20274795 · 2026
            </p>
            <a
              href="https://doi.org/10.5281/zenodo.20274795"
              target="_blank"
              rel="noreferrer"
              className={styles.citationLink}
            >
              View paper ↗
            </a>
          </div>

          <Tags tags={['PyTorch', 'ViT-B/16', 'ResNet-18', 'Ensemble learning', 'Soft voting', 'Grad-CAM', 'Medical imaging', 'Oral carcinoma', 'Clinical AI', 'Multimodal fusion', 'Preprocessing pipeline']} />

          <div className={`${pStyles.editorialFooter} rv`}>
            <div className={pStyles.editorialFooterLinks}>
              <button className="btn btn--primary" onClick={() => navigate('/products/dr-help')}>See Dr. Help →</button>
              <button className="btn btn--ghost" onClick={() => navigate('/research')}>← All research</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
