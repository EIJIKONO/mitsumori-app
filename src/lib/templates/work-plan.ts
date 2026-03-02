import type { Case } from "@/lib/types";
import { BUSINESS_TYPE_LABELS } from "@/lib/types";
import { formatDateJa } from "./format";

/** 作業計画書のプレーンテキスト（コピー用） */
export function buildWorkPlanText(c: Case): string {
  const businessLabel = BUSINESS_TYPE_LABELS[c.businessType];

  const lines: string[] = [
    "　　　　　　　　　　　　　　　　　　　作　業　計　画　書",
    "",
    "【案件概要】",
    `　現場名：${c.siteName}`,
    c.siteAddress ? `　現場住所：${c.siteAddress}` : "",
    `　業務種別：${businessLabel}`,
    c.scheduledDate ? `　実施予定日：${formatDateJa(c.scheduledDate)}` : "",
    c.workDays ? `　作業日数：${c.workDays}日` : "",
    "",
    "【実施日時】",
    c.scheduledDate ? `　${formatDateJa(c.scheduledDate)}（天候により変更の可能性あり）` : "　－",
    "",
    "【実施場所】",
    `　${c.siteAddress ?? c.siteName ?? "－"}`,
    "",
    "【作業内容】",
    `　ドローンを用いた${businessLabel}を実施します。`,
    c.memo ? `　${c.memo}` : "",
    "",
    "【使用機材】",
    c.aircraft ? `　機体：${c.aircraft}` : "　－",
    "",
    "【人員体制】",
    c.workerCount ? `　作業人数：${c.workerCount}名` : "　－",
    c.needsAssistant ? "　補助者を配置" : "",
    "",
    "【リスク事項】",
    ...(function () {
      const risk: string[] = [];
      if (c.isDID) risk.push("　・DID（人口集中地区）該当");
      if (c.isBVLOS) risk.push("　・目視外飛行");
      if (c.isNightFlight) risk.push("　・夜間飛行");
      if (c.isOverRoad) risk.push("　・道路上空飛行");
      if (c.safetyNotes) risk.push(`　・${c.safetyNotes}`);
      return risk.length > 0 ? risk : ["　（特になし）"];
    })(),
    "",
    "【安全対策】",
    c.needsThirdPartyManagement ? "　・第三者立入管理を実施" : "",
    c.hasLandingArea ? "　・離着陸場所を確保" : "",
    c.surroundingCondition ? `　・周辺状況：${c.surroundingCondition}` : "",
    "　・飛行前点検の実施",
    "　・気象条件の確認",
    "",
    "【注意事項】",
    "　・風速5m/s以上、降雨・濃霧時は飛行を中止します。",
    "　・関係者以外の立入禁止区域を設定し、安全を確保します。",
    c.memo ? `　・${c.memo}` : "",
  ];

  return lines.filter(Boolean).join("\n");
}
