"use client";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";

type PaymentDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmitPayment: (screenshot: File) => void;
  submitting?: boolean;
  error?: string | null;
  amount: number;
  upiId: string;
};

function PaymentDialog({
  open,
  onClose,
  onSubmitPayment,
  submitting,
  error,
  amount,
  upiId,
}: PaymentDialogProps) {
  const [screenshot, setScreenshot] = useState<File>();
  const [screenshotError, setScreenshotError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Clear the form whenever the dialog closes, however it closes — cancel,
  // backdrop click, or the parent moving on after a successful submit —
  // so reopening it never shows a stale screenshot.
  useEffect(() => {
    if (!open) {
      setScreenshot(undefined);
      setScreenshotError(false);
      setCopied(false);
    }
  }, [open]);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access can fail (older browsers, permissions) — non-critical
    }
  };

  const handleSubmit = () => {
    if (!screenshot) {
      setScreenshotError(true);
      return;
    }
    onSubmitPayment(screenshot);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <div className="bg-white px-6 py-8">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold text-neutral-900">Complete Payment</h2>
          <CloseIcon
            onClick={onClose}
            style={{ color: "#9CA3AF", cursor: "pointer" }}
          />
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          We only accept online payments. Please pay the amount below to the UPI
          ID and upload a screenshot of your payment.
        </p>

        <div className="mt-6 flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-3">
          <span className="text-sm font-medium text-neutral-600">Amount to Pay</span>
          <span className="text-lg font-bold text-neutral-900">₹{amount}</span>
        </div>

        <div className="mt-4">
          <span className="text-sm font-semibold text-neutral-800">Pay to UPI ID</span>
          <div className="mt-2 flex items-center justify-between rounded-lg border border-[#0E7C4A] bg-emerald-50 px-4 py-3">
            <span className="text-base font-bold text-neutral-900">{upiId}</span>
            <button
              onClick={handleCopyUpi}
              className="flex items-center gap-1 text-xs font-semibold text-[#0E7C4A]"
            >
              <ContentCopyIcon style={{ fontSize: 14 }} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="mt-5">
          <span className="text-sm font-semibold text-neutral-800">
            Upload Payment Screenshot
          </span>
          <div className="mt-2">
            <FileUploadSection
              fileObject={screenshot}
              setFunction={(file) => {
                setScreenshot(file);
                setScreenshotError(false);
              }}
            />
          </div>
          {screenshotError && (
            <p className="mt-2 text-xs font-medium text-red-500">
              Please upload a screenshot of your payment
            </p>
          )}
        </div>

        {error && (
          <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 w-full rounded-xl bg-[#0E7C4A] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0A5C38] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <CircularProgress color="inherit" size={22} /> : "Submit Payment"}
        </button>
      </div>
    </Dialog>
  );
}

export default PaymentDialog;
