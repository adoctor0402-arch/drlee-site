// 網站全域設定：導覽、品牌文字、預約連結。
// 醫院掛號系統改版時，只需要改這個檔案。

export const site = {
  name: "小王子醫師",
  nameEn: "Dr. Lee",
  doctor: "李俊逸 醫師",
  tagline: "讓生殖醫學變得溫柔、清楚、值得信任",
  slogan: "More Families · A Brighter Tomorrow",
  promise: "用醫學，守護每一個期待",
  // 換成真人照片：把照片放到 public/images/ 後改這個路徑（建議直式 4:5，至少 1200×1500）
  heroImage: "/images/dr-lee-placeholder.svg",
  // 品牌插畫（Ben 提供的小王子醫師插畫）
  art: {
    hero: "/images/prince/hero.webp",
    embryo: "/images/prince/embryo.webp",
    ultrasound: "/images/prince/ultrasound.webp",
    books: "/images/prince/books.webp",
    plane: "/images/prince/plane.webp",
    globe: "/images/prince/globe.webp",
  },
  description:
    "小王子醫師 Dr. Lee（李俊逸醫師）｜茂盛醫院生殖醫學。以專業為引導，以溫柔為初心，陪你走過備孕、凍卵、試管與反覆流產路上的每一個問號。",
};

export const nav = [
  { label: "關於我", href: "/about" },
  { label: "我可以幫你", href: "/#help" },
  { label: "備孕筆記", href: "/notes" },
  { label: "Dr. Lee Lab", href: "/lab" },
  { label: "最新消息", href: "/now" },
];

// 追蹤網站帶來的掛號量（若醫院系統不接受 query string，把 utm 設為空字串即可）
const utm = "utm_source=drlee-site&utm_medium=cta&utm_campaign=booking";
const withUtm = (url: string) => (utm ? `${url}${url.includes("?") ? "&" : "?"}${utm}` : url);

export type Branch = {
  id: "taichung" | "banqiao";
  name: string;
  area: string;
  phone: string;
  phoneHref: string;
  bookingUrl: string;
};

export const branches: Branch[] = [
  {
    id: "taichung",
    name: "台中總院",
    area: "台中市",
    phone: "(04) 2234-7057",
    phoneHref: "tel:+886422347057",
    bookingUrl: withUtm("https://www.ivftaiwan.tw/appointment/taichung"),
  },
  {
    id: "banqiao",
    name: "板橋分院",
    area: "新北市板橋區",
    phone: "(02) 2258-6208",
    phoneHref: "tel:+886222586208",
    bookingUrl: withUtm("https://www.ivftaiwan.tw/appointment/taipei/department/step2"),
  },
];

export const hospitalLinks = {
  schedule: "https://www.ivftaiwan.tw/guide/schedule",
  firstVisitGuide: "https://www.ivftaiwan.tw/guide",
};
