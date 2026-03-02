import type { Case } from "@/lib/types";
import { emptyCustomer } from "@/lib/types/customer";
import { emptyPricing } from "@/lib/types/pricing";

/** 新規案件の初期値（ID は呼び出し側で付与する想定） */
export function createEmptyCase(id: string): Case {
  return {
    id,
    customer: { ...emptyCustomer },
    siteName: "",
    siteAddress: "",
    businessType: "roof_inspection",
    scheduledDate: "",
    aircraft: "",
    workerCount: undefined,
    workDays: undefined,
    memo: "",
    pricing: { ...emptyPricing },
  };
}
