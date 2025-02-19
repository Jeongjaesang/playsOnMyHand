import { useState } from "react";
import { Button } from "@/components/shadcn/button";
import { Link, Check } from "lucide-react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="flex items-center space-x-2"
    >
      {copied ? <Check className="w-5 h-5" /> : <Link className="w-5 h-5" />}
      <span>링크 복사</span>
    </Button>
  );
}
