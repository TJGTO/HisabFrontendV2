"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";
import { fetchJerseyDashboard } from "../../../lib/slices/jerseyDashboard";
import { fromatDate } from "../../Common/functions";
import useAuth from "../../Common/customHooks/useAuth";
import PageLoader from "../../Common/Loader/pageLoader";
import ScreenshotDialog from "./screenshotDialog";

const STATUS_STYLES: Record<string, string> = {
  pending_verification: "bg-amber-50 text-amber-700",
  verified: "bg-emerald-50 text-[#0E7C4A]",
  rejected: "bg-red-50 text-red-600",
};

function statusLabel(status: string) {
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function JerseyDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoggedIn] = useAuth();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.jerseyDashboard
  );

  // Same hydration-safety gate as the product page — see the comment there.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only known client-side (localStorage), so this can't run until mounted.
  // Redirect anyone without a token straight to login — the backend also
  // rejects these requests, this just avoids showing a bare error screen.
  useEffect(() => {
    if (mounted && isLoggedIn === false) {
      router.replace("/login");
    }
  }, [mounted, isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchJerseyDashboard());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrder = stats?.orders.find((o) => o._id === selectedOrderId) ?? null;

  if (!mounted || isLoggedIn !== true || loading) {
    return <PageLoader />;
  }

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 text-center">
        <p className="text-sm font-medium text-red-500">
          {error || "Couldn't load the dashboard right now."} Please refresh the page.
        </p>
      </div>
    );
  }

  const tiles = [
    { label: "Jerseys Sold", value: stats.totalSold },
    { label: "Premium Sold", value: stats.premiumSold },
    { label: "Standard Sold", value: stats.standardSold },
    { label: "Total Revenue", value: `₹${stats.totalRevenue}` },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          Jersey Sales Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {stats.totalOrders} order{stats.totalOrders === 1 ? "" : "s"} placed so far
        </p>

        {/* Stat tiles */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <p className="text-sm font-medium text-neutral-500">{tile.label}</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">{tile.value}</p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-base font-bold text-neutral-900">Order Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-neutral-100 text-neutral-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Jersey</th>
                  <th className="px-4 py-3 font-medium">Color</th>
                  <th className="px-4 py-3 font-medium">Fabric</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Qty</th>
                  <th className="px-4 py-3 font-medium">Pickup</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Screenshot</th>
                </tr>
              </thead>
              <tbody>
                {stats.orders.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-8 text-center text-neutral-400">
                      No orders yet
                    </td>
                  </tr>
                )}
                {stats.orders.map((order) => (
                  <tr key={order._id} className="border-t border-neutral-100">
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                      {fromatDate(order.createdAt, "DD MMM YYYY, hh:mm A")}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-neutral-900">{order.name}</p>
                      <p className="text-xs text-neutral-500">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-neutral-900">{order.jerseyName}</p>
                      <p className="text-xs text-neutral-500">#{order.jerseyNumber}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{order.color}</td>
                    <td className="px-4 py-3 text-neutral-600">{order.fabric}</td>
                    <td className="px-4 py-3 text-neutral-600">{order.size}</td>
                    <td className="px-4 py-3 text-neutral-600">{order.quantity}</td>
                    <td className="px-4 py-3 text-neutral-600">{order.pickupLabel}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">
                      ₹{order.total}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          STATUS_STYLES[order.status] || "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {statusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedOrderId(order._id)}
                        className="font-medium text-[#0E7C4A] underline underline-offset-2"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ScreenshotDialog order={selectedOrder} onClose={() => setSelectedOrderId(null)} />
    </div>
  );
}

export default JerseyDashboard;
