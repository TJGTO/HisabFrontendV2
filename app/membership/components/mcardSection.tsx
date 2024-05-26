"use client";

import { useState, useEffect } from "react";
import Mcard from "./mcard";
import Searchbox from "./search";
import PageLoader from "../../Common/Loader/pageLoader";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchmembershipcards } from "../../../lib/slices/membership";

function McardSection() {
  const dispatch = useDispatch<AppDispatch>();
  const membershipList = useSelector(
    (state: RootState) => state.membership.membershipList
  );
  const fetchLoader = useSelector(
    (state: RootState) => state.membership.fetchLoader
  );
  useEffect(() => {
    dispatch(fetchmembershipcards());
  }, []);
  return (
    <div className="mt-3">
      <Searchbox />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 m-3">
        {fetchLoader ? (
          <PageLoader />
        ) : (
          <>
            {membershipList.map((item, index) => (
              <Mcard
                key={index}
                cardId={item.cardId}
                membershipName={item.membershipName}
                userName={item.userName}
                userId={item.userId}
                validfrom={item.validfrom}
                validto={item.validto}
                membershipCardId={item.membershipCardId}
                profilePictureURL={item.profilePictureURL}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default McardSection;
