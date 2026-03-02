"use client";

import { useState } from "react";
import type { Case } from "@/lib/types";
import { BUSINESS_TYPE_LABELS } from "@/lib/types";
import { getPricingSummary, getPricingLineItems } from "@/lib/calc/pricing";
import { buildEstimateText } from "@/lib/templates";
import { formatDateJa } from "@/lib/templates/format";
import { Button } from "@/components/ui/button";
import { Copy, Printer } from "lucide-react";

interface EstimateViewProps {
  caseData: Case;
}

export function EstimateView({ caseData }: EstimateViewProps) {
  const [copied, setCopied] = useState(false);
  const summary = getPricingSummary(caseData.pricing);
  const lineItems = getPricingLineItems(caseData.pricing);
  const businessLabel = BUSINESS_TYPE_LABELS[caseData.businessType];
  const issueDate = formatDateJa(
    caseData.updatedAt?.slice(0, 10) ?? caseData.createdAt?.slice(0, 10)
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildEstimateText(caseData));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 no-print">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "コピーしました" : "コピー"}
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          印刷
        </Button>
      </div>

      <div
        id="estimate-print-area"
        className="estimate-print rounded-lg border bg-white p-8 text-black print:border-0 print:shadow-none"
      >
        <h2 className="mb-8 text-center text-lg font-bold">
          見　積　書
        </h2>

        <div className="mb-6 space-y-1 text-sm">
          <p>顧客名：{caseData.customer.customerName}</p>
          {caseData.customer.contactName && (
            <p>担当者：{caseData.customer.contactName}</p>
          )}
        </div>

        <p className="mb-6 text-sm">
          件名：{caseData.siteName} におけるドローン{businessLabel}業務について
        </p>

        <div className="mb-6 rounded border p-4 text-sm">
          <p className="mb-2 font-medium">【業務内容】</p>
          <p>{businessLabel}（{caseData.siteName}）</p>
          {caseData.siteAddress && (
            <p>現場住所：{caseData.siteAddress}</p>
          )}
          {caseData.scheduledDate && (
            <p>作業予定日：{formatDateJa(caseData.scheduledDate)}</p>
          )}
          {caseData.memo && <p>備考：{caseData.memo}</p>}
        </div>

        <div className="mb-6 text-sm">
          <p className="mb-2 font-medium">【金額明細】</p>
          <table className="w-full max-w-md">
            <tbody>
              {lineItems
                .filter((item) => item.amount !== 0)
                .map((item) => (
                  <tr key={item.key}>
                    <td className="py-1">{item.label}</td>
                    <td className="text-right">
                      {item.amount < 0 ? "-" : ""}¥
                      {Math.abs(item.amount).toLocaleString()}
                    </td>
                  </tr>
                ))}
              <tr className="border-t">
                <td className="py-1">税抜小計</td>
                <td className="text-right">
                  ¥{summary.subtotal.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-1">消費税（{(summary.taxRate * 100).toFixed(0)}%）</td>
                <td className="text-right">
                  ¥{summary.taxAmount.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t font-semibold">
                <td className="py-2">合計（税込）</td>
                <td className="text-right">
                  ¥{summary.total.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {caseData.pricing.note && (
          <div className="mb-6 text-sm">
            <p className="mb-1 font-medium">【備考】</p>
            <p className="whitespace-pre-wrap">{caseData.pricing.note}</p>
          </div>
        )}

        <p className="text-sm">発行日：{issueDate}</p>
      </div>
    </div>
  );
}
