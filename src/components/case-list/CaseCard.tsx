"use client";

import Link from "next/link";
import type { Case } from "@/lib/types";
import { BUSINESS_TYPE_LABELS } from "@/lib/types";
import { getTotalIncludingTax } from "@/lib/calc/pricing";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Copy, Trash2, FileOutput } from "lucide-react";

interface CaseCardProps {
  caseData: Case;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CaseCard({ caseData, onDuplicate, onDelete }: CaseCardProps) {
  const total = getTotalIncludingTax(caseData.pricing);
  const businessLabel = BUSINESS_TYPE_LABELS[caseData.businessType];

  const handleDelete = () => {
    if (window.confirm("この案件を削除してもよろしいですか？")) {
      onDelete(caseData.id);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{caseData.siteName}</h3>
            <p className="text-sm text-muted-foreground">
              {caseData.customer.customerName}
              {caseData.customer.contactName
                ? ` / ${caseData.customer.contactName}`
                : ""}
            </p>
          </div>
          <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {businessLabel}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-sm text-muted-foreground">
        {caseData.scheduledDate && (
          <p>作業予定日: {caseData.scheduledDate}</p>
        )}
        <p className="mt-1 font-medium text-foreground">
          税込合計: ¥{total.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/case/${caseData.id}`}>
            <Pencil className="mr-1 h-4 w-4" />
            編集
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/case/${caseData.id}/output`}>
            <FileOutput className="mr-1 h-4 w-4" />
            出力
          </Link>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDuplicate(caseData.id)}
        >
          <Copy className="mr-1 h-4 w-4" />
          複製
        </Button>
        <Button variant="outline" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-1 h-4 w-4" />
          削除
        </Button>
      </CardFooter>
    </Card>
  );
}
