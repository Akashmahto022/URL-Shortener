import { UrlState } from "@/Context/Context";
import { getClickForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import UseFetch from "@/Hooks/UseFetch";
import { Download, LinkIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader, BarLoader } from "react-spinners";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationStats from "@/components/LocationStats/LocationStats";
import DeviceStats from "@/components/DeviceStats/DeviceStats";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = UseFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = UseFetch(getClickForUrl, id);

  console.log(stats)

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  const { loading: loadingDelete, fn: fnDelete } = UseFetch(deleteUrl, id);

  if (error) {
    navigate("/deshboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}

      <div className="flex flex-col gap-[100px] sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://trimer.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-500 font-bold hover:underline cursor-pointer"
          >
            https://trimer.in/{link}
          </a>
          <a href={url?.original_url} target="_blank">
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://trimer.in/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button variant="ghost" onClick={() => fnDelete()}>
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        <Card className="w-full sm:3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">
              Stats of your Link
            </CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>
              <CardTitle>Location data</CardTitle>
              <LocationStats stats={stats}/>
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats}/>


            </CardContent>
          ) : (
            <CardContent>
              {!loadingStats ? "No statistic yet" : "Loading Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
