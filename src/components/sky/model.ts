/**
 * 自然懷孕機率模型
 * Cameron et al., Human Reproduction Open 2026, hoag056
 * 公式移植自作者公開的 R 程式碼（github.com/nataliejcameron/LB_calc），
 * 已比對論文 Table 3 數值一致。原型作者：小王子醫師團隊。
 */

export type ModelInput = {
  age: number;
  dur: number;
  bmi: number;
  sec: number;
  smoke: number;
  alc: number;
  male: number;
  endo: number;
  ovu: number;
  unexp: number;
  tubal: number;
  other: number;
};

function spline(x: number, k1: number, k2: number, k3: number) {
  const n = Math.pow(k3 - k1, 2 / 3);
  const p = (v: number) => Math.pow(Math.max(v, 0), 3);
  return p((x - k1) / n) - ((k3 - k1) / (k3 - k2)) * p((x - k2) / n) + ((k2 - k1) / (k3 - k2)) * p((x - k3) / n);
}

/** 回傳一年內自然懷孕並活產的機率（0–1） */
export function riskcalc(d: ModelInput) {
  const yr = 2015; // 與官方計算機相同，固定為原研究最後一年
  const dur = Math.min(Math.max(d.dur, 0), 10);
  const bmi = Math.min(Math.max(d.bmi, 11), 42.5);
  let PI =
    -0.033862612246 * (yr - 2007.17583968388) +
    0.046143448439 * (spline(yr, 1999, 2008, 2014) - 4.74761156584) +
    0.006882384723 * (d.age - 32.25839683884) -
    0.087863170098 * (spline(d.age, 25, 32, 39) - 3.88503775769) -
    0.355503401057 * (dur - 2.43947690281) +
    0.371905469122 * (spline(dur, 1, 2, 5) - 0.46440767115) -
    0.026164440894 * (bmi - 25.98881718318) +
    0.019582306401 * (spline(bmi, 20.077, 24.61, 34.29) - 2.26049036821) +
    0.2432260407 * (d.sec - 0.44117273497) -
    0.269462732016 * (d.smoke - 0.22518346034) +
    0.054441659348 * (d.alc - 0.75131950325) -
    0.315062921906 * (d.male - 0.3074195597) -
    0.222606714511 * (d.endo - 0.04639429862) -
    0.129747447995 * (d.ovu - 0.2550381033) +
    0.301118223884 * (d.unexp - 0.25457239627) -
    0.442858096828 * (d.tubal - 0.17867273497) -
    0.33933021044 * (d.other - 0.08125176404);
  if (d.endo) PI *= 0.59;
  else if (d.other) PI *= 0.6;
  return 1 - Math.pow(0.8776930515, Math.exp(PI));
}

export const DIAGNOSES: [string, string, string][] = [
  ["unexp", "原因不明", "檢查都正常，但就是還沒懷上"],
  ["tubal", "輸卵管因素", "輸卵管阻塞、受損或切除"],
  ["male", "男性因素", "精液檢查結果異常"],
  ["ovu", "排卵障礙", "例如多囊性卵巢、不規則排卵"],
  ["endo", "子宮內膜異位症", ""],
  ["other", "其他因素", "子宮頸、子宮結構或性生活方面的問題"],
  ["none", "還沒做完檢查／不確定", "會以未勾選任何診斷計算"],
];

export function guidance(p: number, dx: string[], age: number) {
  if (dx.includes("tubal"))
    return "輸卵管因素在研究中自然懷孕的機率普遍偏低。建議和生殖醫師討論，治療可能帶來的幫助會比較明確。";
  if (p < 0.1) return "這個機率偏低。與其單純等待，建議儘早和生殖醫師討論適合你們的治療方式。";
  if (p < 0.2) return "機率不高也不算太低。可以帶著這個數字和醫師討論：要先自然嘗試一段時間，還是開始積極治療。";
  return age >= 35
    ? "你們仍有不錯的自然懷孕機會，但年齡會讓時間變得更珍貴。若想先自然嘗試，建議和醫師一起設定一個明確的時限。"
    : "你們自然懷孕的機會其實不小。可以和醫師討論，在陪伴與追蹤下先給自己一段時間。";
}
