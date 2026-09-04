"use client";

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import WFGLogo from "../../Common/logo";
import {
  SIZES,
  SIZE_CHART,
  FABRICS,
  COLORS,
  getJerseyImageSrc,
  type Size,
  type Fabric,
  type Color,
} from "../config";

function JerseyProduct() {
  const [color, setColor] = useState<Color>("black");
  const [fabric, setFabric] = useState<Fabric>("premium");
  const [size, setSize] = useState<Size | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const selectedFabric = FABRICS.find((f) => f.id === fabric)!;

  const handleSizeSelect = (s: Size) => {
    setSize(s);
    setSizeError(false);
  };

  const handleProceedToBuy = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    const colorLabel = COLORS.find((c) => c.id === color)?.label;
    const total = selectedFabric.price * quantity;
    Swal.fire({
      icon: "success",
      title: "Added to your order",
      html: `WFG Home Jersey 2026 &middot; ${colorLabel} &middot; ${selectedFabric.label} &middot; Size <b>${size}</b> &middot; Qty <b>${quantity}</b><br/>Total: <b>₹${total}</b>`,
      confirmButtonColor: "#0E7C4A",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:py-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-neutral-100 p-6">
            <span className="absolute left-5 top-5 rounded-full bg-[#F5B700] px-3 py-1 text-xs font-bold text-neutral-900">
              From ₹{Math.min(...FABRICS.map((f) => f.price))}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getJerseyImageSrc(color)}
              alt={`WFG Home Jersey 2026 - ${color}, front and back`}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Color selector */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-sm font-semibold text-neutral-800">Color</span>
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id)}
                aria-label={c.label}
                title={c.label}
                className={`h-8 w-8 rounded-full border-2 transition-shadow ${
                  color === c.id
                    ? "border-[#0E7C4A] shadow-[0_0_0_2px_rgba(14,124,74,0.25)]"
                    : "border-neutral-300"
                }`}
                style={{ backgroundColor: c.swatch }}
              />
            ))}
            <span className="text-sm text-neutral-500">
              {COLORS.find((c) => c.id === color)?.label}
            </span>
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[#0E7C4A]">
            Matchday Collection
          </p>
          <h1 className="mt-1 text-3xl font-bold text-neutral-900 sm:text-4xl">
            WFG Home Jersey 2026
          </h1>
          <p className="mt-2 text-neutral-500">
            Official Weekend Football Group yearly jersey 
          </p>

          {/* Fabric selector */}
          <div className="mt-5">
            <span className="text-sm font-semibold text-neutral-800">Fabric Type</span>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FABRICS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFabric(f.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    fabric === f.id
                      ? "border-[#0E7C4A] bg-emerald-50"
                      : "border-neutral-300 bg-white hover:border-neutral-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-800">{f.label}</span>
                    <span className="text-sm font-bold text-[#0E7C4A]">₹{f.price}</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">{f.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-neutral-900">₹{selectedFabric.price}</span>
          </div>

          {/* Size selector */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-800">
                Select Size {size && <span className="font-normal text-neutral-500">— {size}</span>}
              </span>
              <button
                onClick={() => setShowSizeChart((v) => !v)}
                className="text-xs font-medium text-[#0E7C4A] underline underline-offset-2"
              >
                {showSizeChart ? "Hide" : "View"} size chart
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSizeSelect(s)}
                  className={`flex h-11 min-w-[2.75rem] items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors ${
                    size === s
                      ? "border-[#0E7C4A] bg-[#0E7C4A] text-white"
                      : "border-neutral-300 bg-white text-neutral-700 hover:border-[#0E7C4A]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-xs font-medium text-red-500">
                Please select a size to continue
              </p>
            )}

            {showSizeChart && (
              <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-100 text-neutral-600">
                    <tr>
                      <th className="px-3 py-2 font-medium">Size</th>
                      <th className="px-3 py-2 font-medium">Chest</th>
                      <th className="px-3 py-2 font-medium">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZES.map((s) => (
                      <tr key={s} className="border-t border-neutral-200">
                        <td className="px-3 py-2 font-semibold text-neutral-800">{s}</td>
                        <td className="px-3 py-2 text-neutral-600">{SIZE_CHART[s].chest}</td>
                        <td className="px-3 py-2 text-neutral-600">{SIZE_CHART[s].length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <span className="text-sm font-semibold text-neutral-800">Quantity</span>
            <div className="mt-3 flex w-fit items-center rounded-lg border border-neutral-300 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-lg text-neutral-600 hover:text-neutral-900"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold text-neutral-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="flex h-11 w-11 items-center justify-center text-lg text-neutral-600 hover:text-neutral-900"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 flex items-center justify-between rounded-lg bg-neutral-100 px-4 py-3">
            <span className="text-sm font-medium text-neutral-600">Total</span>
            <span className="text-lg font-bold text-neutral-900">
              ₹{selectedFabric.price * quantity}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={handleProceedToBuy}
            className="mt-8 w-full rounded-xl bg-[#0E7C4A] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0A5C38]"
          >
            Proceed to Buy
          </button>
          <p className="mt-3 text-center text-xs text-neutral-400">
            Free delivery across Kolkata &middot; 7-day easy exchange
          </p>

          {/* Description */}
          <div className="mt-10 border-t border-neutral-200 pt-6">
            <h2 className="text-sm font-semibold text-neutral-800">Product Details</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>• 100% breathable polyester mesh, built for matchday intensity</li>
              <li>• Moisture-wicking fabric keeps you dry through 90 minutes</li>
              <li>• Embroidered WFG crest, printed name &amp; number on back</li>
              <li>• Regular fit &mdash; true to size, see size chart above</li>
              <li>• Machine wash cold, do not bleach</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default JerseyProduct;
