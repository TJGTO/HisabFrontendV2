import useAuth from "./customHooks/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { addressObj } from "../profile/domain";
import moment from "moment";

export const createAddressStringFromObj = (address: addressObj | undefined) => {
  if (address) {
    let result =
      address.address_line_1 +
      "," +
      (address.address_line_2 ? address.address_line_2 + "," : "") +
      address.city +
      "," +
      address.pincode +
      "," +
      address.state?.state_name;
    return result.toString();
  }
  return "";
};

export const createSortFromForAvator = (fullName: String) => {
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1] ? fullName.split(" ")[1] : " ";
  const result =
    firstName.toString().charAt(0).toUpperCase() +
    lastName.toString().charAt(0).toUpperCase();
  return result;
};
export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const fromatDate = (
  date: string | Date,
  formatOfDate: string = "DD/MM/YYYY"
) => {
  const momentDate = moment(date);
  return momentDate.format(formatOfDate);
};

export const getCurrentDate = (date?: string | Date, counter?: number) => {
  const today = date ? new Date(date) : new Date();
  if (counter && counter > 0) {
    today.setDate(today.getDate() + counter);
  }
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function copyToClipboard(text: string): boolean {
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    return false;
  }
}

export function hasStringContent(htmlContent: string) {
  const textContent = htmlContent.replace(/<[^>]*>/g, "");
  return /\S/.test(textContent);
}

export function checkUserHaveRequiredRole(requiredRoles: Array<string>) {
  let roles: Array<string> | null = null;
  let flag: boolean = false;
  const storedRoleString = localStorage.getItem("roles");
  if (storedRoleString) {
    roles = JSON.parse(storedRoleString);
    requiredRoles.forEach((x) => {
      if (roles?.includes(x)) {
        flag = true;
      }
    });
  }

  return flag;
}

type Func = (...args: any[]) => void;

export function debounce(func: Func, delay: number): Func {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const downloadExcelFile = (excelData: ArrayBuffer) => {
  const excelBlob = new Blob([excelData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(excelBlob);
  link.download = "players_data.xlsx";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
