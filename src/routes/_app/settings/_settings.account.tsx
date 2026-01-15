import { MainCard } from "@/components/cards/main-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Database, HardDrive, AlertTriangle, Trash2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/integrations/better-auth/auth-client";
import { getInitials } from "@/lib/utils";
import { useState } from "react";

const baseUrl = "https://delivrr.work";

export const Route = createFileRoute("/_app/settings/_settings/account")({
  head: () => ({
    meta: [
      {
        title: "Account Settings | delivrr.work",
      },
      {
        name: "description",
        content:
          "Manage your account information, profile details, and usage statistics.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: `${baseUrl}/settings/account`,
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSession();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Fake usage data
  const usageData = {
    storage: { used: 2.4, total: 10, unit: "GB" },
    requests: { used: 12450, total: 50000 },
    projects: { count: 8 },
    lastActive: "2 hours ago",
  };

  const handleDelete = () => {
    if (confirmText.toLowerCase() === "delete") {
      // Handle account deletion here
      setDeleteDialogOpen(false);
      setConfirmText("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* User Info */}
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <User className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Account Information</MainCard.Title>
              <MainCard.Description>
                Your profile details and account information
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content>
          <Avatar className="size-15 shrink-0">
            <AvatarImage
              src={data?.user.image || undefined}
              alt={data?.user.name || ""}
              sizes="30px"
            />
            <AvatarFallback className="text-lg">
              {getInitials(data?.user.name || "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-base font-medium">{data?.user.name || "—"}</p>
            <p className="text-sm text-muted-foreground">
              {data?.user.email || "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Member since{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </MainCard.Content>
      </MainCard.Root>

      {/* Account Usage */}
      <MainCard.Root className="p-6 flex flex-col gap-4">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <Database className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Account Usage</MainCard.Title>
              <MainCard.Description>
                Your current usage and limits
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content className="flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
                    width: `${
                      (usageData.storage.used / usageData.storage.total) * 100
                    }%`,
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
                    width: `${
                      (usageData.requests.used / usageData.requests.total) * 100
                    }%`,
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

          <Separator className="my-2" />

          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">Active Projects</p>
              <p className="text-lg font-semibold">
                {usageData.projects.count}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <p className="text-xs text-muted-foreground">Last Active</p>
              <p className="text-sm">{usageData.lastActive}</p>
            </div>
          </div>
        </MainCard.Content>
      </MainCard.Root>

      {/* Danger Zone */}
      <MainCard.Root className="p-6 flex flex-col gap-4 border-destructive/20">
        <MainCard.Header>
          <div className="flex items-center gap-3">
            <MainCard.Icon className="bg-destructive/10 border-destructive/20">
              <AlertTriangle className="size-5 text-destructive" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title className="text-destructive">
                Danger Zone
              </MainCard.Title>
              <MainCard.Description>
                Irreversible and destructive actions
              </MainCard.Description>
            </div>
          </div>
        </MainCard.Header>

        <MainCard.Content className="flex-col">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm text-foreground">Delete Account</p>
            <p className="text-xs text-muted-foreground">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
        </MainCard.Content>

        <MainCard.Footer>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-fit">
                <Trash2 className="size-4" />
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-destructive" />
                  Delete Account
                </DialogTitle>
                <DialogDescription className="text-sm">
                  This will permanently delete your account and all associated
                  data. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  Type{" "}
                  <span className="font-semibold text-foreground">delete</span>{" "}
                  to confirm:
                </p>
                <Input
                  type="text"
                  placeholder="delete"
                  className="w-full"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={confirmText.toLowerCase() !== "delete"}
                >
                  <Trash2 className="size-4" />
                  Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </MainCard.Footer>
      </MainCard.Root>
    </div>
  );
}
