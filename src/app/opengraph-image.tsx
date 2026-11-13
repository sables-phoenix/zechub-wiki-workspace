import { ImageResponse } from "next/og";

export const alt = "ZecHub Wiki: the Zcash wiki in one workspace";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3e8d4",
          color: "#14130f",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "999px",
              background: "#14130f",
              color: "#f3e8d4",
              fontSize: "24px",
            }}
          >
            Z
          </div>
          <div style={{ display: "flex", fontSize: "28px", fontWeight: 600 }}>ZecHub Wiki</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              lineHeight: 0.95,
              letterSpacing: "-4px",
              maxWidth: "920px",
            }}
          >
            The Zcash wiki, in one workspace.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#6c5b45",
              fontFamily: "Arial, sans-serif",
            }}
          >
            232 pages · 38 active wallets · live network data
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #c9b99f",
            paddingTop: "24px",
            fontFamily: "Arial, sans-serif",
            fontSize: "20px",
            color: "#6c5b45",
          }}
        >
          <span>zechub.wiki content, rebuilt as a desktop workspace</span>
          <span style={{ color: "#9a6a00" }}>zechub-wiki-workspace.vercel.app</span>
        </div>
      </div>
    ),
    size,
  );
}
