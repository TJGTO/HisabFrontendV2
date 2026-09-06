export type IJerseyOrderRow = {
  _id: string;
  name: string;
  jerseyName: string;
  jerseyNumber: string;
  phone: string;
  referralCode?: string;
  referrer?: string;
  color: string;
  fabric: string;
  size: string;
  quantity: number;
  pickupLabel: string;
  total: number;
  paymentScreenshotUrl: string;
  paymentScreenshotFileName: string;
  status: string;
  createdAt: string;
};

export type IJerseyDashboardStats = {
  totalSold: number;
  premiumSold: number;
  standardSold: number;
  totalRevenue: number;
  totalOrders: number;
  orders: IJerseyOrderRow[];
};
