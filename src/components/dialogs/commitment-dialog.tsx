import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ListTodo, Plus } from "lucide-react"
import { MainCard } from "../cards/main-card"
import { useId, useState } from "react"
import { CommitmentForm, type CommitmentFormValues } from "../forms/commitment-form"
import { Spinner } from "../ui/spinner"

export function CommitmentDialog() {
  const formId = useId();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: CommitmentFormValues) => {
    // TODO: Implement actual submission logic
    console.log("Submitting commitment:", values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleSuccess = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Plus className="size-4" />
          Add Commitment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <MainCard.Icon>
              <ListTodo className="size-5 text-primary" />
            </MainCard.Icon>
            <div className="flex flex-col gap-1">
              <MainCard.Title>Add Commitment</MainCard.Title>
              <MainCard.Description>
                Let's define your next commitment
              </MainCard.Description>
            </div>
          </div>

        </DialogHeader>

        <div className="py-4">
          <CommitmentForm
            id={formId}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
            onSubmissionStateChange={setIsSubmitting}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form={formId}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
