"use client";

import type { Case } from "@/lib/types";
import { BUSINESS_TYPE_OPTIONS } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectSectionProps {
  caseData: Case;
  onChange: (caseData: Case) => void;
}

export function ProjectSection({ caseData, onChange }: ProjectSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">案件情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteName">現場名（必須）</Label>
          <Input
            id="siteName"
            value={caseData.siteName ?? ""}
            onChange={(e) =>
              onChange({ ...caseData, siteName: e.target.value })
            }
            placeholder="○○町 Ａ様邸"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="siteAddress">現場住所</Label>
          <Input
            id="siteAddress"
            value={caseData.siteAddress ?? ""}
            onChange={(e) =>
              onChange({ ...caseData, siteAddress: e.target.value })
            }
            placeholder="東京都○○区○○町 1-2-3"
          />
        </div>
        <div className="space-y-2">
          <Label>業務種別（必須）</Label>
          <Select
            value={caseData.businessType}
            onValueChange={(value) =>
              onChange({
                ...caseData,
                businessType: value as Case["businessType"],
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="scheduledDate">作業予定日</Label>
          <Input
            id="scheduledDate"
            type="date"
            value={caseData.scheduledDate ?? ""}
            onChange={(e) =>
              onChange({ ...caseData, scheduledDate: e.target.value || undefined })
            }
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="aircraft">使用機体</Label>
            <Input
              id="aircraft"
              value={caseData.aircraft ?? ""}
              onChange={(e) =>
                onChange({ ...caseData, aircraft: e.target.value || undefined })
              }
              placeholder="DJI Mini 3 Pro"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workerCount">作業人数</Label>
            <Input
              id="workerCount"
              type="number"
              min={1}
              value={caseData.workerCount ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                onChange({
                  ...caseData,
                  workerCount: v === "" ? undefined : parseInt(v, 10),
                });
              }}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="workDays">作業日数</Label>
          <Input
            id="workDays"
            type="number"
            min={0.5}
            step={0.5}
            value={caseData.workDays ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              onChange({
                ...caseData,
                workDays: v === "" ? undefined : parseFloat(v),
              });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="memo">備考</Label>
          <Textarea
            id="memo"
            value={caseData.memo ?? ""}
            onChange={(e) =>
              onChange({ ...caseData, memo: e.target.value || undefined })
            }
            placeholder="初回点検。雨の場合は順延。"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
}
