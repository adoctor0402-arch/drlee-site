// 原創「小王子醫師」嚮導角色（Patient Journey Guide）
// 成熟、安靜、好奇：坐在小星球上，用望遠鏡看著遠方的一顆星。
// 注意：刻意避免任何既有作品的招牌造型，保持原創。

export function PrinceOnPlanet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 10 320 320" className={className} role="img" aria-label="小王子醫師坐在小星球上，望向遠方的星星">
      <defs>
        <radialGradient id="planet" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#DCE8F2" />
          <stop offset="100%" stopColor="#A9C0D6" />
        </radialGradient>
        <linearGradient id="coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23487A" />
          <stop offset="100%" stopColor="#17365D" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4E3BD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 遠方的星（生命之光） */}
      <g className="origin-[252px_52px] animate-twinkle">
        <circle cx="252" cy="52" r="26" fill="url(#glow)" />
        <path d="M252 36l3.6 12.4L268 52l-12.4 3.6L252 68l-3.6-12.4L236 52l12.4-3.6z" fill="#C6A15B" />
      </g>

      {/* 軌道 */}
      <ellipse cx="160" cy="250" rx="118" ry="26" fill="none" stroke="#C6A15B" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="2 6" transform="rotate(-10 160 250)" />

      {/* 星球 */}
      <circle cx="160" cy="250" r="68" fill="url(#planet)" />
      <circle cx="132" cy="268" r="9" fill="#A9C0D6" opacity="0.35" />
      <circle cx="186" cy="290" r="6" fill="#A9C0D6" opacity="0.3" />
      <circle cx="198" cy="244" r="4" fill="#A9C0D6" opacity="0.3" />
      {/* 軌道前半段（壓在星球前面） */}
      <path d="M44 262 C 90 296, 250 280, 276 234" fill="none" stroke="#C6A15B" strokeOpacity="0.8" strokeWidth="1.4" strokeDasharray="2 6" />

      {/* 小芽 */}
      <path d="M112 188 C 111 180, 112 174, 114 168" stroke="#7E9A86" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M114 172 C 106 170, 102 164, 103 158 C 110 159, 115 165, 114 172z" fill="#BBC9BE" />
      <path d="M114 169 C 120 164, 127 164, 130 167 C 126 173, 119 173, 114 169z" fill="#9FB5A5" />

      {/* 角色 */}
      <g>
        {/* 腿（坐在星球頂端，腳垂在右側） */}
        <path d="M156 184 L186 186 L192 210" stroke="#1B2B42" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M150 184 L176 190 L178 214" stroke="#22344F" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx="196" cy="213" rx="7.5" ry="4" fill="#3A2F2A" />
        <ellipse cx="182" cy="217" rx="7.5" ry="4" fill="#3A2F2A" />

        {/* 長大衣 */}
        <path d="M146 134 Q160 128 174 134 L182 188 Q160 194 138 188 Z" fill="url(#coat)" />
        <path d="M160 134 L160 190" stroke="#0F2744" strokeWidth="1" opacity="0.6" />
        <circle cx="163.5" cy="152" r="1.4" fill="#C6A15B" />
        <circle cx="163.5" cy="166" r="1.4" fill="#C6A15B" />

        {/* 左手自然放在膝上 */}
        <path d="M148 140 Q140 162 156 178" stroke="#1E3F6B" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="158" cy="179" r="4" fill="#F1D6C0" />

        {/* 右手舉起望遠鏡，對準遠方的星 */}
        <path d="M172 140 Q184 132 188 104" stroke="#1E3F6B" strokeWidth="8" strokeLinecap="round" fill="none" />
        <g transform="rotate(-38 175 104)">
          <rect x="175" y="100" width="20" height="8" rx="2" fill="#B08B48" />
          <rect x="193" y="98.5" width="15" height="11" rx="2" fill="#C6A15B" />
          <rect x="206" y="97" width="5" height="14" rx="1.5" fill="#8C6C33" />
        </g>
        <circle cx="187" cy="103" r="4" fill="#F1D6C0" />

        {/* 圍巾（隨風往後飄） */}
        <path d="M148 128 Q160 136 173 128 L172 134 Q160 141 148 134 Z" fill="#BBC9BE" />
        <path d="M150 131 C 136 130, 124 136, 112 132 C 120 140, 134 142, 150 136 Z" fill="#A7BAAC" className="origin-[150px_132px] animate-float" />

        {/* 頭 */}
        <rect x="156.5" y="120" width="7" height="9" rx="3" fill="#E9CBB2" />
        <circle cx="160" cy="110" r="14.5" fill="#F1D6C0" />
        {/* 頭髮：俐落短髮、側分 */}
        <path d="M145.6 108 C 145 94, 156 90, 164 92 C 172 93, 177 100, 175.2 108 C 170 101, 160 100, 152 103 C 149 104, 147 106, 145.6 108 Z" fill="#26303D" />
        {/* 臉：望向星星的平靜神情 */}
        <circle cx="163.5" cy="108.5" r="1.4" fill="#26303D" />
        <circle cx="171" cy="108" r="1.3" fill="#26303D" />
        <path d="M164 116.5 Q167.5 118.6 170.5 116" stroke="#A2644E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <ellipse cx="173" cy="113.5" rx="2.6" ry="1.6" fill="#E8A99A" opacity="0.35" />
      </g>
    </svg>
  );
}

// 背景星空：淡淡閃爍的星點
const STARS: [number, number, number, number][] = [
  [8, 14, 1.2, 0], [22, 8, 0.8, 1.5], [36, 20, 1, 3], [58, 6, 1.4, 0.8], [72, 16, 0.8, 2.2],
  [88, 9, 1.1, 4], [93, 30, 0.9, 1], [80, 38, 1.3, 3.4], [64, 28, 0.7, 5], [48, 12, 0.9, 2.8],
  [14, 34, 0.8, 4.4], [4, 52, 1, 1.8], [96, 56, 0.8, 3.8], [30, 44, 0.6, 0.4],
];

export function Starfield({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      {STARS.map(([x, y, r, d], i) => (
        <span
          key={i}
          className="absolute block rounded-full animate-twinkle"
          style={{
            left: `${x}%`,
            top: `${(y / 60) * 100}%`,
            width: `${r * 3}px`,
            height: `${r * 3}px`,
            background: i % 3 === 0 ? "#C6A15B" : "#17365D",
            opacity: 0.35,
            animationDelay: `${d}s`,
          }}
        />
      ))}
    </div>
  );
}
