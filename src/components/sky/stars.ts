// 星空：100 顆星，依機率點亮其中 n 顆。SVG 以字串產生（內容全部來自程式，不含使用者輸入）。

function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = { x: number; y: number; s: number; o: number };

const STARS: Star[] = (() => {
  const r = rng(20260914);
  const pts: Star[] = [];
  let tries = 0;
  while (pts.length < 100 && tries < 20000) {
    tries++;
    const x = 14 + r() * 292;
    const y = 14 + r() * 232;
    if (pts.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 380)) pts.push({ x, y, s: 0.8 + r() * 0.9, o: r() });
  }
  return pts;
})();

function sparkle(x: number, y: number, s: number) {
  const a = 6 * s;
  const b = 1.6 * s;
  return `M${x} ${y - a} Q${x + b} ${y - b} ${x + a} ${y} Q${x + b} ${y + b} ${x} ${y + a} Q${x - b} ${y + b} ${x - a} ${y} Q${x - b} ${y - b} ${x} ${y - a}Z`;
}

export function skySVG(n: number, animate = true, label = "") {
  const order = [...STARS.keys()].sort((a, b) => STARS[a].o - STARS[b].o);
  const lit = new Set(order.slice(0, n));
  const step = n ? Math.min(90, 2400 / n) : 0; // 不論星星多少，點亮過程約 2.5 秒
  const big = n <= 15 ? 1.35 : n <= 35 ? 1.15 : 1; // 星星越少，每顆越大越亮
  const r = rng(n * 97 + 7);
  let i = 0;
  let out = "";
  STARS.forEach((p, k) => {
    const tw = (2.6 + r() * 3.2).toFixed(2);
    const td = (r() * 4).toFixed(2);
    if (lit.has(k)) {
      const d = animate ? 300 + i++ * step : 0;
      out +=
        `<g class="tw" style="animation-duration:${tw}s;animation-delay:${(d / 1000 + 0.6 + +td).toFixed(2)}s">` +
        `<circle class="halo" cx="${p.x}" cy="${p.y}" r="${7 * p.s * big}" style="animation-delay:${d}ms${animate ? "" : ";opacity:.5"}"/>` +
        `<path class="lit" d="${sparkle(p.x, p.y, p.s * big)}" style="animation-delay:${d}ms${animate ? "" : ";opacity:1"}"/></g>`;
    } else {
      out += `<circle class="s" cx="${p.x}" cy="${p.y}" r="${1.3 * p.s}" style="animation-duration:${tw}s;animation-delay:-${td}s"/>`;
    }
  });
  const meteor = animate
    ? `<g class="meteor"><line x1="300" y1="20" x2="262" y2="42" stroke="url(#mg)" stroke-width="1.6" stroke-linecap="round"/></g>`
    : "";
  return (
    `<svg class="sky" viewBox="0 0 320 260" width="100%" role="img" aria-label="${label || `100 顆星中有 ${n} 顆亮起`}">` +
    `<defs><radialGradient id="hg"><stop offset="0" class="hs0"/><stop offset="1" class="hs1"/></radialGradient>` +
    `<linearGradient id="mg" x1="1" y1="0" x2="0" y2="1"><stop offset="0" class="ms0"/><stop offset="1" class="ms1"/></linearGradient></defs>` +
    `${meteor}${out}</svg>`
  );
}
