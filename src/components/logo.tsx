// 手繪感小皇冠（呼應品牌插畫）
export function Crown({ className = "h-6 w-6", stroke = "#C6A15B" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 32 28" className={className} fill="none" aria-hidden>
      <path
        d="M4 21.5 L2.5 8.5 L10 14 L16 4.5 L22 14 L29.5 8.5 L28 21.5 Q16 24.5 4 21.5Z"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="2.5" cy="8" r="1.6" fill={stroke} />
      <circle cx="16" cy="4" r="1.6" fill={stroke} />
      <circle cx="29.5" cy="8" r="1.6" fill={stroke} />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${light ? "text-ivory" : "text-deep"}`}>
      <Crown className="h-6 w-7 -translate-y-0.5" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[17px] font-semibold tracking-[0.08em]">小王子醫師</span>
        <span className={`mt-1 font-display text-[12px] italic tracking-[0.22em] ${light ? "text-gold-soft" : "text-gold"}`}>
          Dr. Lee
        </span>
      </span>
    </span>
  );
}
