import Link from "next/link";
import { formatUpdated, type NoteMeta } from "@/lib/notes";

// 卡片封面：品牌 metaphor 的抽象插畫（星軌 / 星座 / 新芽）
function NoteArt({ variant }: { variant: number }) {
  if (variant % 3 === 0)
    return (
      <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" aria-hidden>
        <ellipse cx="150" cy="80" rx="110" ry="34" fill="none" stroke="#17365D" strokeOpacity=".18" />
        <ellipse cx="150" cy="80" rx="70" ry="20" fill="none" stroke="#C6A15B" strokeOpacity=".6" strokeDasharray="2 5" />
        <circle cx="150" cy="80" r="16" fill="#17365D" fillOpacity=".85" />
        <circle cx="222" cy="68" r="5" fill="#C6A15B" />
      </svg>
    );
  if (variant % 3 === 1)
    return (
      <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M60 110 L110 60 L160 90 L205 45 L245 75" fill="none" stroke="#17365D" strokeOpacity=".3" />
        {[[60, 110], [110, 60], [160, 90], [205, 45], [245, 75]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 3 ? 6 : 4} fill={i === 3 ? "#C6A15B" : "#17365D"} />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" aria-hidden>
      <path d="M40 140 Q150 110 260 140" fill="none" stroke="#17365D" strokeOpacity=".25" />
      <path d="M150 128 C 150 110, 150 96, 152 82" stroke="#5E7B66" strokeWidth="2" fill="none" />
      <path d="M152 92 C 136 90, 128 78, 130 66 C 144 68, 153 78, 152 92z" fill="#8FA897" />
      <path d="M152 86 C 164 76, 178 76, 184 82 C 176 94, 162 94, 152 86z" fill="#BBC9BE" />
      <circle cx="200" cy="40" r="4" fill="#C6A15B" />
    </svg>
  );
}

const TINTS = ["bg-mist", "bg-sand", "bg-sage/40"];

export function NoteCard({ note, index = 0 }: { note: NoteMeta; index?: number }) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-deep/[0.07] bg-white transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(23,54,93,0.35)]"
    >
      <div className={`relative h-40 overflow-hidden ${TINTS[index % 3]}`}>
        <NoteArt variant={index} />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-medium tracking-widest text-gold">{note.category}</p>
        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-deep group-hover:underline group-hover:decoration-gold/60 group-hover:underline-offset-4">
          {note.title}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.85] text-muted">{note.summary}</p>
        <p className="mt-auto pt-6 text-xs text-muted/80">更新於 {formatUpdated(note.updated)}</p>
      </div>
    </Link>
  );
}
