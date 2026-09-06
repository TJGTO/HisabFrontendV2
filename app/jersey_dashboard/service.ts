import { AxiosWithAuth as Axios } from "../../lib/axios";
import { IJerseyDashboardStats, IJerseyOrderRow } from "./domain";

async function getJerseyDashboard() {
  let response: any = await Axios.get("jerseyorder/dashboard");

  if (response.data && response.data.success && response.data.data) {
    return {
      success: true,
      stats: response.data.data as IJerseyDashboardStats,
    };
  }
  return {
    success: false,
    message: `${response.data?.message}`,
  };
}

async function updateJerseyOrderStatus(
  orderId: string,
  status: "verified" | "rejected"
) {
  let response: any = await Axios.patch(`jerseyorder/${orderId}/status`, { status });

  if (response.data && response.data.success) {
    return {
      success: true,
      order: response.data.data as IJerseyOrderRow,
    };
  }
  return {
    success: false,
    message: `${response.data?.message}`,
  };
}

export { getJerseyDashboard, updateJerseyOrderStatus };
