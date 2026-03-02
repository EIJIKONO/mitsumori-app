"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCases, duplicateCase, saveCase, deleteCase, seedWithMockIfEmpty } from "@/lib/store/case-store";
import { mockCases } from "@/lib/data/mock-cases";
import type { Case } from "@/lib/types";
import { CaseCard } from "./CaseCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CaseList() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);

  useEffect(() => {
    seedWithMockIfEmpty(mockCases);
    setCases(getCases());
  }, []);

  const handleDuplicate = (id: string) => {
    const source = cases.find((c) => c.id === id);
    if (!source) return;
    const duplicated = duplicateCase(source);
    saveCase(duplicated);
    setCases(getCases());
    router.push(`/case/${duplicated.id}`);
  };

  const handleDelete = (id: string) => {
    deleteCase(id);
    setCases(getCases());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">案件一覧</h1>
        <Button asChild>
          <Link href="/case/new">
            <Plus className="mr-2 h-4 w-4" />
            新規案件
          </Link>
        </Button>
      </div>

      {cases.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          案件がありません。「新規案件」から追加してください。
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <li key={c.id}>
              <CaseCard
                caseData={c}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
