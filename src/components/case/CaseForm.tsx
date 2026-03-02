"use client";

import { useState } from "react";
import Link from "next/link";
import type { Case } from "@/lib/types";
import { saveCase } from "@/lib/store/case-store";
import { CustomerSection } from "./CustomerSection";
import { ProjectSection } from "./ProjectSection";
import { FlightConditionSection } from "./FlightConditionSection";
import { PricingSection } from "./PricingSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CaseFormProps {
  initialCase: Case;
  /** 保存後に出力ページへ遷移するか（編集時は true 推奨） */
  redirectToOutputAfterSave?: boolean;
}

export function CaseForm({
  initialCase,
  redirectToOutputAfterSave = false,
}: CaseFormProps) {
  const [caseData, setCaseData] = useState<Case>(initialCase);

  const handleSave = () => {
    saveCase(caseData);
    if (redirectToOutputAfterSave) {
      window.location.href = `/case/${caseData.id}/output`;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customer">顧客</TabsTrigger>
          <TabsTrigger value="project">案件</TabsTrigger>
          <TabsTrigger value="flight">飛行条件</TabsTrigger>
          <TabsTrigger value="pricing">料金</TabsTrigger>
        </TabsList>
        <TabsContent value="customer" className="mt-4">
          <CustomerSection
            customer={caseData.customer}
            onChange={(customer) =>
              setCaseData((prev) => ({ ...prev, customer }))
            }
          />
        </TabsContent>
        <TabsContent value="project" className="mt-4">
          <ProjectSection
            caseData={caseData}
            onChange={setCaseData}
          />
        </TabsContent>
        <TabsContent value="flight" className="mt-4">
          <FlightConditionSection
            caseData={caseData}
            onChange={setCaseData}
          />
        </TabsContent>
        <TabsContent value="pricing" className="mt-4">
          <PricingSection
            pricing={caseData.pricing}
            onChange={(pricing) =>
              setCaseData((prev) => ({ ...prev, pricing }))
            }
            businessType={caseData.businessType}
          />
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap gap-3 border-t pt-6">
        <Button onClick={handleSave}>保存</Button>
        <Button variant="outline" asChild>
          <Link href={`/case/${caseData.id}/output`}>出力へ</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/">一覧に戻る</Link>
        </Button>
      </div>
    </div>
  );
}
