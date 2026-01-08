"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Props = {
  brandName: string;
  onDelete: () => void;
};

export default function DeleteBrandModal({ brandName, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const isConfirmed = confirmationText === brandName;

  const handleDelete = () => {
    if (!isConfirmed) return;
    onDelete();
    setOpen(false);
    setConfirmationText("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        setConfirmationText("");
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="sm:max-w-32"
          type="button"
          variant="destructive"
          onClick={() => {}}
        >
          حذف کامل برند
        </Button>
      </DialogTrigger>

      <DialogContent dir="rtl" className="sm:max-w-lg">
        <DialogHeader className="mt-4">
          <DialogTitle className="text-right">
            حذف کامل برند {brandName}
          </DialogTitle>
          <DialogDescription className="text-right">
            این عملیات غیرقابل بازگشت است. برای تایید، نام برند را وارد کنید.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Input
            placeholder={`برای تایید "${brandName}" را وارد کنید`}
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-6 flex justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            انصراف
          </Button>
          <Button
            variant="destructive"
            disabled={!isConfirmed}
            onClick={handleDelete}
          >
            حذف برای همیشه
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
