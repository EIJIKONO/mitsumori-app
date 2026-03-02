"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createEmptyCase } from "@/lib/data/initial-case";
import { getCaseById, duplicateCase } from "@/lib/store/case-store";
import { CaseForm } from "@/components/case/CaseForm";
import type { Case } from "@/lib/types";

function NewCasePageContent() {
  const searchParams = useSearchParams();
  const copyId = searchParams.get("copy");
  const [initialCase, setInitialCase] = useState<Case | null>(null);

  useEffect(() => {
    if (copyId) {
      const source = getCaseById(copyId);
      if (source) {
        setInitialCase(duplicateCase(source));
      } else {
        setInitialCase(createEmptyCase(crypto.randomUUID()));
      }
    } else {
      setInitialCase(createEmptyCase(crypto.randomUUID()));
    }
  }, [copyId]);

  if (initialCase === null) {
    return (
      <div className="flex justify-center py-12 text-muted-foreground">
        読み込み中…
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">新規案件</h1>
      <CaseForm initialCase={initialCase} redirectToOutputAfterSave={false} />
    </div>
  );
}

export default function NewCasePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12 text-muted-foreground">
          読み込み中…
        </div>
      }
    >
      <NewCasePageContent />
    </Suspense>
  );
}
