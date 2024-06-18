import React from "react";
import { RootState } from "../../../lib/store";
import { useSelector } from "react-redux";

function CollectionTable() {
  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );

  let totalPrice = 0;
  const getPlayersCount = (type: string) => {
    return gameDetails?.players.filter(
      (x) => x.player_type == type && x.status == "Approved"
    ).length;
  };
  const playersTotalCollection = (type: string, price: number) => {
    const count = getPlayersCount(type);

    totalPrice += count ? count * price : 0;
    return count ? count * price : 0;
  };
  return (
    <div className="w-full text-gray-900 dark:text-white">
      <thead>
        <tr>
          <th className="border px-4 py-2">Type</th>
          <th className="border px-4 py-2">PHP</th>
          <th className="border px-4 py-2">Count</th>
          <th className="border px-4 py-2">Collection</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {gameDetails?.paymentOptions?.map((x, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{x.paymentType}</td>
            <td className="border px-4 py-2">{x.price}</td>
            <td className="border px-4 py-2">
              {getPlayersCount(x.paymentType)}
            </td>
            <td className="border px-4 py-2">
              {playersTotalCollection(x.paymentType, x.price)}
            </td>
          </tr>
        ))}
        <tr>
          <td className="border px-4 py-2"></td>
          <td className="border px-4 py-2"></td>
          <td className="border px-4 py-2">Total</td>
          <td className="border px-4 py-2">{totalPrice}</td>
        </tr>
      </tbody>
    </div>
  );
}

export default CollectionTable;
