import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { ArrowRight, Check } from "lucide-react";
import { useTRPC } from "@/integrations/trpc/react";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

interface WaitingListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitingListDialog({
  open,
  onOpenChange,
}: WaitingListDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const trpc = useTRPC();

  const addToWaitingList = useMutation(
    trpc.waitingList.add.mutationOptions({
      onSuccess: () => {
        setIsSubmitted(true);
        toast.success("Successfully added to waiting list!");
      },
      onError: (error) => {
        setError(error.message || "Failed to add email. Please try again.");
        toast.error("Failed to add email to waiting list");
      },
    })
  );

  const validateEmail = (emailValue: string) => {
    const result = emailSchema.safeParse({ email: emailValue });
    if (!result.success) {
      setError(result.error.issues[0]?.message || "Invalid email");
      return false;
    }
    setError(null);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (touched && newEmail) {
      validateEmail(newEmail);
    } else if (touched && !newEmail) {
      setError(null);
    }
  };

  const handleEmailBlur = () => {
    setTouched(true);
    if (email) {
      validateEmail(email);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (!email || !validateEmail(email) || addToWaitingList.isPending) {
      return;
    }

    try {
      await addToWaitingList.mutateAsync({ email });
    } catch (error) {
      // Error is handled by onError callback
    }
  };

  const handleClose = () => {
    if (!addToWaitingList.isPending) {
      onOpenChange(false);
      // Reset form after dialog closes
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
        setError(null);
        setTouched(false);
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">
                Join the waiting list
              </DialogTitle>
              <DialogDescription className="text-sm">
                Be among the first to experience Delivrr Work. We&apos;ll notify
                you when early access is available.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="waiting-list-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="waiting-list-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                  disabled={addToWaitingList.isPending}
                  aria-invalid={touched && error ? true : undefined}
                  className="h-10"
                />
                {touched && error && (
                  <FieldError errors={[{ message: error }]} />
                )}
              </div>
              <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Early access priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>No spam, unsubscribe anytime</span>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full gap-1.5"
                disabled={addToWaitingList.isPending || !email || !!error}
              >
                {addToWaitingList.isPending ? (
                  "Submitting..."
                ) : (
                  <>
                    Join waiting list
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <Check className="h-6 w-6 text-emerald-500" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl">
                You&apos;re on the list!
              </DialogTitle>
              <DialogDescription className="text-sm">
                We&apos;ve added{" "}
                <span className="font-medium text-foreground">{email}</span> to
                the waiting list. We&apos;ll send you an email when early access
                is available.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={handleClose}
              size="lg"
              className="w-full"
              variant="outline"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
