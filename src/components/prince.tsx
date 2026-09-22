import Image from "next/image";
import { site } from "@/config/site";

// 品牌插畫。embryo 為去背透明圖；其他為有背景的場景圖，用 card 模式顯示成圓角卡片。
type ArtKey = keyof typeof site.art;

const sizes: Record<ArtKey, [number, number]> = {
  hero: [1254, 1254],
  embryo: [1024, 1536],
  ultrasound: [1024, 1536],
  books: [1024, 1536],
  plane: [1145, 1374],
  globe: [1024, 1536],
  journey: [1024, 1536],
};

const alts: Record<ArtKey, string> = {
  hero: "小王子醫師坐在星球上，身旁有一隻小狐狸，望向遠方的星星",
  embryo: "小王子醫師抱著發光的胚胎：讓愛有機會發芽",
  ultrasound: "小王子醫師指著超音波螢幕：看見生命的可能",
  books: "小王子醫師坐在 IVF、PGT、RPL 書堆上閱讀：持續學習，只為了更多幸福",
  plane: "小王子醫師和小狐狸坐飛機：一起飛向更大的可能",
  globe: "小王子醫師閉著眼擁抱戴著皇冠的地球",
  journey: "夕陽下，小王子醫師和小狐狸坐在山丘上望著茂盛醫院",
};

export function Sticker({
  name,
  className = "",
  eager = false,
  card = false,
  sizes: sizesAttr = "(min-width: 1024px) 400px, 80vw",
}: {
  name: ArtKey;
  className?: string;
  eager?: boolean;
  card?: boolean;
  sizes?: string;
}) {
  const [w, h] = sizes[name];
  return (
    <Image
      src={site.art[name]}
      alt={alts[name]}
      width={w}
      height={h}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      sizes={sizesAttr}
      className={`h-auto w-full select-none ${card ? "rounded-[28px] shadow-[0_24px_50px_-28px_rgba(23,54,93,0.45)]" : ""} ${className}`}
    />
  );
}

// 背景星空：淡淡閃爍的星點
const STARS: [number, number, number, number][] = [
  [8, 14, 1.2, 0], [22, 8, 0.8, 1.5], [36, 20, 1, 3], [58, 6, 1.4, 0.8], [72, 16, 0.8, 2.2],
  [88, 9, 1.1, 4], [93, 30, 0.9, 1], [80, 38, 1.3, 3.4], [64, 28, 0.7, 5], [48, 12, 0.9, 2.8],
  [14, 34, 0.8, 4.4], [4, 52, 1, 1.8], [96, 56, 0.8, 3.8], [30, 44, 0.6, 0.4],
];

export function Starfield({ className = "", light = false }: { className?: string; light?: boolean }) {
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
            background: i % 3 === 0 ? "#EFC75E" : light ? "#FFFFFF" : "#17365D",
            boxShadow: light ? "0 0 6px rgba(255,255,255,0.8)" : undefined,
            animationDelay: `${d}s`,
          }}
        />
      ))}
    </div>
  );
}

// 四角星（插畫裡的星星）
export function Twinkle({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 0c.8 6.4 4.6 10.8 12 12-7.4 1.2-11.2 5.6-12 12-.8-6.4-4.6-10.8-12-12C7.4 10.8 11.2 6.4 12 0z" fill="currentColor" />
    </svg>
  );
}
