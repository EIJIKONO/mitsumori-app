"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCaseById } from "@/lib/store/case-store";
import { CaseForm } from "@/components/case/CaseForm";
import type { Case } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function EditCasePage() {
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
      <h1 className="text-xl font-semibold">案件の編集</h1>
      <CaseForm
        initialCase={caseData}
        redirectToOutputAfterSave={false}
      />
    </div>
  );
}
