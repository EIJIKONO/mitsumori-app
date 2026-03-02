"use client";

import type { Case } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FlightConditionSectionProps {
  caseData: Case;
  onChange: (caseData: Case) => void;
}

export function FlightConditionSection({
  caseData,
  onChange,
}: FlightConditionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">飛行・現場条件</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={caseData.isDID ?? false}
              onCheckedChange={(checked) =>
                onChange({ ...caseData, isDID: !!checked })
              }
            />
            <span className="text-sm">DID（人口集中地区）該当</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={caseData.isBVLOS ?? false}
              onCheckedChange={(checked) =>
                onChange({ ...caseData, isBVLOS: !!checked })
              }
            />
            <span className="text-sm">目視外飛行</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={caseData.isNightFlight ?? false}
              onCheckedChange={(checked) =>
                onChange({ ...caseData, isNightFlight: !!checked })
              }
            />
            <span className="text-sm">夜間飛行</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={caseData.isOverRoad ?? false}
              onCheckedChange={(checked) =>
                onChange({ ...caseData, isOverRoad: !!checked })
              }
            />
            <span className="text-sm">道路上空飛行</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={caseData.needsThirdPartyManagement ?? false}
              onCheckedChange={(checked) =>
                onChange({
                  ...caseData,
                  needsThirdPartyManagement: !!checked,
                })
              }
            />
            <span className="text-sm">第三者立入管理が必要</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={caseData.hasLandingArea ?? false}
              onCheckedChange={(checked) =>
                onChange({ ...caseData, hasLandingArea: !!checked })
              }
            />
            <span className="text-sm">離着陸場所確保済</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={caseData.needsAssistant ?? false}
              onCheckedChange={(checked) =>
                onChange({ ...caseData, needsAssistant: !!checked })
              }
            />
            <span className="text-sm">補助者が必要</span>
          </label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="surroundingCondition">周辺建物の状況</Label>
          <Textarea
            id="surroundingCondition"
            value={caseData.surroundingCondition ?? ""}
            onChange={(e) =>
              onChange({
                ...caseData,
                surroundingCondition: e.target.value || undefined,
              })
            }
            placeholder="周辺に民家あり。離着陸は庭を利用。"
            rows={2}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="safetyNotes">安全上の特記事項</Label>
          <Textarea
            id="safetyNotes"
            value={caseData.safetyNotes ?? ""}
            onChange={(e) =>
              onChange({
                ...caseData,
                safetyNotes: e.target.value || undefined,
              })
            }
            placeholder="電線に注意。風速5m/s以上は中止。"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
