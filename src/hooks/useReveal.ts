/**
 * Global reveal. Uses --rv-delay CSS variable to stagger,
 * keeping transition-delay clean for :hover.
 */
export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('in');
        io.unobserve(el);
      });
    },
    { threshold: 0.04, rootMargin: '0px 0px -30px 0px' }
  );

  requestAnimationFrame(() => {
    const all = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in), .rv-card:not(.in)'));
    const vh = window.innerHeight;
    let aboveFoldIdx = 0;

    all.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < vh && rect.bottom > 0;

      if (inView) {
        // Use CSS animation-delay via custom property — doesn't touch transition-delay
        const delay = Math.min(aboveFoldIdx * 35, 180);
        el.style.setProperty('--rv-delay', delay + 'ms');
        aboveFoldIdx++;
        requestAnimationFrame(() => el.classList.add('in'));
      } else {
        el.style.setProperty('--rv-delay', '0ms');
        io.observe(el);
      }
    });
  });

  return () => io.disconnect();
}
