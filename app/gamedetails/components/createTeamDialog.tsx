import { createTeamDialogProps, Iplayers, IgameDetailsObj } from "../domain";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Tooltip } from "@mui/material";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function CreateTeamDialog({ open, onClose, gameid }: createTeamDialogProps) {
  const [teamArr, setteamArr] = useState<Iplayers[]>([]);
  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );
  useEffect(() => {
    if (open && gameDetails && gameDetails.players) {
      let copyGameDetails: IgameDetailsObj = JSON.parse(
        JSON.stringify(gameDetails)
      );
      let medien = copyGameDetails.number_of_players / 2;
      let dumpArray: Array<Iplayers> = [];

      copyGameDetails.players.forEach((x, index) => {
        if (index + 1 <= medien) {
          x.team = "A";
        } else {
          x.team = "B";
        }
        dumpArray.push(x);
      });
      setteamArr([...dumpArray]);
    }
  }, [open]);
  const handleClose = () => {
    onClose();
  };
  const updateTeams = (index: number, teamNo: string) => {
    let dump: Iplayers[] = [...teamArr];
    dump[index].team = teamNo;
    setteamArr([...dump]);
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="p-2 space-y-2 md:space-y-2 sm:p-2">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Teams
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-3">
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Team A
              </h5>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {teamArr.map((x, index) => {
                  if (x.team && x.team == "A")
                    return (
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Avatar src={x.profilepictureurl} alt={x.name} />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {x.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {x.position}
                            </p>
                          </div>
                          <div className="inline-flex cursor-pointer items-center text-base font-semibold text-gray-900 dark:text-white pl-2">
                            <ArrowForwardIcon
                              onClick={(e) => {
                                e.preventDefault();
                                updateTeams(index, "B");
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    );
                })}
              </ul>
            </div>
          </div>
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Team B
              </h5>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {teamArr.map((x, index) => {
                  if (x.team && x.team == "B")
                    return (
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Avatar src={x.profilepictureurl} alt={x.name} />
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              {x.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {x.position}
                            </p>
                          </div>
                          <div className="inline-flex cursor-pointer items-center text-base font-semibold text-gray-900 dark:text-white pl-2">
                            <ArrowBackIcon
                              onClick={(e) => {
                                e.preventDefault();
                                updateTeams(index, "A");
                              }}
                            />
                          </div>
                        </div>
                      </li>
                    );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CreateTeamDialog;
