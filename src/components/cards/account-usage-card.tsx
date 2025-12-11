import { MainCard } from "@/components/cards/main-card";
import { Database, HardDrive } from "lucide-react";

interface UsageData {
  storage: { used: number; total: number; unit: string };
  requests: { used: number; total: number };
  projects: { count: number };
  lastActive: string;
}

interface AccountUsageCardProps {
  usageData: UsageData;
}

export function AccountUsageCard({ usageData }: AccountUsageCardProps) {
  return (
    <MainCard className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Database className="size-5" />
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Account Usage
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Storage Usage */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <HardDrive className="size-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">Storage</span>
              </div>
              <span>
                {usageData.storage.used} / {usageData.storage.total}{" "}
                {usageData.storage.unit}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${(usageData.storage.used / usageData.storage.total) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (usageData.storage.used / usageData.storage.total) *
                100
              ).toFixed(1)}
              % utilized
            </p>
          </div>

          {/* API Requests */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Database className="size-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">API Requests</span>
              </div>
              <span>
                {usageData.requests.used.toLocaleString()} /{" "}
                {usageData.requests.total.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${(usageData.requests.used / usageData.requests.total) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (usageData.requests.used / usageData.requests.total) *
                100
              ).toFixed(1)}
              % utilized
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Active Projects</p>
            <p className="text-lg font-semibold">{usageData.projects.count}</p>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <p className="text-xs text-muted-foreground">Last Active</p>
            <p className="text-sm">{usageData.lastActive}</p>
          </div>
        </div>
      </div>
    </MainCard>
  );
}
