import type { Case } from "@/lib/types";
import { BUSINESS_TYPE_LABELS } from "@/lib/types";
import { getPricingSummary, getPricingLineItems } from "@/lib/calc/pricing";
import { formatDateJa } from "./format";

/** 見積書のプレーンテキスト（コピー用） */
export function buildEstimateText(c: Case): string {
  const summary = getPricingSummary(c.pricing);
  const lineItems = getPricingLineItems(c.pricing);
  const businessLabel = BUSINESS_TYPE_LABELS[c.businessType];
  const issueDate = formatDateJa(c.updatedAt?.slice(0, 10) ?? undefined);

  const lines: string[] = [
    "　　　　　　　　　　　　　　　　　　　見　積　書",
    "",
    `顧客名：${c.customer.customerName}`,
    c.customer.contactName ? `担当者：${c.customer.contactName}` : "",
    "",
    `件名：${c.siteName} におけるドローン${businessLabel}業務について`,
    "",
    "【業務内容】",
    `　${businessLabel}（${c.siteName}）`,
    c.siteAddress ? `　現場住所：${c.siteAddress}` : "",
    c.scheduledDate ? `　作業予定日：${formatDateJa(c.scheduledDate)}` : "",
    c.memo ? `　備考：${c.memo}` : "",
    "",
    "【金額明細】",
    ...lineItems
      .filter((item) => item.amount !== 0)
      .map(
        (item) =>
          `　${item.label}　${item.amount < 0 ? "-" : ""}¥${Math.abs(item.amount).toLocaleString()}`
      ),
    `　────────────────────`,
    `　税抜小計　　　　　　　　¥${summary.subtotal.toLocaleString()}`,
    `　消費税（${(summary.taxRate * 100).toFixed(0)}%）　　　　　¥${summary.taxAmount.toLocaleString()}`,
    `　────────────────────`,
    `　合計（税込）　　　　　　¥${summary.total.toLocaleString()}`,
    "",
    c.pricing.note ? `【備考】\n${c.pricing.note}` : "",
    "",
    `発行日：${issueDate}`,
  ];

  return lines.filter(Boolean).join("\n");
}
