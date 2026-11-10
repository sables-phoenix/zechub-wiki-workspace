import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { knownPaths } from "@/lib/pages";

type MarkdownProps = {
  markdown: string;
  pagePath: string;
};

const resolveInternal = (href: string, pagePath: string): string | null => {
  try {
    if (href.startsWith("#")) return href;
    if (href.startsWith("/")) {
      const url = new URL(href, "https://zechub.wiki");
      return knownPaths.has(url.pathname) ? `${url.pathname}${url.search}${url.hash}` : null;
    }
    const url = new URL(href, `https://zechub.wiki/${pagePath}`);
    if (url.hostname !== "zechub.wiki") return null;
    if (!knownPaths.has(url.pathname)) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
};

export function Markdown({ markdown, pagePath }: MarkdownProps) {
  return (
    <div className="article-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          a: ({ node: _node, href, children, ...props }) => {
            if (!href) return <span>{children}</span>;
            const internal = resolveInternal(href, pagePath);
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
