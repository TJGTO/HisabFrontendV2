export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const;
export type Size = (typeof SIZES)[number];

export const SIZE_CHART: Record<Size, { chest: string; length: string }> = {
  XS: { chest: '34"', length: '25"' },
  S: { chest: '36"', length: '26"' },
  M: { chest: '38"', length: '27"' },
  L: { chest: '40"', length: '28"' },
  XL: { chest: '42"', length: '29"' },
  XXL: { chest: '44"', length: '30"' },
  XXXL: { chest: '46"', length: '31"' },
};

export const FABRICS = [
  {
    id: "premium",
    label: "Premium",
    price: 499,
    description: "Lightweight, sweat-wicking performance fabric",
  },
  {
    id: "standard",
    label: "Standard",
    price: 349,
    description: "Durable, breathable everyday matchday fabric",
  },
] as const;
export type Fabric = (typeof FABRICS)[number]["id"];

export const COLORS = [
  { id: "black", label: "Black", swatch: "#111111" },
  { id: "white", label: "White", swatch: "#FFFFFF" },
] as const;
export type Color = (typeof COLORS)[number]["id"];

export const getJerseyImageSrc = (color: Color) => `/assets/jersey/${color}.png`;
