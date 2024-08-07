import { AxiosWithAuth, Axios, AxiosWithAuthFromData } from "../../lib/axios";
import {
  createGameReqBody,
  updateGameReqBody,
  IUpdateTeamReqObj,
  IadduserToGameReqBody,
  updatePlayerStatusReqBody,
} from "./domain";

async function createaGame(data: createGameReqBody) {
  try {
    let response: any = await AxiosWithAuth.post("game/create", data);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Game creation is successfull",
        userdata: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to create the game"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to create the game");
    }
  }
}
async function addPlayersInGame(data: IadduserToGameReqBody) {
  try {
    let response: any = await AxiosWithAuth.post("game/registerInGroup", data);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Registration is successfull",
        userdata: response.data.data,
      };
    } else {
      return {
        success: false,
        message: `${
          response.data.data.message
            ? response.data.data.message
            : "Failed to register"
        }`,
      };
    }
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to register");
    }
  }
}
async function getActiveMatches() {
  let response: any = await Axios.get("game/activematch");

  if (response.data && response.data.success) {
    return {
      success: true,
      matches: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch the matches"
    }`,
  };
}

async function getMatchDetails(gameId: string) {
  let response: any = await Axios.get(`game/details/${gameId}`);

  if (response.data && response.data.success) {
    return {
      success: true,
      details: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch match details"
    }`,
  };
}
async function getMatchPermissions(gameId: string) {
  try {
    let response: any = await AxiosWithAuth.get(
      `game/getPermissionMatrix/${gameId}`
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        permissionMatrix: response.data.data,
      };
    }
    return {
      success: false,
      message: `${
        response.data.message
          ? response.data.message
          : "Failed to fetch permission matrix"
      }`,
    };
  } catch (error) {
    throw new Error("Failed to fetch permission matrix");
  }
}

async function registerIngame(data: FormData) {
  try {
    let response: any = await AxiosWithAuthFromData.post("game/register", data);

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Registration is Successful",
        userdata: response.data.data,
      };
    }
    return {
      success: false,
      message: `${
        response.data.message ? response.data.message : "Failed to register"
      }`,
    };
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to register");
    }
  }
}
async function uploadPaymentSnapAfterAddedByAdmin(data: FormData) {
  try {
    let response: any = await AxiosWithAuthFromData.post(
      "game/updatepaymentsforAddedPlayers",
      data
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: "Upload is Successful",
        userdata: response.data.data,
      };
    }
    return {
      success: false,
      message: `${
        response.data.message ? response.data.message : "Failed to upload"
      }`,
    };
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to upload");
    }
  }
}
async function updateGame(data: updateGameReqBody) {
  let response: any = await AxiosWithAuth.post("game/updateGame", data);

  if (response.data && response.data.success) {
    return {
      success: true,
      message: "Update is successfull",
      userdata: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message ? response.data.message : "Failed to Update"
    }`,
  };
}

async function updatePlayerStatus(data: updatePlayerStatusReqBody) {
  let response: any = await AxiosWithAuth.post(
    "game/updatePlayerInGameStatus",
    data
  );
  let message = "";
  switch (data.status) {
    case "Approved":
      message = "Successfully Approved";
      break;
    case "Rejected":
      message = "Rejected Successfully";
      break;
    case "Withdrawn":
      message = "Withdrawn Successfully";
      break;
    case "Removed":
      message = "Removed Successfully";
      break;
    default:
      message = "Updated Successfully";
  }
  if (response.data && response.data.success) {
    return {
      success: true,
      message: message,
      userdata: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message ? response.data.message : "Failed to Update"
    }`,
  };
}

async function getVenueList() {
  let response: any = await Axios.get("venue/venueList");

  if (response.data && response.data.success) {
    return {
      success: true,
      message: response.data.message,
      venueList: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch venue List"
    }`,
  };
}
async function updateTeamsofPlayers(data: IUpdateTeamReqObj) {
  let response: any = await AxiosWithAuth.post("game/updateTeamDetails", data);

  if (response.data && response.data.success) {
    return {
      success: true,
      message: "Update is successfull",
      userdata: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message ? response.data.message : "Failed to Update"
    }`,
  };
}

async function downloadExcelofPlayers(gameid: string) {
  try {
    let response: any = await AxiosWithAuth.get(
      `game/exportregistrationdetails/${gameid}`,
      {
        responseType: "blob", // Specify responseType as 'blob' to receive binary data
      }
    );

    if (!response.data) {
      return {
        success: false,
        message: `Failed`,
      };
    }
    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "players_data.xlsx");
    document.body.appendChild(link);
    link.click();
    return {
      success: true,
      message: `Success`,
    };
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed");
    }
  }
}
async function geRabonaCupPlayers(data: any) {
  let response: any = await AxiosWithAuth.post(
    "game/getRabonacupteamPlayers",
    data
  );

  if (response.data && response.data.success) {
    return {
      success: true,
      players: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch the matches"
    }`,
  };
}
async function addRabonaCupPlayers(data: FormData) {
  let response: any = await AxiosWithAuthFromData.post(
    "game/addplayerstoRabons",
    data
  );

  if (response.data && response.data.success) {
    return {
      success: true,
      players: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to fetch the matches"
    }`,
  };
}
export {
  createaGame,
  updateTeamsofPlayers,
  getActiveMatches,
  getMatchDetails,
  registerIngame,
  updateGame,
  updatePlayerStatus,
  getVenueList,
  getMatchPermissions,
  addPlayersInGame,
  downloadExcelofPlayers,
  geRabonaCupPlayers,
  addRabonaCupPlayers,
  uploadPaymentSnapAfterAddedByAdmin,
};
