import { MainCard } from "@/components/cards/main-card";
import { Button } from "@/components/ui/button";
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
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

export function DangerZoneCard() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = () => {
    if (confirmText.toLowerCase() === "delete") {
      // Handle account deletion here
      setDeleteDialogOpen(false);
      setConfirmText("");
    }
  };

  return (
    <MainCard className="p-6 border-destructive/20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-destructive" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-destructive">
            Danger Zone
          </h3>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-foreground">Delete Account</p>
            <p className="text-xs text-muted-foreground">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>

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
        </div>
      </div>
    </MainCard>
  );
}
