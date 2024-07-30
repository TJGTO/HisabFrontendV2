import React, { useState } from "react";
import PageLoader from "../../Common/Loader/pageLoader";
import { geRabonaCupPlayers } from "../../gamedetails/service";
import Mcard from "./card";

const TeamsList: any = [
  "BFA",
  "Techie Tacklers",
  "Morning legends",
  "La Kolbicelestes",
  "Newtown Fc",
  "Fiiob Junos",
  "Skyking Fc",
  "Techie Tackler blues",
  "Bengal Scousers",
  "Legacy Fc",
  "FIIOB",
  "New Town Soccer Club",
  "Legend Fc",
  "CLFC",
  "Underdogs",
  "DUFC Jovenes",
  "86/1",
  "Airfeet Fc",
  "WFG team 1",
  "Morning legends Yellow",
  "F5",
  "Colony Institute",
  "The Racdons",
  "Morning Legends Red",
];
function RabonaCupSection() {
  const [flag, setflag] = useState<string>("");
  const [fetchLoader, setfetchLoader] = useState<boolean>(false);
  const [playersList, setplayersList] = useState<any[]>([]);
  const membershipList: any = [
    {
      userId: "65ea0153be409b7547632b60",
      userName: "Abhisek Dev",
      profilePictureURL: "Abhisek_Dev_2024-03-07_18%3A05%3A05.439Z",
      membershipCardId: "WFG_2024_0001",
      teamName: "Legends Fc",
      cardId: "665330312c59b48755854b86",
    },
    {
      userId: "65d247210f219a7bbd921e61",
      userName: "Souparna Ghosh",
      profilePictureURL: "Souparna_Ghosh_2024-03-10_11%3A29%3A55.409Z",
      teamName: "Underdogs",
      membershipCardId: "WFG_2024_0002",
      cardId: "6653319840b6ba4e9c07f034",
    },
    {
      userId: "65d247210f219a7bbd921e61",
      userName: "Souparna Ghosh",
      profilePictureURL: "Souparna_Ghosh_2024-03-10_11%3A29%3A55.409Z",
      teamName: "Underdogs",
      membershipCardId: "WFG_2024_0002",
      cardId: "6653319840b6ba4e9c07f034",
    },
  ];

  const onSubmitSearch = async () => {
    let reqbody: any = {
      gameid: "669b72fd7d8cdb2be0102bc2",
      teamName: flag,
    };
    setfetchLoader(true);
    let results: any = await geRabonaCupPlayers(reqbody);
    setfetchLoader(false);
    setplayersList([...results.players]);
  };
  return (
    <>
      <div
        id="searchCards"
        className="flex items-center max-w-sm mx-auto gap-2 mt-2"
      >
        <div>
          <select
            id="position"
            value={flag}
            className="bg-gray-50 w-full rounded-lg border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setflag(e.target.value);
            }}
          >
            <option value="">{"Please Select"}</option>
            {TeamsList &&
              TeamsList.map((item: any, index: number) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (flag) {
              onSubmitSearch();
            }
          }}
          className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 m-3">
        {fetchLoader ? (
          <PageLoader />
        ) : (
          <>
            {playersList.map((item: any, index: number) => (
              <Mcard
                key={index}
                cardId={item.cardId}
                userName={item.userName}
                userId={item.userId}
                profilePictureURL={item.profilePictureURL}
                teamName={item.teamName}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default RabonaCupSection;
