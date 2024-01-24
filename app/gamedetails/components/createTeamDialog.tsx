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
  const [numberofTeams, setnumberofTeams] = useState<number>(2);
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
        <div className="flex flex-col mx-auto">
          <div className="pl-3 pt-2 space-y-2 md:space-y-2 sm:pl-3 sm:pt-2 pr-3 sm:pr-3">
            <div className="flex gap-3 justify-between">
              <div className="flex gap-3">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={numberofTeams == 2}
                  >
                    2 Teams
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    3 Teams
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    4 Teams
                  </button>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
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
