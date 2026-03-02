import type { Case } from "@/lib/types";
import { BUSINESS_TYPE_LABELS } from "@/lib/types";
import { formatDateJa } from "./format";

/** 顧客提出用メール文のプレーンテキスト（コピー用） */
export function buildEmailText(c: Case): string {
  const businessLabel = BUSINESS_TYPE_LABELS[c.businessType];
  const contactName = c.customer.contactName || "担当者";
  const scheduled = c.scheduledDate ? formatDateJa(c.scheduledDate) : "調整中";

  const lines: string[] = [
    `${contactName} 様`,
    "",
    "お世話になっております。",
    "この度はドローン業務のご依頼をいただき、ありがとうございます。",
    "",
    "下記のとおり見積書および作業計画書をご送付いたします。",
    "ご確認のうえ、ご不明点等がございましたらお知らせください。",
    "",
    "【実施内容】",
    `・現場：${c.siteName}`,
    `・業務：${businessLabel}`,
    `・作業予定日：${scheduled}`,
    c.workDays ? `・作業日数：${c.workDays}日` : "",
    "",
    "何卒よろしくお願いいたします。",
    "",
    "────────────────────",
    "（貴社名・署名をここに記載してください）",
    "────────────────────",
  ];

  return lines.filter(Boolean).join("\n");
}
