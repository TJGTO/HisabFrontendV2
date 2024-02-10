import React from "react";
import { dataForStatisticsSection } from "./domain";

function StatisticsSection() {
  return (
    <section>
      <div className="container px-5 py-14 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          {dataForStatisticsSection &&
            dataForStatisticsSection.map((x) => (
              <div
                className="p-4 md:w-1/4 sm:w-1/2 w-full text-gray-600 dark:text-gray-400"
                key={x.id}
              >
                <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 bg-stone-100 dark:bg-gray-800">
                  <div className="h-20 w-20 inline-block">
                    <img src={x.icon} />
                  </div>
                  <h2 className="title-font font-medium text-3xl">
                    {x.statsText}
                  </h2>
                  <p className="leading-relaxed">{x.secondaryText}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
