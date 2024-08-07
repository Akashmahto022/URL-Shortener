import { Trash, Download, Copy } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import UseFetch from "@/Hooks/UseFetch";
import { BeatLoader } from "react-spinners";
import { deleteUrl } from "@/db/apiUrls";


const LinkCart = ({ url, fetchUrls }) => {
  console.log(url.qr)
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

  const { loading: loadingDelete, fn: fnDelete } = UseFetch(deleteUrl, url?.id);

  return (
    <div className=" flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        className="h-32 object-contain ring ring-blue-500 self-start"
        src={url?.qr}
        alt="qr code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}{" "}
        </span>
        <span className="text-2xl max-sm:text-[10px] text-blue-400 font-bold hover:underline cursor-pointer">
        http://localhost:5173/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() =>
            navigator.clipboard.writeText(`http://localhost:5173/${url?.short_url}`)
          }
        >
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
         { loadingDelete?<BeatLoader size={5} color="white"/> :<Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCart;
