"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";
import { fetchJerseyConfig } from "../../../lib/slices/jerseyConfig";
import { submitJerseyOrder, resetJerseyOrderError } from "../../../lib/slices/jerseyOrder";
import {
  IJerseyOrderFormData,
  IJerseyConfirmedOrder,
  IJerseyOrderPayload,
} from "../domain";
import OrderFormDialog from "./orderFormDialog";
import PaymentDialog from "./paymentDialog";
import OrderConfirmation from "./orderConfirmation";
import PageLoader from "../../Common/Loader/pageLoader";

const PINCODE_REGEX = /^[1-9][0-9]{5}$/;

function JerseyProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { config, loading, error } = useSelector(
    (state: RootState) => state.jerseyConfig
  );
  const { submitting: submittingPayment, error: paymentError } = useSelector(
    (state: RootState) => state.jerseyOrder
  );

  // Forces the very first client render to match the server-rendered HTML
  // exactly (always the loader), regardless of how fast the config fetch
  // resolves. Redux-driven content only appears after this flips to true in
  // an effect, which React guarantees runs strictly after hydration commits
  // — otherwise a fast-resolving fetch can race ahead of hydration and
  // cause a "server HTML didn't match" error.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!config) {
      dispatch(fetchJerseyConfig());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [color, setColor] = useState<string>("");
  const [fabric, setFabric] = useState<string>("");
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [pickupLocation, setPickupLocation] = useState<string | null>(null);
  const [pickupError, setPickupError] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const [customAddressError, setCustomAddressError] = useState(false);
  const [customPincode, setCustomPincode] = useState("");
  const [customPincodeError, setCustomPincodeError] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [orderFormData, setOrderFormData] = useState<IJerseyOrderFormData | null>(null);
  const [finalAmount, setFinalAmount] = useState<number | null>(null);
  const [matchedReferrer, setMatchedReferrer] = useState<string | undefined>(undefined);
  const [confirmedOrder, setConfirmedOrder] = useState<IJerseyConfirmedOrder | null>(null);

  // seed the color/fabric pickers with the first option once config arrives
  useEffect(() => {
    if (config) {
      if (!color) setColor(config.colors[0]?.id ?? "");
      if (!fabric) setFabric(config.fabrics[0]?.id ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  if (!mounted || loading) {
    return <PageLoader />;
  }

  if (!config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 text-center">
        <p className="text-sm font-medium text-red-500">
          {error || "Couldn't load this product right now."} Please refresh the page.
        </p>
      </div>
    );
  }

  const getJerseyImageSrc = (c: string) =>
    config.imagePathTemplate.replace("{color}", c);

  const selectedFabric = config.fabrics.find((f) => f.id === fabric) ?? config.fabrics[0];
  const selectedColor = config.colors.find((c) => c.id === color) ?? config.colors[0];
  const isHomeDelivery = pickupLocation === "home-delivery";
  const deliveryFee = isHomeDelivery ? config.homeDeliveryFee : 0;
  const productSubtotal = selectedFabric.price * quantity;
  const total = productSubtotal + deliveryFee;
  const pickupLabel = isHomeDelivery
    ? `Home Delivery — ${customAddress}${customPincode ? `, ${customPincode}` : ""}`
    : config.pickupLocations.find((l) => l.id === pickupLocation)?.name ?? "";

  const handleSizeSelect = (s: string) => {
    setSize(s);
    setSizeError(false);
  };

  const handlePickupSelect = (id: string) => {
    setPickupLocation(id);
    setPickupError(false);
  };

  const handleProceedToBuy = () => {
    let hasError = false;
    if (!size) {
      setSizeError(true);
      hasError = true;
    }
    if (!pickupLocation) {
      setPickupError(true);
      hasError = true;
    } else if (pickupLocation === "home-delivery") {
      if (!customAddress.trim()) {
        setCustomAddressError(true);
        hasError = true;
      }
      if (!PINCODE_REGEX.test(customPincode)) {
        setCustomPincodeError(true);
        hasError = true;
      }
    }
    if (hasError) return;
    setIsOrderDialogOpen(true);
  };

  const handleOrderSubmit = (data: IJerseyOrderFormData) => {
    setSubmittingOrder(true);
    // No order-placement API is wired up yet; this simulates a brief save
    // before moving on to payment, so the flow can be demoed end-to-end.
    setTimeout(() => {
      const matchedReferral = data.referralCode
        ? config.referralCodes.find(
            (r) =>
              r.code.trim().toLowerCase() === data.referralCode!.trim().toLowerCase()
          )
        : undefined;
      // Referral discount applies to the jersey price only, never the delivery fee.
      const discountedSubtotal = matchedReferral
        ? Math.round(productSubtotal * (1 - matchedReferral.playershare / 100))
        : productSubtotal;
      const amount = discountedSubtotal + deliveryFee;

      setSubmittingOrder(false);
      setOrderFormData(data);
      setMatchedReferrer(matchedReferral?.referrer);
      setFinalAmount(amount);
      setIsOrderDialogOpen(false);
      dispatch(resetJerseyOrderError());
      setIsPaymentDialogOpen(true);
    }, 500);
  };

  const handlePaymentSubmit = async (screenshotUrl: string, screenshotFileName: string) => {
    if (!orderFormData || finalAmount === null) return;

    const payload: IJerseyOrderPayload = {
      name: orderFormData.name,
      jerseyName: orderFormData.jerseyName,
      jerseyNumber: orderFormData.jerseyNumber,
      phone: orderFormData.phone,
      referralCode: orderFormData.referralCode,
      referrer: matchedReferrer,
      color: selectedColor.label,
      fabric: selectedFabric.label,
      size: size ?? "",
      quantity,
      pickupLabel,
      total: finalAmount,
      paymentScreenshotUrl: screenshotUrl,
      paymentScreenshotFileName: screenshotFileName,
    };

    const resultAction = await dispatch(submitJerseyOrder(payload));
    const saved =
      submitJerseyOrder.fulfilled.match(resultAction) &&
      resultAction.payload?.success;

    if (!saved) return; // error is surfaced via the slice's error state

    setIsPaymentDialogOpen(false);
    setConfirmedOrder({
      customer: orderFormData,
      summary: {
        color: selectedColor.label,
        fabric: selectedFabric.label,
        size: size ?? "",
        quantity,
        productSubtotal,
        deliveryFee,
        total: finalAmount,
        pickupLabel,
      },
      imageSrc: getJerseyImageSrc(color),
      screenshotName: screenshotFileName,
      referrer: matchedReferrer,
    });
  };

  const handlePlaceAnother = () => {
    setColor(config.colors[0]?.id ?? "");
    setFabric(config.fabrics[0]?.id ?? "");
    setSize(null);
    setQuantity(1);
    setPickupLocation(null);
    setCustomAddress("");
    setCustomPincode("");
    setOrderFormData(null);
    setFinalAmount(null);
    setMatchedReferrer(undefined);
    setConfirmedOrder(null);
  };

  if (confirmedOrder) {
    return (
      <OrderConfirmation
        order={confirmedOrder}
        timeline={config.orderTimeline}
        onPlaceAnother={handlePlaceAnother}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:py-16">
        {/* Gallery */}
        <div className="lg:sticky lg:top-10 lg:self-start">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-neutral-100 p-6">
            <span className="absolute left-5 top-5 rounded-full bg-[#F5B700] px-3 py-1 text-xs font-bold text-neutral-900">
              From ₹{Math.min(...config.fabrics.map((f) => f.price))}
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
            {config.colors.map((c) => (
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
            <span className="text-sm text-neutral-500">{selectedColor.label}</span>
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
              {config.fabrics.map((f) => (
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
              {config.sizes.map((s) => (
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

            <p className="mt-3 rounded-lg bg-red-50 px-3 py-3 text-base font-semibold text-red-700">
              <span className="font-bold">Tip:</span> These jerseys are
              dry-fit with a snug, athletic cut &mdash; we recommend sizing up
              by one size for a more comfortable fit.
            </p>

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
                    {config.sizes.map((s) => (
                      <tr key={s} className="border-t border-neutral-200">
                        <td className="px-3 py-2 font-semibold text-neutral-800">{s}</td>
                        <td className="px-3 py-2 text-neutral-600">
                          {config.sizeChart[s]?.chest}
                        </td>
                        <td className="px-3 py-2 text-neutral-600">
                          {config.sizeChart[s]?.length}
                        </td>
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
          <div className="mt-6 rounded-lg bg-neutral-100 px-4 py-3">
            {isHomeDelivery && (
              <div className="mb-2 flex items-center justify-between border-b border-neutral-200 pb-2 text-sm text-neutral-600">
                <span>Home delivery charge</span>
                <span>₹{config.homeDeliveryFee}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600">Total</span>
              <span className="text-lg font-bold text-neutral-900">₹{total}</span>
            </div>
          </div>

          {/* Pickup location */}
          <div className="mt-6">
            <span className="text-sm font-semibold text-neutral-800">Choose Pickup Location</span>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {config.pickupLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handlePickupSelect(loc.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    pickupLocation === loc.id
                      ? "border-[#0E7C4A] bg-emerald-50"
                      : "border-neutral-300 bg-white hover:border-neutral-400"
                  }`}
                >
                  <span className="block text-sm font-semibold text-neutral-800">
                    {loc.name}
                  </span>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 inline-block text-xs font-medium text-[#0E7C4A] underline underline-offset-2"
                  >
                    View on map
                  </a>
                </button>
              ))}
              <button
                onClick={() => handlePickupSelect("home-delivery")}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  pickupLocation === "home-delivery"
                    ? "border-[#0E7C4A] bg-emerald-50"
                    : "border-neutral-300 bg-white hover:border-neutral-400"
                }`}
              >
                <span className="block text-sm font-semibold text-neutral-800">
                  Home Delivery
                </span>
                <span className="mt-1 block text-xs text-neutral-500">
                  Delivered to your address &middot; +₹{config.homeDeliveryFee}
                </span>
              </button>
            </div>

            {pickupLocation === "home-delivery" && (
              <div className="mt-3 space-y-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                <p className="text-xs font-medium text-[#0E7C4A]">
                  Home delivery charge: ₹{config.homeDeliveryFee}
                </p>
                <div>
                  <label className="text-xs font-medium text-neutral-600">Address</label>
                  <textarea
                    value={customAddress}
                    onChange={(e) => {
                      setCustomAddress(e.target.value);
                      setCustomAddressError(false);
                    }}
                    rows={2}
                    placeholder="House no, street, locality"
                    className="mt-1 block w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-[#0E7C4A] focus:outline-none focus:ring-1 focus:ring-[#0E7C4A]"
                  />
                  {customAddressError && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      Please enter your address
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-neutral-600">Pincode</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={customPincode}
                    onChange={(e) => {
                      setCustomPincode(e.target.value.replace(/\D/g, ""));
                      setCustomPincodeError(false);
                    }}
                    placeholder="6-digit pincode"
                    className="mt-1 block w-full max-w-[160px] rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-[#0E7C4A] focus:outline-none focus:ring-1 focus:ring-[#0E7C4A]"
                  />
                  {customPincodeError && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      Please enter a valid 6-digit pincode
                    </p>
                  )}
                </div>
              </div>
            )}

            {pickupError && (
              <p className="mt-2 text-xs font-medium text-red-500">
                Please select a pickup location
              </p>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleProceedToBuy}
            className="mt-8 w-full rounded-xl bg-[#0E7C4A] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#0A5C38]"
          >
            Proceed to Buy
          </button>
          <p className="mt-3 text-center text-xs text-neutral-400">
            Pickup only &middot; 7-day easy exchange
          </p>

          {/* Description */}
          <div className="mt-10 border-t border-neutral-200 pt-6">
            <h2 className="text-sm font-semibold text-neutral-800">Product Details</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>• 100% breathable polyester mesh, built for matchday intensity</li>
              <li>• Moisture-wicking fabric keeps you dry through 90 minutes</li>
              <li>• Embroidered WFG crest, printed name &amp; number on back</li>
            </ul>
          </div>
        </div>
      </main>

      <OrderFormDialog
        open={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
        onSubmitOrder={handleOrderSubmit}
        submitting={submittingOrder}
        referralCodes={config.referralCodes}
        summary={{
          color: selectedColor.label,
          fabric: selectedFabric.label,
          size: size ?? "",
          quantity,
          productSubtotal,
          deliveryFee,
          total,
          pickupLabel,
        }}
      />

      <PaymentDialog
        open={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        onSubmitPayment={handlePaymentSubmit}
        submitting={submittingPayment}
        error={paymentError}
        amount={finalAmount ?? total}
        upiId={config.upiId}
      />
    </div>
  );
}

export default JerseyProduct;
