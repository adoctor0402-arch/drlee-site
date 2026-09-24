import type { Metadata } from "next";
import { BookingProvider } from "@/components/booking";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site, siteUrl } from "@/config/site";
// 字型自架（@fontsource），不依賴 Google Fonts 連線；中文會依 unicode-range 分片載入
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/500.css";
import "@fontsource/noto-sans-tc/700.css";
import "@fontsource/noto-serif-tc/500.css";
import "@fontsource/noto-serif-tc/600.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/lxgw-wenkai-tc/400.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: `${site.name} ${site.nameEn}｜${site.tagline}`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} ${site.nameEn}`,
    description: site.description,
    locale: "zh_TW",
    type: "website",
    url: "/",
    siteName: `${site.name} ${site.nameEn}`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} ${site.nameEn}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant-TW"
      className="antialiased"
    >
      <body className="min-h-dvh flex flex-col">
        <BookingProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
