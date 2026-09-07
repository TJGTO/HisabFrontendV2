import * as yup from "yup";

export const jerseyOrderSchema = yup
  .object({
    name: yup.string().trim().required("Name is required"),
    jerseyName: yup
      .string()
      .trim()
      .max(12, "Jersey name should be within 12 characters"),
    jerseyNumber: yup
      .string()
      .trim()
      .matches(/^[0-9]{1,2}$/, {
        message: "Enter a valid jersey number (0-99)",
        excludeEmptyString: true,
      }),
    phone: yup
      .string()
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter a valid 10-digit phone number",
        excludeEmptyString: false,
      })
      .required("Phone number is required"),
    referralCode: yup.string().trim(),
  })
  .required();

export type IJerseyOrderFormData = {
  name: string;
  jerseyName?: string;
  jerseyNumber?: string;
  phone: string;
  referralCode?: string;
};

export type IJerseyOrderSummary = {
  design: string;
  color: string;
  fabric: string;
  size: string;
  quantity: number;
  productSubtotal: number;
  deliveryFee: number;
  total: number;
  pickupLabel: string;
};

export type IJerseyConfirmedOrder = {
  customer: IJerseyOrderFormData;
  summary: IJerseyOrderSummary;
  imageSrc: string;
  screenshotName: string;
  referrer?: string;
};

// Body sent to POST /jerseyorder/create — see
// WFG_KOL_BACKEND/API/JerseyOrder/validationSchema.js
export type IJerseyOrderPayload = {
  name: string;
  jerseyName?: string;
  jerseyNumber?: string;
  phone: string;
  referralCode?: string;
  referrer?: string;
  design: string;
  color: string;
  fabric: string;
  size: string;
  quantity: number;
  pickupLabel: string;
  total: number;
  paymentScreenshotUrl: string;
  paymentScreenshotFileName: string;
};

export type IJerseyUploadedScreenshot = {
  publicUrl: string;
  fileName: string;
};

export type IJerseyReferralCode = {
  code: string;
  referrer: string;
  playershare: number;
  groupshare: number;
};

export type IJerseyFabric = {
  id: string;
  label: string;
  price: number;
  description: string;
};

export type IJerseyDesign = {
  id: string;
  label: string;
  // {color} placeholder — see getJerseyImageSrc in jerseyProduct.tsx
  imagePathTemplate: string;
  // price depends on design, so each design carries its own fabric pricing
  fabrics: IJerseyFabric[];
};

// Shape of the "config" field on the jersey_buy_2026 document served by
// GET /config/jerseyconfig — see
// WFG_KOL_BACKEND/scripts/update_config_multi_design.mongodb.js
export type IJerseyRemoteConfig = {
  sizes: string[];
  sizeChart: Record<string, { chest: string; length: string }>;
  designs: IJerseyDesign[];
  colors: { id: string; label: string; swatch: string }[];
  pickupLocations: { id: string; name: string; mapUrl: string }[];
  homeDeliveryFee: number;
  upiId: string;
  orderTimeline: { label: string; range: string }[];
  referralCodes: IJerseyReferralCode[];
};
