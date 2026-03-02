import type { Pricing } from "@/lib/types";
import { DEFAULT_TAX_RATE, PRICING_LINE_ITEM_LABELS } from "@/lib/types";

const LINE_ITEM_KEYS: (keyof Pick<
  Pricing,
  | "baseAmount"
  | "equipmentFee"
  | "applicationFee"
  | "dataReportFee"
  | "travelFee"
  | "optionAmount"
  | "discount"
>)[] = [
  "baseAmount",
  "equipmentFee",
  "applicationFee",
  "dataReportFee",
  "travelFee",
  "optionAmount",
  "discount",
];

/** 税抜小計（固定項目＋追加項目。値引きは減算） */
export function getSubtotal(p: Pricing): number {
  let sum = 0;
  for (const key of LINE_ITEM_KEYS) {
    const v = p[key];
    if (v == null) continue;
    sum += key === "discount" ? -Number(v) : Number(v);
  }
  const custom = (p.customItems ?? []).reduce((a, i) => a + (i.amount ?? 0), 0);
  return Math.max(0, sum + custom);
}

export type PricingLineItem =
  | { key: (typeof LINE_ITEM_KEYS)[number]; label: string; amount: number }
  | { key: string; label: string; amount: number };

/** 内訳一覧（固定項目＋追加項目。表示・見積用） */
export function getPricingLineItems(p: Pricing): PricingLineItem[] {
  const fixed: PricingLineItem[] = LINE_ITEM_KEYS.map((key) => ({
    key,
    label: PRICING_LINE_ITEM_LABELS[key],
    amount: key === "discount" ? -(p[key] ?? 0) : (p[key] ?? 0),
  }));
  const custom = (p.customItems ?? []).map((i) => ({
    key: `custom-${i.id}`,
    label: i.label || "（項目名未入力）",
    amount: i.amount ?? 0,
  }));
  return [...fixed, ...custom];
}

/** 消費税率（0〜1） */
export function getTaxRate(p: Pricing): number {
  return p.taxRate ?? DEFAULT_TAX_RATE;
}

/** 消費税額（四捨五入） */
export function getTaxAmount(p: Pricing): number {
  return Math.round(getSubtotal(p) * getTaxRate(p));
}

/** 税込合計 */
export function getTotalIncludingTax(p: Pricing): number {
  return getSubtotal(p) + getTaxAmount(p);
}

/** 料金サマリ（表示・出力用） */
export interface PricingSummary {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export function getPricingSummary(p: Pricing): PricingSummary {
  const subtotal = getSubtotal(p);
  const taxRate = getTaxRate(p);
  const taxAmount = getTaxAmount(p);
  const total = subtotal + taxAmount;
  return { subtotal, taxRate, taxAmount, total };
}
