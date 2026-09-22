import Link from "next/link";
import { branches, doctorPage, nav } from "@/config/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-night text-ivory/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr_1.2fr] lg:px-10">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-[1.9]">讓生殖醫學變得溫柔、清楚、值得信任。</p>
          <p className="mt-4 font-hand text-lg text-sun/90">用醫學，守護每一個期待</p>
        </div>

        <nav aria-label="頁尾導覽">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-ivory">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/first-visit" className="hover:text-ivory">
                第一次門診
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Clinics</p>
          <ul className="mt-4 space-y-5 text-sm">
            {branches.map((b) => (
              <li key={b.id}>
                <p className="font-serif text-base text-ivory">茂盛醫院 {b.name}</p>
                <p className="mt-1">
                  電話 <a href={b.phoneHref} className="hover:text-ivory">{b.phone}</a>
                  <span className="mx-2 text-ivory/30">|</span>
                  <a href={b.bookingUrl} target="_blank" rel="noopener" className="hover:text-ivory">
                    線上掛號 ↗
                  </a>
                </p>
              </li>
            ))}
            <li>
              <a href={doctorPage} target="_blank" rel="noopener" className="text-gold-soft hover:text-ivory">
                李俊逸醫師門診表與掛號 ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between sm:px-6 lg:px-10">
          <p>本網站內容為衛教資訊，不能取代醫師的個別診斷與建議。</p>
          <p className="tracking-[0.2em]">LEE WOMEN&rsquo;S HOSPITAL｜茂盛醫院小王子　© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
