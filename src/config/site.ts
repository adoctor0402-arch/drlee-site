// 網站全域設定：導覽、品牌文字、預約連結。
// 醫院掛號系統改版時，只需要改這個檔案。

export const site = {
  name: "小王子醫師",
  nameEn: "Dr. Lee",
  doctor: "李俊逸 醫師",
  tagline: "讓生殖醫學變得溫柔、清楚、值得信任",
  slogan: "More Families · A Brighter Tomorrow",
  promise: "用醫學，守護每一個期待",
  nameEnFull: "Dr. Lee Chun-I",
  // 真人照片
  photo: "/images/dr-lee.webp",
  avatar: "/images/dr-lee-avatar.webp",
  // 關於我：身分與經歷
  roles: ["茂盛醫院 生殖醫學科主任醫師", "基因遺傳主任", "中山醫學大學婦產部副教授"],
  // 品牌插畫（Ben 提供的小王子醫師插畫）
  art: {
    hero: "/images/prince/hero.webp",
    embryo: "/images/prince/embryo.webp",
    ultrasound: "/images/prince/ultrasound.webp",
    books: "/images/prince/books.webp",
    plane: "/images/prince/plane.webp",
    globe: "/images/prince/globe.webp",
    journey: "/images/prince/journey.webp",
    watering: "/images/prince/watering.webp",
    microscope: "/images/prince/microscope.webp",
    heart: "/images/prince/heart.webp",
  },
  description:
    "小王子醫師 Dr. Lee（李俊逸醫師）｜茂盛醫院生殖醫學。以專業為引導，以溫柔為初心，陪你走過備孕、凍卵、試管與反覆流產路上的每一個問號。",
};

export const nav = [
  { label: "關於我", href: "/about" },
  { label: "我可以幫你", href: "/#help" },
  { label: "備孕筆記", href: "/notes" },
  { label: "星際觀測站", href: "/observatory" },
  { label: "Dr. Lee Lab", href: "/lab" },
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

// 李俊逸醫師在茂盛醫院官網的介紹與掛號頁（兩院區門診表都在這裡）
export const doctorPage = withUtm("https://www.ivftaiwan.tw/drgroup/section/detail/2");

export const hospitalLinks = {
  schedule: "https://www.ivftaiwan.tw/guide/schedule",
  firstVisitGuide: "https://www.ivftaiwan.tw/guide",
};
