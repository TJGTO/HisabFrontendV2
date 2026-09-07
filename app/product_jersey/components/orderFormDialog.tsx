"use client";

import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Errormessage from "../../Common/FormComponents/errormessage";
import Requiredsign from "../../Common/FormComponents/requiredsign";
import {
  jerseyOrderSchema,
  IJerseyOrderFormData,
  IJerseyOrderSummary,
  IJerseyReferralCode,
} from "../domain";

type OrderFormDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmitOrder: (data: IJerseyOrderFormData) => void;
  submitting?: boolean;
  summary: IJerseyOrderSummary;
  referralCodes: IJerseyReferralCode[];
};

const inputClass =
  "mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm text-neutral-900 focus:border-[#0E7C4A] focus:outline-none focus:ring-1 focus:ring-[#0E7C4A]";

function OrderFormDialog({
  open,
  onClose,
  onSubmitOrder,
  submitting,
  summary,
  referralCodes,
}: OrderFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IJerseyOrderFormData>({
    resolver: yupResolver(jerseyOrderSchema),
  });

  const enteredCode = watch("referralCode");
  const matchedReferral = enteredCode
    ? referralCodes.find(
        (r) => r.code.trim().toLowerCase() === enteredCode.trim().toLowerCase()
      )
    : undefined;
  // Referral discount applies to the jersey price only, never the delivery fee.
  const discountedSubtotal = matchedReferral
    ? Math.round(summary.productSubtotal * (1 - matchedReferral.playershare / 100))
    : summary.productSubtotal;
  const discountedTotal = discountedSubtotal + summary.deliveryFee;

  // Clear the form whenever the dialog closes, however it closes — cancel,
  // backdrop click, or the parent moving on after a successful submit —
  // so reopening it never shows stale values.
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = (data: IJerseyOrderFormData) => {
    onSubmitOrder(data);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <div className="bg-white px-6 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Your Details</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {summary.design} &middot; {summary.color} &middot; {summary.fabric} &middot;
              Size {summary.size} &middot; Qty {summary.quantity}
            </p>
            <p className="mt-1 text-sm text-neutral-500">Pickup: {summary.pickupLabel}</p>
          </div>
          <CloseIcon
            onClick={onClose}
            style={{ color: "#9CA3AF", cursor: "pointer" }}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-neutral-800">
              Name
              <Requiredsign />
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Your full name"
              className={inputClass}
            />
            {errors.name && <Errormessage message={errors.name.message} />}
          </div>

          <div>
            <label className="text-sm font-semibold text-neutral-800">
              Name on Jersey <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <input
              {...register("jerseyName")}
              type="text"
              placeholder="e.g. MESSI"
              className={inputClass}
            />
            {errors.jerseyName && <Errormessage message={errors.jerseyName.message} />}
          </div>

          <div>
            <label className="text-sm font-semibold text-neutral-800">
              Number on Jersey <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <input
              {...register("jerseyNumber")}
              type="text"
              inputMode="numeric"
              maxLength={2}
              placeholder="e.g. 10"
              className={inputClass}
            />
            {errors.jerseyNumber && <Errormessage message={errors.jerseyNumber.message} />}
          </div>

          <div>
            <label className="text-sm font-semibold text-neutral-800">
              Phone Number
              <Requiredsign />
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="10-digit mobile number"
              className={inputClass}
            />
            {errors.phone && <Errormessage message={errors.phone.message} />}
          </div>

          <div>
            <label className="text-sm font-semibold text-neutral-800">
              Referral Code <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <input
              {...register("referralCode")}
              type="text"
              placeholder="Have a referral code?"
              className={inputClass}
            />
            {matchedReferral && (
              <p className="mt-1 text-xs font-medium text-[#0E7C4A]">
                Referral applied &mdash; {matchedReferral.playershare}% off
              </p>
            )}
          </div>

          <div className="space-y-1.5 rounded-lg bg-neutral-100 px-4 py-3">
            <div className="flex items-center justify-between text-sm text-neutral-600">
              <span>Item subtotal</span>
              <span className={matchedReferral ? "text-neutral-400 line-through" : ""}>
                ₹{summary.productSubtotal}
              </span>
            </div>
            {matchedReferral && (
              <div className="flex items-center justify-between text-sm text-[#0E7C4A]">
                <span>Referral discount ({matchedReferral.playershare}%)</span>
                <span>-₹{summary.productSubtotal - discountedSubtotal}</span>
              </div>
            )}
            {summary.deliveryFee > 0 && (
              <div className="flex items-center justify-between text-sm text-neutral-600">
                <span>Home delivery</span>
                <span>₹{summary.deliveryFee}</span>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-neutral-200 pt-1.5">
              <span className="text-sm font-medium text-neutral-600">Total</span>
              <span className="text-lg font-bold text-neutral-900">₹{discountedTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-[#0E7C4A] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0A5C38] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <CircularProgress color="inherit" size={22} />
            ) : (
              "Confirm and proceed to payment"
            )}
          </button>
        </form>
      </div>
    </Dialog>
  );
}

export default OrderFormDialog;
