import type { Metadata } from "next";
import Link from "next/link";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy",
  description: "No analytics, no ad networks, no tracking cookies, no fingerprinting.",
};

const sections = [
  {
    title: "We do not track you",
    body: "There are no analytics, no advertising, no tracking cookies, no fingerprinting, and no third-party trackers on this site. Reading the wiki requires no account, and we build no profile of you. We do not opt you into browser ad-topics APIs (they are disabled site-wide).",
  },
  {
    title: "Your connection to the site",
    body: "The site is served by our hosting provider (Vercel), which, like any web host, processes the network requests needed to deliver each page and keeps short-lived operational logs. Connections are HTTPS-only (enforced via HSTS). When you click a link that leaves the site, your browser sends only the originating site, never the specific page you were on.",
  },
  {
    title: "Images, fonts, and assets",
    body: "Fonts and the brand images on this workspace are hosted here. Article images and wallet logos load from zechub.wiki. Rendering a page therefore makes a request to zechub.wiki for those assets. The original site also uses a small number of Wikimedia logos and live status badges from shields.io.",
  },
  {
    title: "Embeds",
    body: "Some articles embed YouTube videos. The embed loads when you open the article, which creates a direct connection to YouTube. YouTube operates under its own privacy policy. The original ZecHub site uses a click-to-load placeholder for these embeds. This workspace does not.",
  },
  {
    title: "Optional features",
    body: "This workspace does not include the ZecHub newsletter, wallet likes, or the AI assistant. It has no accounts and no write actions. The wallet ratings and page content are a snapshot. Live network data comes from the public ZecHub APIs.",
  },
  {
    title: "Open source",
    body: "This workspace is public. You can read and audit the code in the repository, and you can read the original privacy statement on zechub.wiki. This page describes the workspace as it currently behaves.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <SectionHero
        eyebrow="Privacy"
        title="Privacy"
        description="No analytics, no ad networks, no tracking cookies, no fingerprinting."
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/privacy" target="_blank" rel="noreferrer">
              Original statement
            </a>
          </Button>
        }
        meta={<span>Source: zechub.wiki/privacy</span>}
      />

      <div className="container-page py-8 md:py-10">
        <div className="max-w-3xl space-y-8 rounded-card border border-line bg-paper p-6 shadow-stamp md:p-8">
          <p className="text-base leading-relaxed text-muted">
            ZecHub is an open-source education hub for a privacy-preserving currency, so we hold the site
            itself to the same standard. This page describes, plainly, who can observe that you visited.
          </p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl leading-tight tracking-[-0.04em]">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
          <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
            Read the source statement at{" "}
            <a
              href="https://zechub.wiki/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-gold-deep underline underline-offset-4"
            >
              zechub.wiki/privacy
            </a>
            .{" "}
            <Link href="/settings" className="text-gold-deep underline underline-offset-4">
              Back to settings
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
