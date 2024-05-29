import { AxiosWithAuth, Axios, AxiosWithAuthFromData } from "../../lib/axios";
import {
  searchMembershipCardsBody,
  CreateMembershipReqBody,
  extendmembershipReq,
  fetchMenbershipCardsReqBody,
} from "./domain";

async function createMembershipRecords(data: CreateMembershipReqBody) {
  try {
    let response: any = await AxiosWithAuth.post(
      "membership/createmembershiprecord",
      data
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: `Membership Record is created`,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        data: `${
          response.data.data.message
            ? response.data.data.message
            : `Failed to create the membership record`
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to create the membership record");
    }
  }
}

async function getmembershipcards(data: fetchMenbershipCardsReqBody) {
  try {
    let response: any = await AxiosWithAuth.post(
      "membership/getmembershiprecords",
      data
    );
    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Successfully fetched",
        cards: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to fetch the articles"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch the articles");
    }
  }
}

async function extendMembership(data: extendmembershipReq) {
  try {
    let response: any = await AxiosWithAuth.post(
      "membership/extendmembership",
      data
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: `Membership Record is Extended`,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        data: `${
          response.data.data.message
            ? response.data.data.message
            : `Failed to extend the membership`
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to create the membership record");
    }
  }
}

async function removeMembership(cardId: string) {
  try {
    let response: any = await AxiosWithAuth.post(
      "membership/removemembership",
      {
        cardId,
      }
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: `Membership Record is Removed`,
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        data: `${
          response.data.data.message
            ? response.data.data.message
            : `Failed to remove the membership`
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to create the membership record");
    }
  }
}

async function searchmembershipcards(data: searchMembershipCardsBody) {
  try {
    let response: any = await AxiosWithAuth.post("membership/search", data);
    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Successfully fetched",
        cards: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to fetch the articles"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch the articles");
    }
  }
}
export {
  createMembershipRecords,
  getmembershipcards,
  extendMembership,
  removeMembership,
  searchmembershipcards,
};
