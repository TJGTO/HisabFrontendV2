"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadSection from "../../Common/FormComponents/fileUploadSection";
import { RootState, AppDispatch } from "../../../lib/store";
import {
  uploadPaymentScreenshot,
  resetUploadedScreenshot,
} from "../../../lib/slices/jerseyOrder";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB — matches backend limit

type PaymentDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmitPayment: (screenshotUrl: string, screenshotFileName: string) => void;
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
  const dispatch = useDispatch<AppDispatch>();
  const { uploading, uploadError, uploadedScreenshot } = useSelector(
    (state: RootState) => state.jerseyOrder
  );
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [sizeError, setSizeError] = useState<string | null>(null);

  // Clear the form whenever the dialog closes, however it closes — cancel,
  // backdrop click, or the parent moving on after a successful submit —
  // so reopening it never shows a stale screenshot.
  useEffect(() => {
    if (!open) {
      dispatch(resetUploadedScreenshot());
      setSelectedFile(undefined);
      setSizeError(null);
      setCopied(false);
    }
  }, [open, dispatch]);

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard access can fail (older browsers, permissions) — non-critical
    }
  };

  const handleFileSelected = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setSizeError("Image must be smaller than 5MB");
      setSelectedFile(undefined);
      return;
    }
    setSizeError(null);
    setSelectedFile(file);
    dispatch(uploadPaymentScreenshot(file));
  };

  const handleChangeImage = () => {
    setSelectedFile(undefined);
    setSizeError(null);
    dispatch(resetUploadedScreenshot());
  };

  const handleSubmit = () => {
    if (!uploadedScreenshot) return;
    onSubmitPayment(uploadedScreenshot.publicUrl, uploadedScreenshot.fileName);
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
            {uploadedScreenshot ? (
              <div className="flex items-center gap-3 rounded-xl border border-[#0E7C4A] bg-emerald-50 px-4 py-3">
                <CheckCircleIcon style={{ color: "#0E7C4A" }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#0E7C4A]">
                    Image has been successfully uploaded
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {uploadedScreenshot.fileName}
                  </p>
                </div>
                <button
                  onClick={handleChangeImage}
                  className="shrink-0 text-xs font-semibold text-[#0E7C4A] underline underline-offset-2"
                >
                  Change
                </button>
              </div>
            ) : uploading ? (
              <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <CircularProgress size={20} style={{ color: "#0E7C4A" }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-700">
                    Uploading image&hellip;
                  </p>
                  {selectedFile && (
                    <p className="truncate text-xs text-neutral-500">{selectedFile.name}</p>
                  )}
                </div>
              </div>
            ) : (
              <FileUploadSection fileObject={selectedFile} setFunction={handleFileSelected} />
            )}
          </div>

          {(sizeError || uploadError) && (
            <p className="mt-2 text-xs font-medium text-red-500">
              {sizeError || uploadError}
            </p>
          )}
        </div>

        {error && (
          <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!uploadedScreenshot || uploading || submitting}
          className="mt-6 w-full rounded-xl bg-[#0E7C4A] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0A5C38] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <CircularProgress color="inherit" size={22} /> : "Submit Payment"}
        </button>
      </div>
    </Dialog>
  );
}

export default PaymentDialog;
