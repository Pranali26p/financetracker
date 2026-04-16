/**
 * TransactionModal — wraps TransactionForm in a Dialog.
 * Handles create and edit modes. Resets state on close.
 */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "../../hooks/useTransactions";
import type { CreateTransactionInput, Transaction } from "../../types";
import { TransactionForm } from "./TransactionForm";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  /** When provided, the form is pre-filled for editing. */
  editTx?: Transaction;
}

export function TransactionModal({
  open,
  onClose,
  editTx,
}: TransactionModalProps) {
  const create = useCreateTransaction();
  const update = useUpdateTransaction();

  const isPending = create.isPending || update.isPending;

  const handleSubmit = async (input: CreateTransactionInput) => {
    if (editTx) {
      await update.mutateAsync({ ...input, id: editTx.id });
    } else {
      await create.mutateAsync(input);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent
        className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto"
        data-ocid="transaction.dialog"
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="font-display text-lg font-semibold">
            {editTx ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
        </DialogHeader>

        <TransactionForm
          editTx={editTx}
          isPending={isPending}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
