import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { RootState } from "../../../lib/store";
import { useSelector } from "react-redux";
import CustomTable from "../../Common/Table/CustomTable";

function CollectionTable() {
  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );
  const [tablerows, settablerows] = useState<Array<JSX.Element>>([]);
  const tableheadArr = [
    { id: 1, label: "Type" },
    { id: 2, label: "PHP" },
    { id: 3, label: "Count" },
    { id: 4, label: "Collection" },
  ];
  useEffect(() => {
    if (gameDetails) {
      createTableRows();
    }
  }, [gameDetails]);

  let totalPrice = 0;
  const getPlayersCount = (type: string) => {
    let count = 0;
    gameDetails?.players.forEach((x) => {
      let typeData = x.dynamicFields?.find((item) => item.name == "Type");
      if (typeData && typeData.value == type) {
        count++;
      }
    });
    return count;
  };
  const playersTotalCollection = (count: number | undefined, price: number) => {
    totalPrice += count ? count * price : 0;
    return count ? count * price : 0;
  };
  const createTableRows = (): void => {
    let arr: JSX.Element[] = [];
    gameDetails?.paymentOptions?.forEach(({ paymentType, price }, index) => {
      const isLast = index === gameDetails?.players.length - 1;
      const count = getPlayersCount(paymentType);
      let classes = "p-2 border-b border-blue-gray-50";
      const row: JSX.Element = (
        <>
          <tr>
            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  color="blue-gray"
                  className="font-normal dark:text-white"
                >
                  {paymentType}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  color="blue-gray"
                  className="font-normal dark:text-white"
                >
                  {price}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  color="blue-gray"
                  className="font-normal dark:text-white"
                >
                  {count}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  color="blue-gray"
                  className="font-normal dark:text-white"
                >
                  {playersTotalCollection(count, price)}
                </Typography>
              </div>
            </td>
          </tr>
        </>
      );
      arr.push(row);
    });
    ///push the last row where we will show the total
    arr.push(
      <>
        <tr>
          <td className="p-2">
            <div className="flex flex-col">
              <Typography
                color="blue-gray"
                className="font-normal dark:text-white"
              ></Typography>
            </div>
          </td>
          <td className="p-2">
            <div className="flex flex-col">
              <Typography
                color="blue-gray"
                className="font-normal dark:text-white"
              ></Typography>
            </div>
          </td>
          <td className="p-2">
            <div className="flex flex-col">
              <Typography
                color="blue-gray"
                className="font-normal dark:text-white"
              >
                {"Total"}
              </Typography>
            </div>
          </td>
          <td className="p-2">
            <div className="flex flex-col">
              <Typography
                color="blue-gray"
                className="font-normal dark:text-white"
              >
                {totalPrice}
              </Typography>
            </div>
          </td>
        </tr>
      </>
    );
    settablerows([...arr]);
  };
  return (
    <div className="w-full text-gray-900 dark:text-white">
      <CustomTable
        tablehead={tableheadArr}
        tablerows={tablerows}
        paginationNotNeeded={true}
      />
    </div>
  );
}

export default CollectionTable;
