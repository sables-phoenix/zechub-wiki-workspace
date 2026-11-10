export type Tone = "gold" | "slate" | "rust" | "green" | "muted";

export const toneClasses: Record<Tone, { text: string; border: string; bg: string; dot: string }> = {
  gold: {
    text: "text-gold-deep",
    border: "border-gold",
    bg: "bg-gold/15",
    dot: "bg-gold",
  },
  slate: {
    text: "text-slate",
    border: "border-slate",
    bg: "bg-slate/10",
    dot: "bg-slate",
  },
  rust: {
    text: "text-rust",
    border: "border-rust",
    bg: "bg-rust/10",
    dot: "bg-rust",
  },
  green: {
    text: "text-green",
    border: "border-green",
    bg: "bg-green/10",
    dot: "bg-green",
  },
  muted: {
    text: "text-muted",
    border: "border-line",
    bg: "bg-paper-2",
    dot: "bg-muted",
  },
};
