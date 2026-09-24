"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BookingButton } from "@/components/booking";
import { site } from "@/config/site";
import s from "@/app/sky/sky.module.css";
import { miniSkySVG } from "./egg-stars";

const CARDS = [
  {
    href: "/sky/natural",
    seed: 11,
    lit: 13,
    total: 60,
    glow: false,
    tag: "自然懷孕機率",
    title: "你們的星空",
    body: "已經完成不孕檢查，但還沒開始治療？看看在不治療的情況下，一年內自然懷孕並生下寶寶的機率大約是多少，以及再等一年的代價。",
    who: "給已診斷不孕的伴侶",
  },
  {
    href: "/sky/eggs",
    seed: 23,
    lit: 14,
    total: 26,
    glow: true,
    tag: "凍卵累積活產機率",
    title: "我的卵子，夠不夠？",
    body: "已經凍了卵，或正在考慮？輸入凍卵年齡與成熟卵子數，看看在真實回來解凍的族群中，至少迎來一個寶寶的累積機率落在哪個區間。",
    who: "給凍卵中或考慮凍卵的女性",
  },
];

export function SkyHub() {
  const [theme, setTheme] = useState<"dark" | "light" | undefined>(undefined);

  return (
    <div className={s.app} data-theme={theme}>
      <div className={s.wrap}>
        <div className={s.brand}>
          <b>{site.name}</b>
          <button
            className={s.theme}
            onClick={() =>
              setTheme((t) => {
                const cur = t ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
                return cur === "light" ? "dark" : "light";
              })
            }
            aria-label="切換深淺色"
          >
            {theme === "light" ? "夜空" : theme === "dark" ? "晨光" : "切換色調"}
          </button>
        </div>

        <div className={s.fade}>
          <Image
            className={s["hero-img"]}
            src={site.art.hero}
            alt="小王子醫師坐在星球上，身旁有一隻小狐狸"
            width={1254}
            height={1254}
            sizes="460px"
            priority
          />
          <h1>
            每一個生命，
            <br />
            都是獨一無二的星星
          </h1>
          <p className={s.muted}>
            兩個以近年國際研究為基礎的試算工具，幫你把「還有多少機會」變成看得見的星空。各只要 30
            秒，資料只在你的手機上計算，不會上傳。
          </p>

          {CARDS.map((c) => (
            <Link key={c.href} className={s.hubcard} href={c.href}>
              <div
                className={s.mini}
                dangerouslySetInnerHTML={{ __html: miniSkySVG(c.seed, c.lit, c.total, c.glow) }}
              />
              <div className={s.tag}>{c.tag}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <div className={s.who}>
                <b>{c.who}</b>
                <span className={s.arrow}>開始試算 →</span>
              </div>
            </Link>
          ))}

          <div className={s.doc} style={{ marginTop: 24 }}>
            <div className={s.sticker}>
              <Image src={site.art.embryo} alt="小王子醫師抱著發光的胚胎" width={1024} height={1536} sizes="200px" />
            </div>
            <div>
              <div className={s.who}>小王子醫師想說</div>
              <div className={s.say}>
                這些數字都是族群層級的估計，告訴你的是和你條件相似的一群人後來發生了什麼，而不是你個人的保證。它們真正的用途，是讓你走進診間時，手上已經有一個可以一起討論的起點。
              </div>
            </div>
          </div>

          <div className={s.row}>
            <BookingButton className={s.btn}>預約諮詢，和醫師聊聊</BookingButton>
            <Link className={`${s.btn} ${s.ghost}`} href="/" style={{ textAlign: "center", textDecoration: "none" }}>
              回小王子醫師網站
            </Link>
          </div>

          <div className={s.foot} style={{ marginTop: 24 }}>
            兩項工具均為衛教參考，不是醫療器材，也不能取代醫師的診斷與建議。
            <br />
            自然懷孕模型：Cameron NJ et al., Human Reproduction Open 2026（蘇格蘭 7,086 對伴侶）。
            <br />
            凍卵模型：Cascante SD et al., J Assist Reprod Genet 2024;41:2979-2985（NYU 731 位解凍患者），截距為重建值。
            <br />© {site.name}｜{site.slogan}
          </div>
        </div>
      </div>
    </div>
  );
}
