import {
  createTeamDialogProps,
  Iplayers,
  IgameDetailsObj,
  teamConfigObj,
  IUpdateTeamReqObj,
} from "../domain";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Tooltip } from "@mui/material";
import { updateTeamDetails } from "../../../lib/slices/gamemodule";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const teamsConfigArr: teamConfigObj[] = [
  { teamKey: "A", name: "Team A" },
  { teamKey: "B", name: "Team B" },
  { teamKey: "C", name: "Team C" },
  { teamKey: "D", name: "Team D" },
];

function CreateTeamDialog({ open, onClose, gameid }: createTeamDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
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
      let dumpArray: Array<Iplayers> = [];

      copyGameDetails.players.forEach((x, index) => {
        x.team = teamsConfigArr[0].teamKey;
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
  const checkIfPossibletoSwitchTeamNumbers = (index: number) => {
    let flag = true;
    const AvailableTeamKeys: Array<string> = teamsConfigArr
      .slice(index, 4)
      .map((x) => x.teamKey);
    if (AvailableTeamKeys.length > 0) {
      teamArr.forEach((x) => {
        if (x.team && AvailableTeamKeys.includes(x.team)) {
          flag = false;
        }
      });
    }
    if (!flag) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Please move the players first",
      });
    }

    return flag;
  };
  const saveTeamsDetail = () => {
    console.log("teamArr", teamArr);
    let requestObj: IUpdateTeamReqObj = {
      gameId: "",
      players: teamArr,
      number_of_teams: numberofTeams,
    };
    dispatch(updateTeamDetails(requestObj));
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={numberofTeams == 4 ? "xl" : "md"}
    >
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col mx-auto">
          <div className="pl-3 pt-2 space-y-2 md:space-y-2 sm:pl-3 sm:pt-2 pr-3 sm:pr-3">
            <div className="flex gap-3 justify-between">
              <div className="flex gap-3">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (checkIfPossibletoSwitchTeamNumbers(2)) {
                        setnumberofTeams(2);
                      }
                    }}
                    className={`px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    disabled={numberofTeams == 2}
                  >
                    2 Teams
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (checkIfPossibletoSwitchTeamNumbers(3)) {
                        setnumberofTeams(3);
                      }
                    }}
                    disabled={numberofTeams == 3}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    3 Teams
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (checkIfPossibletoSwitchTeamNumbers(4)) {
                        setnumberofTeams(4);
                      }
                    }}
                    disabled={numberofTeams == 4}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    4 Teams
                  </button>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={(e) => {
                    e.preventDefault();
                    saveTeamsDetail();
                  }}
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
          {teamsConfigArr.slice(0, numberofTeams).map((y, tidx) => (
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  {y.name}
                </h5>
              </div>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {teamArr.map((x, index) => {
                    if (x.team && x.team == y.teamKey)
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
                              {tidx != 0 && (
                                <ArrowBackIcon
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateTeams(
                                      index,
                                      teamsConfigArr[tidx - 1].teamKey
                                    );
                                  }}
                                />
                              )}
                              {tidx != numberofTeams - 1 && (
                                <ArrowForwardIcon
                                  onClick={(e) => {
                                    e.preventDefault();
                                    updateTeams(
                                      index,
                                      teamsConfigArr[tidx + 1].teamKey
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                      );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}

export default CreateTeamDialog;
