"use client";

import { IJerseyConfirmedOrder } from "../domain";

type OrderConfirmationProps = {
  order: IJerseyConfirmedOrder;
  timeline: { label: string; range: string }[];
  onPlaceAnother: () => void;
};

function OrderConfirmation({ order, timeline, onPlaceAnother }: OrderConfirmationProps) {
  const { customer, summary, imageSrc, screenshotName, referrer } = order;

  const details: { label: string; value: string }[] = [
    { label: "Name", value: customer.name },
    { label: "Phone Number", value: customer.phone },
    { label: "Color", value: summary.color },
    { label: "Fabric Type", value: summary.fabric },
    { label: "Size", value: summary.size },
    { label: "Quantity", value: String(summary.quantity) },
    { label: "Pickup", value: summary.pickupLabel },
    { label: "Payment Screenshot", value: screenshotName },
  ];
  if (customer.jerseyName) {
    details.push({ label: "Name on Jersey", value: customer.jerseyName });
  }
  if (customer.jerseyNumber) {
    details.push({ label: "Number on Jersey", value: customer.jerseyNumber });
  }
  if (customer.referralCode) {
    details.push({
      label: "Referral Code",
      value: referrer ? `${customer.referralCode} (${referrer})` : customer.referralCode,
    });
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-10 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Success header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0E7C4A]">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-neutral-500">
            Thanks {customer.name}, we&rsquo;ve received your payment screenshot and
            will verify it shortly.
          </p>
        </div>

        {/* Purchase details */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt="WFG Home Jersey 2026"
              className="h-20 w-20 rounded-xl border border-neutral-200 object-contain"
            />
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                WFG Home Jersey 2026
              </h2>
              <p className="text-sm text-neutral-500">Order Summary</p>
            </div>
          </div>

          <dl className="mt-5 divide-y divide-neutral-100 border-t border-neutral-100">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between py-2.5 text-sm"
              >
                <dt className="text-neutral-500">{d.label}</dt>
                <dd className="font-medium text-neutral-900">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-3">
            <span className="text-sm font-medium text-neutral-600">Total Paid</span>
            <span className="text-lg font-bold text-neutral-900">₹{summary.total}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-bold text-neutral-900">What Happens Next</h2>
          <div className="mt-5">
            {timeline.map((step, i) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                      i === 0 ? "bg-[#0E7C4A]" : "bg-neutral-300"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {i < timeline.length - 1 && (
                    <span className="my-1 w-px flex-1 bg-neutral-200" />
                  )}
                </div>
                <div className={i < timeline.length - 1 ? "pb-6" : ""}>
                  <p className="text-sm font-semibold text-neutral-800">{step.label}</p>
                  <p className="text-sm text-neutral-500">{step.range}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onPlaceAnother}
          className="mt-8 w-full rounded-xl border border-neutral-300 bg-white py-3.5 text-base font-semibold text-neutral-700 transition-colors hover:border-[#0E7C4A] hover:text-[#0E7C4A]"
        >
          Place Another Order
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
