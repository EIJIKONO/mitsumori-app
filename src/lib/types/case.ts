import type { Customer } from "./customer";
import type { Pricing } from "./pricing";
import type { BusinessType } from "./business-type";

/**
 * 案件情報（顧客・現場・飛行条件・料金を一括保持）
 */
export interface Case {
  id: string;

  /** 顧客情報（埋め込み） */
  customer: Customer;

  /** 現場名 */
  siteName: string;
  /** 現場住所 */
  siteAddress?: string;
  /** 業務種別 */
  businessType: BusinessType;
  /** 作業予定日（YYYY-MM-DD） */
  scheduledDate?: string;
  /** 使用機体 */
  aircraft?: string;
  /** 作業人数 */
  workerCount?: number;
  /** 作業日数 */
  workDays?: number;
  /** 備考 */
  memo?: string;

  /** DID（人口集中地区）該当の有無 */
  isDID?: boolean;
  /** 目視外飛行の有無 */
  isBVLOS?: boolean;
  /** 夜間飛行の有無 */
  isNightFlight?: boolean;
  /** 道路上空飛行の有無 */
  isOverRoad?: boolean;
  /** 第三者立入管理の必要有無 */
  needsThirdPartyManagement?: boolean;
  /** 周辺建物の状況 */
  surroundingCondition?: string;
  /** 離着陸場所の確保可否 */
  hasLandingArea?: boolean;
  /** 補助者の必要有無 */
  needsAssistant?: boolean;
  /** 安全上の特記事項 */
  safetyNotes?: string;

  /** 料金 */
  pricing: Pricing;

  /** 作成日時（ISO 8601） */
  createdAt?: string;
  /** 更新日時（ISO 8601） */
  updatedAt?: string;
}
