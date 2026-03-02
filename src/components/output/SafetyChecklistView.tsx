"use client";

import { useState } from "react";
import { buildSafetyChecklistText, SAFETY_CHECK_ITEMS } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export function SafetyChecklistView() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildSafetyChecklistText());
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
        <h3 className="mb-2 text-center font-semibold">
          安全チェックリスト
        </h3>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          飛行前にお互いに確認し、チェックした上で作業を開始してください。
        </p>
        <ul className="space-y-3">
          {SAFETY_CHECK_ITEMS.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-input">
                □
              </span>
              <span>
                {i + 1}. {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
