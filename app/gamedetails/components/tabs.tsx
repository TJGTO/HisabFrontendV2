import React, { useState } from "react";
import { tabsObject } from "../domain";

const TABS: tabsObject[] = [
  {
    label: "All",
    value: "all",
    clicked: false,
  },
  {
    label: "Paid",
    value: "paid",
    clicked: false,
  },
  {
    label: "Due",
    value: "due",
    clicked: false,
  },
];
function Tabs() {
  const [tabsArr, settabsArr] = useState<tabsObject[]>(TABS);
  const setClicked = (tabIndex: number) => {
    let copyArr: tabsObject[] = [...tabsArr];
    copyArr.forEach((element, index) => {
      if (index == tabIndex) element.clicked = true;
      else element.clicked = false;
    });
    settabsArr([...copyArr]);
  };
  return (
    <div className="flex flex-row gap-4">
      {TABS.map((x, index) => (
        <div
          className={`w-20 h-9 flex items-center justify-center cursor-pointer hover:bg-sky-500 ${
            x.clicked ? "bg-red-700" : "bg-sky-200"
          }`}
          key={index}
          onClick={(e) => setClicked(index)}
        >
          {x.label}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
