/**
 * BudgetModal — wraps BudgetForm in a shadcn Dialog.
 * Handles open/close and passes edit state down to BudgetForm.
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BudgetWithSpending } from "../../types";
import { BudgetForm } from "./BudgetForm";

interface BudgetModalProps {
  open: boolean;
  onClose: () => void;
  editBudget?: BudgetWithSpending;
}

export function BudgetModal({ open, onClose, editBudget }: BudgetModalProps) {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md" data-ocid="budget.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {editBudget ? "Edit Budget" : "Set New Budget"}
          </DialogTitle>
        </DialogHeader>

        <BudgetForm
          editBudget={editBudget}
          onSuccess={handleSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
