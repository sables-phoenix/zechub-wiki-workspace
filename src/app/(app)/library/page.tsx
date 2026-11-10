import type { Metadata } from "next";
import { LibraryView } from "@/components/library-view";

export const metadata: Metadata = {
  title: "Site Navigation",
  description: "Browse the complete hierarchy of guides, tutorials, research, developer documentation, and ecosystem resources on ZecHub.",
};

export default function LibraryPage() {
  return <LibraryView />;
}
