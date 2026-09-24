// 凍卵累積活產機率模型
//
// 主模型：Cascante SD et al. J Assist Reprod Genet 2024;41:2979-2985
//         （NYU planned oocyte cryopreservation thaw cohort, n=731，整體 CLBR 43%）
// 已公開係數：age at first OC B = -0.14；total MII thawed B = +0.07
// 截距 4.02 為依作者 calibration example（34 歲 /10 MII ≈ 49%、34 歲 /20 MII ≈ 66%）
// 反推之「重建值」，不是論文公布的官方 equation。
//
// 顯示規則：
//  ① 顯示值封頂 85%（線性 logit 在外推區會失控；研究中任一分組都未超過約 78%）
//  ② 同組 observed 值與模型估計並排顯示，落差 >= 10 分時標示
//  ③ 星空語意：星星數 = MII、亮度 = 年齡相關生殖潛力、光暈 = 模型估計 CLBR

export const NYU = { b0: 4.02, bAge: -0.14, bMii: 0.07 };
export const CAP = 0.85;

const logistic = (z: number) => 1 / (1 + Math.exp(-z));

function clbrRaw(age: number, mii: number) {
  return logistic(NYU.b0 + NYU.bAge * age + NYU.bMii * mii);
}

export function clbr(age: number, mii: number) {
  const p = clbrRaw(age, mii);
  return { p: Math.min(p, CAP), capped: p > CAP };
}

/** 依此模型，該年齡要達到 target 機率所對應的成熟卵數 */
export function need(age: number, target: number) {
  return Math.max(1, Math.ceil((Math.log(target / (1 - target)) - NYU.b0 - NYU.bAge * age) / NYU.bMii));
}

// NYU 2024 分組實際觀察值（列＝凍卵年齡，欄＝解凍 MII 數），OBSN 為各格人數
const OBS = [
  [33, 35, 64, 71],
  [32, 53, 45, 78],
  [21, 44, 49, 53],
  [10, 29, 38, 36],
];
const OBSN = [
  [18, 26, 25, 31],
  [69, 78, 40, 74],
  [120, 71, 47, 45],
  [48, 17, 8, 14],
];
const AGE_LABELS = ["<35", "35–37", "38–40", "≥41"];
const MII_LABELS = ["1–9", "10–14", "15–19", "≥20"];

export function observed(age: number, mii: number) {
  const a = age < 35 ? 0 : age <= 37 ? 1 : age <= 40 ? 2 : 3;
  const m = mii <= 9 ? 0 : mii <= 14 ? 1 : mii <= 19 ? 2 : 3;
  return { p: OBS[a][m], n: OBSN[a][m], ageLabel: AGE_LABELS[a], miiLabel: MII_LABELS[m] };
}

// 年齡相關生殖潛力（Sujino 2025 概念曲線，相對 peak）—— 只用於星星亮度
const POT: [number, number][] = [
  [25, 1],
  [30, 0.96],
  [34, 0.9],
  [37, 0.75],
  [40, 0.5],
  [43, 0.25],
  [46, 0.1],
  [50, 0.03],
];

export function potential(age: number) {
  if (age <= POT[0][0]) return 1;
  if (age >= POT[POT.length - 1][0]) return 0.03;
  for (let i = 1; i < POT.length; i++) {
    const [x1, y1] = POT[i - 1];
    const [x2, y2] = POT[i];
    if (age <= x2) return y1 + ((y2 - y1) * (age - x1)) / (x2 - x1);
  }
  return 0.03;
}
