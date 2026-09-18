import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/config/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${SITE.name} — ${SITE.specialty} · ${SITE.region.short}`;

const fontDir = join(process.cwd(), "node_modules/pretendard/dist/public/static");

async function loadAssets() {
  const [medium, bold, photo] = await Promise.all([
    readFile(join(fontDir, "Pretendard-Medium.otf")),
    readFile(join(fontDir, "Pretendard-Bold.otf")),
    readFile(join(process.cwd(), "public/images/hero-groomer.jpg")),
  ]);
  return { medium, bold, photo: `data:image/jpeg;base64,${photo.toString("base64")}` };
}

/** 공유 미리보기 이미지 (빌드 시 정적 생성) */
export async function renderOgImage() {
  const { medium, bold, photo } = await loadAssets();

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#F7F3EA", fontFamily: "Pretendard" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 760,
            padding: "64px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#14271F", letterSpacing: -1 }}>{SITE.name}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#56695C", letterSpacing: 6, marginTop: 8 }}>
              {SITE.nameEn}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 22, color: "#A85A3F", fontWeight: 500 }}>
              {`${SITE.region.short} · 미용 교육 전문`}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 54,
                fontWeight: 700,
                color: "#14271F",
                lineHeight: 1.3,
                letterSpacing: -2,
                marginTop: 18,
              }}
            >
              <span>미용이 어려운 아이에게,</span>
              <span>참는 법보다 안전한 경험을.</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#20382F", fontWeight: 500 }}>
            {`상담 ${SITE.phone.display}`}
          </div>
        </div>
        <div style={{ display: "flex", width: 440, height: "100%", padding: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            width={384}
            height={574}
            style={{ width: 384, height: 574, objectFit: "cover", borderRadius: 28 }}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Pretendard", data: medium, weight: 500, style: "normal" },
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}

/** 파비콘/앱 아이콘 */
export async function renderIcon(size: number) {
  const bold = await readFile(join(fontDir, "Pretendard-Bold.otf"));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#20382F",
          color: "#F7F3EA",
          fontSize: Math.round(size * 0.58),
          fontWeight: 700,
          fontFamily: "Pretendard",
          borderRadius: size >= 180 ? 0 : Math.round(size * 0.22),
        }}
      >
        효
      </div>
    ),
    { width: size, height: size, fonts: [{ name: "Pretendard", data: bold, weight: 700, style: "normal" }] },
  );
}
