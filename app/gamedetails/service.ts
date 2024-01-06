import { AxiosWithAuth } from "../../lib/axios";
import { createGameReqBody } from "./domain";

async function createaGame(data: createGameReqBody) {
  let response: any = await AxiosWithAuth.post("game/creategame", data);

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

export { createaGame };
