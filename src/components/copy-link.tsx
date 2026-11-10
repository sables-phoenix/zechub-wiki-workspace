"use client";

import { toast } from "sonner";
import { CopyIcon } from "@/components/animated-icons/copy-icon";
import { Button } from "@/components/ui/button";

type CopyLinkButtonProps = {
  path: string;
};

export function CopyLinkButton({ path }: CopyLinkButtonProps) {
  const copy = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={copy}>
      <CopyIcon size={14} className="h-3.5 w-3.5" />
      Copy link
    </Button>
  );
}
