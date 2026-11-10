import type { Metadata } from "next";
import { SettingsView } from "@/components/settings-view";

export const metadata: Metadata = {
  title: "Settings",
  description: "Theme, language, and data settings for the ZecHub workspace.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
