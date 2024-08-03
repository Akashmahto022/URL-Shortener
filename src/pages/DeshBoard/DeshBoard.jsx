import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import Error from "@/components/Error/Error";
import UseFetch from "@/Hooks/UseFetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/Context/Context";
import { getClicksOfUrls } from "@/db/apiClicks";
import LinkCart from "@/components/LinkCart/LinkCart";

const DeshBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = UseFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = UseFetch(
    getClicksOfUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
    console.log(clicks)
    console.log(urls)
  }, []);

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls?.length]);

  const filterdUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My links</h1>
        <Button>Create Link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filterdUrls || []).map((url, id)=>{
        return <LinkCart key={id} url={url} fetchUrls={fnUrls}/>
      })}
    </div>
  );
};

export default DeshBoard;
