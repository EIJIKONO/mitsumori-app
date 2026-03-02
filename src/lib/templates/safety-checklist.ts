/** 安全チェックリストの項目（固定） */
export const SAFETY_CHECK_ITEMS = [
  "気象確認（風速・降水・視程）",
  "機体点検（外観・プロペラ・カメラ）",
  "バッテリー確認（残量・破損・膨張）",
  "周辺第三者確認（立入禁止区域の設定）",
  "飛行経路確認（障害物・電線・建物）",
  "緊急時対応確認（リターントゥホーム・着陸手順）",
  "補助者配置確認（目視範囲・役割分担）",
  "法規制確認（航空法・DID・許可・承認の有無）",
] as const;

/** 安全チェックリストのプレーンテキスト（コピー用） */
export function buildSafetyChecklistText(): string {
  const header = [
    "　　　　　　　　　　　　　　　　　安　全　チ　ェ　ッ　ク　リ　ス　ト",
    "",
    "飛行前にお互いに確認し、チェックした上で作業を開始してください。",
    "",
  ].join("\n");

  const items = SAFETY_CHECK_ITEMS.map((item, i) => `□ ${i + 1}. ${item}`).join("\n");

  return `${header}${items}\n`;
}
