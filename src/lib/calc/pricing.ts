import type { Pricing } from "@/lib/types";
import { DEFAULT_TAX_RATE } from "@/lib/types";

/** 税抜小計（基本＋出張＋オプション－値引き） */
export function getSubtotal(p: Pricing): number {
  const base = p.baseAmount ?? 0;
  const travel = p.travelFee ?? 0;
  const option = p.optionAmount ?? 0;
  const discount = p.discount ?? 0;
  return Math.max(0, base + travel + option - discount);
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
