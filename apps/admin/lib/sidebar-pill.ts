import gsap from 'gsap';

export type PillEdges = { l: number; t: number; r: number; b: number };

function clipPath(e: PillEdges) {
  return `inset(${Math.max(0, e.t)}px ${Math.max(0, e.r)}px ${Math.max(0, e.b)}px ${Math.max(0, e.l)}px round 9999px)`;
}

function edgesFor(box: HTMLElement, target: HTMLElement): PillEdges {
  const w = box.offsetWidth;
  const h = box.offsetHeight;
  return {
    l: target.offsetLeft,
    t: target.offsetTop,
    r: w - (target.offsetLeft + target.offsetWidth),
    b: h - (target.offsetTop + target.offsetHeight),
  };
}

/**
 * Slides `pill` behind `target` inside their shared offsetParent, clipping it down
 * to the target's box with gsap. The edge the pill is moving *toward* (lead) animates
 * fast and eases out; the edge it's leaving behind (trail) animates slower and eases
 * in-out, so the pill stretches toward the new item before catching up — a liquid
 * feel rather than a rigid slide.
 */
export function slidePill(pill: HTMLElement, target: HTMLElement, stateRef: { current: PillEdges | null }) {
  const box = pill.parentElement as HTMLElement;
  if (!box) return;
  const to = edgesFor(box, target);
  const prev = stateRef.current;

  if (!prev) {
    stateRef.current = { ...to };
    gsap.set(pill, { clipPath: clipPath(to), autoAlpha: 1 });
    return;
  }

  const st: PillEdges = { ...prev };
  stateRef.current = st;
  gsap.killTweensOf(st);

  const movingDown = to.t > prev.t;
  const lead = movingDown ? 'b' : 't';
  const trail = movingDown ? 't' : 'b';
  const paint = () => gsap.set(pill, { clipPath: clipPath(st) });

  gsap.to(st, { [lead]: to[lead], duration: 0.36, ease: 'power3.out', onUpdate: paint });
  gsap.to(st, { [trail]: to[trail], duration: 0.55, ease: 'power3.inOut', onUpdate: paint });
  gsap.to(st, { l: to.l, r: to.r, duration: 0.42, ease: 'power3.inOut', onUpdate: paint });
}

/** Re-measures and snaps the pill to `target` instantly (no tween) — for resize/layout shifts. */
export function snapPill(pill: HTMLElement, target: HTMLElement, stateRef: { current: PillEdges | null }) {
  const box = pill.parentElement as HTMLElement;
  if (!box) return;
  const to = edgesFor(box, target);
  gsap.killTweensOf(stateRef.current || {});
  stateRef.current = { ...to };
  gsap.set(pill, { clipPath: clipPath(to) });
}
