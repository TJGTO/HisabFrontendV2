import React from "react";
import Mcard from "./mcard";
import Searchbox from "./search";

function McardSection() {
  return (
    <div className="mt-3">
      <Searchbox />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 m-3">
        <Mcard />
        <Mcard />
        <Mcard />
        <Mcard />
        <Mcard />
        <Mcard />
      </div>
    </div>
  );
}

export default McardSection;
