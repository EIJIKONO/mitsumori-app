"use client";

import { useState } from "react";
import type { Case } from "@/lib/types";
import { buildEmailText } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface EmailViewProps {
  caseData: Case;
}

export function EmailView({ caseData }: EmailViewProps) {
  const [copied, setCopied] = useState(false);
  const text = buildEmailText(caseData);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Button variant="outline" size="sm" onClick={handleCopy}>
        <Copy className="mr-2 h-4 w-4" />
        {copied ? "コピーしました" : "コピー"}
      </Button>
      <div className="rounded-lg border bg-card p-6">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
          {text}
        </pre>
      </div>
    </div>
  );
}
