"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCaseById } from "@/lib/store/case-store";
import type { Case } from "@/lib/types";
import { OutputTabs } from "@/components/output/OutputTabs";
import { Button } from "@/components/ui/button";

export default function OutputPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const [caseData, setCaseData] = useState<Case | null | "loading">("loading");

  useEffect(() => {
    if (!id) {
      setCaseData(null);
      return;
    }
    const c = getCaseById(id);
    setCaseData(c ?? null);
  }, [id]);

  if (caseData === "loading") {
    return (
      <div className="flex justify-center py-12 text-muted-foreground">
        読み込み中…
      </div>
    );
  }

  if (caseData === null) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">案件が見つかりません。</p>
        <Button asChild variant="outline">
          <Link href="/">一覧に戻る</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">出力</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/case/${id}`}>案件を編集</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">一覧に戻る</Link>
          </Button>
        </div>
      </div>
      <OutputTabs caseData={caseData} />
    </div>
  );
}
