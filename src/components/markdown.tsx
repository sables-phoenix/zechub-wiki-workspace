import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { knownPaths } from "@/lib/pages";
import { isLocale } from "@/lib/i18n";

type MarkdownProps = {
  markdown: string;
  pagePath: string;
  basePath?: string;
};

const resolveInternal = (
  href: string,
  pagePath: string,
  basePath: string,
): string | null => {
  try {
    if (href.startsWith("#")) return href;
    const url = href.startsWith("/")
      ? new URL(href, "https://zechub.wiki")
      : new URL(href, `https://zechub.wiki/${pagePath}`);
    if (url.hostname !== "zechub.wiki") return null;
    const segments = url.pathname.split("/").filter(Boolean);
    const first = segments[0];
    const pathname =
      first && isLocale(first) ? `/${segments.slice(1).join("/")}` : url.pathname;
    if (pathname === "/") return `${basePath}/`;
    if (!knownPaths.has(pathname)) return null;
    return `${basePath}${pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
};

export function Markdown({ markdown, pagePath, basePath = "" }: MarkdownProps) {
  return (
    <div className="article-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          a: ({ node: _node, href, children, ...props }) => {
            if (!href) return <span>{children}</span>;
            const internal = resolveInternal(href, pagePath, basePath);
            if (internal) {
              return (
                <Link href={internal} {...props}>
                  {children}
                </Link>
              );
            }
            return (
              <a href={href} target="_blank" rel="noreferrer" {...props}>
                {children}
              </a>
            );
          },
          img: ({ node: _node, alt, ...props }) => (
            <img alt={alt ?? ""} loading="lazy" decoding="async" referrerPolicy="no-referrer" {...props} />
          ),
          iframe: ({ node: _node, title, ...props }) => (
            <iframe title={title ?? "Embedded video"} loading="lazy" {...props} />
          ),
          table: ({ node: _node, children }) => (
            <div className="article-table">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
