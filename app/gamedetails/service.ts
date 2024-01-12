import { AxiosWithAuth, Axios, AxiosWithAuthFromData } from "../../lib/axios";
import { createGameReqBody } from "./domain";

async function createaGame(data: createGameReqBody) {
  let response: any = await AxiosWithAuth.post("game/create", data);

  if (response.data && response.data.success) {
    return {
      success: true,
      message: "Game creation is successfull",
      userdata: response.data.data,
    };
  }
  return {
    success: false,
    message: `${
      response.data.message
        ? response.data.message
        : "Failed to create the game"
    }`,
  };
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

async function registerIngame(data: FormData) {
  let response: any = await AxiosWithAuthFromData.post("game/register", data);

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
export { createaGame, getActiveMatches, getMatchDetails, registerIngame };
