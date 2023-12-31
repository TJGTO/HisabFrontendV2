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
  const lastName = fullName.split(" ")[1];
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
