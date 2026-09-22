export function StarMark({ className = "h-7 w-7" }: { className?: string }) {
  // 原創標誌：小星球 + 軌道 + 一顆金星
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="17" r="7.5" fill="currentColor" />
      <ellipse cx="16" cy="17" rx="13.5" ry="4.2" fill="none" stroke="#C6A15B" strokeWidth="1.1" transform="rotate(-18 16 17)" />
      <path d="M24.5 3.5l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z" fill="#C6A15B" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${light ? "text-ivory" : "text-deep"}`}>
      <StarMark />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[17px] font-semibold tracking-[0.08em]">小王子醫師</span>
        <span className={`mt-1 font-display text-[12px] italic tracking-[0.22em] ${light ? "text-gold-soft" : "text-gold"}`}>
          Dr. Lee
        </span>
      </span>
    </span>
  );
}
