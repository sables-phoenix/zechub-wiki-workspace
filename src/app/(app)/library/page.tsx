import type { Metadata } from "next";
import { LibraryView } from "@/components/library-view";

export const metadata: Metadata = {
  title: "Library",
  description: "Every ZecHub Wiki page in one searchable library.",
};

export default function LibraryPage() {
  return <LibraryView />;
}
