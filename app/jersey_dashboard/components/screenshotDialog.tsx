"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { RootState, AppDispatch } from "../../../lib/store";
import { updateOrderStatus, resetUpdateStatusError } from "../../../lib/slices/jerseyDashboard";
import { IJerseyOrderRow } from "../domain";

type ScreenshotDialogProps = {
  order: IJerseyOrderRow | null;
  onClose: () => void;
};

function ScreenshotDialog({ order, onClose }: ScreenshotDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { updatingStatus, updateStatusError } = useSelector(
    (state: RootState) => state.jerseyDashboard
  );

  useEffect(() => {
    if (!order) {
      dispatch(resetUpdateStatusError());
    }
  }, [order, dispatch]);

  const handleDecision = async (status: "verified" | "rejected") => {
    if (!order) return;
    const resultAction = await dispatch(updateOrderStatus({ orderId: order._id, status }));
    const succeeded =
      updateOrderStatus.fulfilled.match(resultAction) && resultAction.payload?.success;
    if (succeeded) {
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={!!order} maxWidth="sm" fullWidth>
      {order && (
        <div className="bg-white px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Payment Screenshot</h2>
              <p className="mt-1 text-sm text-neutral-500">
                {order.name} &middot; {order.phone} &middot; ₹{order.total}
              </p>
            </div>
            <CloseIcon
              onClick={onClose}
              style={{ color: "#9CA3AF", cursor: "pointer" }}
            />
          </div>

          <div className="mt-5 flex items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={order.paymentScreenshotUrl}
              alt={`Payment screenshot from ${order.name}`}
              className="max-h-[60vh] w-full object-contain"
            />
          </div>

          {updateStatusError && (
            <p className="mt-3 text-sm font-medium text-red-500">{updateStatusError}</p>
          )}

          {order.status === "pending_verification" ? (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleDecision("rejected")}
                disabled={updatingStatus}
                className="w-full rounded-xl border border-red-300 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingStatus ? <CircularProgress size={18} /> : "Reject"}
              </button>
              <button
                onClick={() => handleDecision("verified")}
                disabled={updatingStatus}
                className="w-full rounded-xl bg-[#0E7C4A] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0A5C38] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updatingStatus ? <CircularProgress color="inherit" size={18} /> : "Approve"}
              </button>
            </div>
          ) : (
            <p
              className={`mt-6 rounded-xl px-4 py-3 text-center text-sm font-semibold ${
                order.status === "verified"
                  ? "bg-emerald-50 text-[#0E7C4A]"
                  : "bg-red-50 text-red-600"
              }`}
            >
              This order has already been {order.status === "verified" ? "approved" : "rejected"}.
            </p>
          )}
        </div>
      )}
    </Dialog>
  );
}

export default ScreenshotDialog;
