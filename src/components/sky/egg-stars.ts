// 卵子星空：星星數＝MII、亮度＝年齡相關生殖潛力、整片光暈＝模型估計 CLBR。
// SVG 以字串產生（內容全部來自程式，不含使用者輸入）。

import { potential } from "./eggs-model";

function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number; s: number; o: number };

const FIELD: Pt[] = (() => {
  const r = rng(20260924);
  const pts: Pt[] = [];
  let tries = 0;
  while (pts.length < 80 && tries < 30000) {
    tries++;
    const x = 26 + r() * 268;
    const y = 26 + r() * 196;
    if (pts.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 760)) pts.push({ x, y, s: 0.85 + r() * 0.8, o: r() });
  }
  return pts.sort((a, b) => a.o - b.o);
})();

function sparkle(x: number, y: number, s: number) {
  const a = 6.4 * s;
  const b = 1.7 * s;
  return `M${x} ${y - a} Q${x + b} ${y - b} ${x + a} ${y} Q${x + b} ${y + b} ${x} ${y + a} Q${x - b} ${y + b} ${x - a} ${y} Q${x - b} ${y - b} ${x} ${y - a}Z`;
}

export function eggSkySVG(mii: number, age: number, p: number | null, animate = true) {
  const n = Math.min(80, Math.max(0, Math.round(mii)));
  const pot = potential(age);
  const r = rng(n * 131 + Math.round(age));
  const step = n ? Math.min(70, 1800 / n) : 0;
  let out = "";
  for (let i = 0; i < n; i++) {
    const q = FIELD[i];
    const sz = q.s * (0.72 + 0.55 * pot);
    const op = (0.42 + 0.58 * pot).toFixed(2);
    const tw = (2.6 + r() * 3).toFixed(2);
    const d = animate ? 260 + i * step : 0;
    out +=
      `<g class="tw" style="opacity:${op};animation-duration:${tw}s;animation-delay:${(d / 1000 + 0.7 + r() * 3).toFixed(2)}s">` +
      `<circle class="halo" cx="${q.x}" cy="${q.y}" r="${6.5 * sz}" style="animation-delay:${d}ms${animate ? "" : ";opacity:.5"}"/>` +
      `<path class="lit" d="${sparkle(q.x, q.y, sz)}" style="animation-delay:${d}ms${animate ? "" : ";opacity:1"}"/></g>`;
  }
  const glow = (0.1 + 0.62 * (p ?? 0)).toFixed(2);
  return (
    `<svg class="sky" viewBox="0 0 320 250" width="100%" role="img" aria-label="${n} 顆成熟卵子，亮度代表年齡相關生殖潛力">` +
    `<defs><radialGradient id="hg"><stop offset="0" class="hs0"/><stop offset="1" class="hs1"/></radialGradient>` +
    `<radialGradient id="ng"><stop offset="0" class="ns0"/><stop offset="1" class="ns1"/></radialGradient></defs>` +
    `<ellipse class="neb" cx="160" cy="124" rx="150" ry="112" style="opacity:${glow}"/>${out}</svg>`
  );
}

/** 入口頁的細長星帶 */
export function miniSkySVG(seed: number, lit: number, total: number, glow: boolean) {
  const r = rng(seed);
  const pts: { x: number; y: number; s: number }[] = [];
  let tries = 0;
  while (pts.length < total && tries < 9000) {
    tries++;
    const x = 16 + r() * 288;
    const y = 12 + r() * 66;
    if (pts.every((p) => (p.x - x) ** 2 + (p.y - y) ** 2 > 230)) pts.push({ x, y, s: 0.8 + r() * 0.7 });
  }
  let out = "";
  pts.forEach((p, i) => {
    const tw = (2.6 + r() * 3).toFixed(2);
    const d = (r() * 4).toFixed(2);
    if (i < lit)
      out += `<g class="tw" style="animation-duration:${tw}s;animation-delay:${d}s"><path class="lit" style="opacity:1;animation:none" d="${sparkle(p.x, p.y, p.s)}"/></g>`;
    else out += `<circle class="s" cx="${p.x}" cy="${p.y}" r="${1.3 * p.s}" style="animation-duration:${tw}s;animation-delay:-${d}s"/>`;
  });
  return (
    `<svg class="sky" viewBox="0 0 320 90" width="100%" aria-hidden="true">` +
    `<defs><radialGradient id="ng${seed}"><stop offset="0" class="ns0"/><stop offset="1" class="ns1"/></radialGradient></defs>` +
    `${glow ? `<ellipse cx="160" cy="45" rx="150" ry="42" fill="url(#ng${seed})" opacity=".5"/>` : ""}${out}</svg>`
  );
}
