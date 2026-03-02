import type { Case } from "@/lib/types";

const now = new Date().toISOString();
const past = new Date(Date.now() - 86400000 * 3).toISOString();

/** 開発・動作確認用ダミー案件 1: 屋根点検 */
export const mockCase1: Case = {
  id: "mock-case-001",
  customer: {
    customerName: "株式会社サンプル建設",
    contactName: "山田 太郎",
    email: "yamada@sample-kenzetsu.co.jp",
    phone: "03-1234-5678",
  },
  siteName: "○○町 Ａ様邸",
  siteAddress: "東京都○○区○○町 1-2-3",
  businessType: "roof_inspection",
  scheduledDate: "2025-03-15",
  aircraft: "DJI Mini 3 Pro",
  workerCount: 2,
  workDays: 1,
  memo: "初回点検。雨の場合は順延。",
  isDID: true,
  isBVLOS: false,
  isNightFlight: false,
  isOverRoad: false,
  needsThirdPartyManagement: true,
  surroundingCondition: "周辺に民家あり。離着陸は庭を利用。",
  hasLandingArea: true,
  needsAssistant: true,
  safetyNotes: "電線に注意。風速5m/s以上は中止。",
  pricing: {
    baseAmount: 80000,
    travelFee: 15000,
    optionAmount: 0,
    discount: 0,
    taxRate: 0.1,
    note: "交通費は実費を別途請求する場合があります。",
  },
  createdAt: past,
  updatedAt: now,
};

/** 開発・動作確認用ダミー案件 2: 太陽光点検 */
export const mockCase2: Case = {
  id: "mock-case-002",
  customer: {
    customerName: "△△ソーラー株式会社",
    contactName: "佐藤 花子",
    email: "sato@deltasolar.co.jp",
    phone: "06-9876-5432",
  },
  siteName: "□□メガソーラー発電所",
  siteAddress: "大阪府□□市□□ 100",
  businessType: "solar_inspection",
  scheduledDate: "2025-03-20",
  aircraft: "DJI Mavic 3 Enterprise",
  workerCount: 3,
  workDays: 2,
  memo: "パネル熱異常・破損の有無を確認。",
  isDID: false,
  isBVLOS: false,
  isNightFlight: false,
  isOverRoad: false,
  needsThirdPartyManagement: false,
  surroundingCondition: "敷地内のみ飛行。柵あり。",
  hasLandingArea: true,
  needsAssistant: true,
  safetyNotes: "送電線が近接するエリアあり。",
  pricing: {
    baseAmount: 120000,
    travelFee: 25000,
    optionAmount: 20000,
    discount: 5000,
    taxRate: 0.1,
    note: "2日分の作業料金を含む。",
  },
  createdAt: past,
  updatedAt: now,
};

/** ダミー案件の配列（ストアシード用） */
export const mockCases: Case[] = [mockCase1, mockCase2];
