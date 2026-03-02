"use client";

import type { Case } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EstimateView } from "./EstimateView";
import { WorkPlanView } from "./WorkPlanView";
import { SafetyChecklistView } from "./SafetyChecklistView";
import { EmailView } from "./EmailView";

interface OutputTabsProps {
  caseData: Case;
}

export function OutputTabs({ caseData }: OutputTabsProps) {
  return (
    <Tabs defaultValue="estimate" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="estimate">見積書</TabsTrigger>
        <TabsTrigger value="workplan">作業計画書</TabsTrigger>
        <TabsTrigger value="checklist">安全チェックリスト</TabsTrigger>
        <TabsTrigger value="email">メール文</TabsTrigger>
      </TabsList>
      <TabsContent value="estimate" className="mt-4">
        <EstimateView caseData={caseData} />
      </TabsContent>
      <TabsContent value="workplan" className="mt-4">
        <WorkPlanView caseData={caseData} />
      </TabsContent>
      <TabsContent value="checklist" className="mt-4">
        <SafetyChecklistView />
      </TabsContent>
      <TabsContent value="email" className="mt-4">
        <EmailView caseData={caseData} />
      </TabsContent>
    </Tabs>
  );
}
