import type { Case } from "@/lib/types";

const STORAGE_KEY = "mitsumori-app-cases";

function isClient(): boolean {
  return typeof window !== "undefined";
}

function getStoredCases(): Case[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredCases(cases: Case[]): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  } catch {
    // quota exceeded etc.
  }
}

/** 全案件を取得 */
export function getCases(): Case[] {
  return getStoredCases();
}

/** ID で 1 件取得 */
export function getCaseById(id: string): Case | null {
  return getStoredCases().find((c) => c.id === id) ?? null;
}

/** 案件を保存（新規は追加、既存は更新） */
export function saveCase(caseData: Case): void {
  const cases = getStoredCases();
  const index = cases.findIndex((c) => c.id === caseData.id);
  const now = new Date().toISOString();
  const toSave: Case = {
    ...caseData,
    updatedAt: now,
    createdAt: caseData.createdAt ?? now,
  };
  if (index >= 0) {
    cases[index] = toSave;
  } else {
    cases.push(toSave);
  }
  setStoredCases(cases);
}

/** 案件を削除 */
export function deleteCase(id: string): void {
  setStoredCases(getStoredCases().filter((c) => c.id !== id));
}

/** 案件を複製（新 ID ・新規の createdAt/updatedAt で返す。保存は呼び出し側で行う） */
export function duplicateCase(source: Case): Case {
  const now = new Date().toISOString();
  return {
    ...JSON.parse(JSON.stringify(source)),
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
}

/** ストアを初期データで上書き（開発用・初回シード用） */
export function seedCases(cases: Case[]): void {
  if (!isClient()) return;
  setStoredCases(cases);
}

/** ストアが空のとき mock データでシードする。初回表示用に 1 回だけ呼ぶ想定 */
export function seedWithMockIfEmpty(mockCases: Case[]): void {
  if (!isClient() || getStoredCases().length > 0) return;
  setStoredCases(mockCases);
}
