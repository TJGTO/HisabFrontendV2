"use client";

import { useState, useEffect } from "react";
import Mcard from "./mcard";
import CustomTableFooter from "../../Common/Table/CustomTableFooter";
import Searchbox from "./search";
import { fetchMenbershipCardsReqBody, cardtype } from "../domain";
import PageLoader from "../../Common/Loader/pageLoader";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchmembershipcards,
  resetMembershipData,
} from "../../../lib/slices/membership";

function McardSection() {
  const dispatch = useDispatch<AppDispatch>();
  const membershipList = useSelector(
    (state: RootState) => state.membership.membershipList
  );
  const totalCount = useSelector(
    (state: RootState) => state.membership.totalCount
  );
  const fetchLoader = useSelector(
    (state: RootState) => state.membership.fetchLoader
  );

  const flag = useSelector((state: RootState) => state.membership.flag);

  const [skip, setskip] = useState<number>(0);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setpageSize] = useState<number>(10);
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (page != 1 && membershipList.length <= (page - 1) * pageSize) {
      setskip((page - 1) * pageSize);
      let obj: fetchMenbershipCardsReqBody = {
        flag: flag,
        skip: (page - 1) * pageSize,
        limit: pageSize,
      };
      dispatch(fetchmembershipcards(obj));
    }
  }, [page]);
  useEffect(() => {
    let obj: fetchMenbershipCardsReqBody = {
      flag: flag,
      skip: (page - 1) * pageSize,
      limit: pageSize,
    };
    dispatch(fetchmembershipcards(obj));

    return () => {
      dispatch(resetMembershipData());
    };
  }, []);
  return (
    <div className="mt-3">
      <Searchbox
        paginationdata={{ flag, skip, limit: pageSize }}
        setpage={setpage}
        setskip={setskip}
      />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 m-3">
        {fetchLoader ? (
          <PageLoader />
        ) : (
          <>
            {membershipList
              .slice((page - 1) * pageSize, page * pageSize)
              .map((item, index) => (
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
                  paginationdata={{ flag, skip, limit: pageSize }}
                />
              ))}
          </>
        )}
      </div>
      <CustomTableFooter
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        setpage={setpage}
        setpageSize={setpageSize}
      />
    </div>
  );
}

export default McardSection;
