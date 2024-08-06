import { getLongUrl } from "@/db/apiUrls";
import UseFetch from "@/Hooks/UseFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { storeClicks } from "@/db/apiClicks";

const RedirectLink = () => {
  const {id} = useParams();
  
  const { loading, data, fn } = UseFetch(getLongUrl, id);
  console.log(data);
  
  const { loading: loadingStats, fn: fnStats } = UseFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });
  
  useEffect(() => {
    // console.log(id)
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return(
      <>
        <BarLoader width={"100%"} color="#36d7b7"/>
        <br />
        Redirecting....
      </>
    )
  }

  return null;
}

export default RedirectLink
