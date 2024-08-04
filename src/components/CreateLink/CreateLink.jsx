import { UrlState } from "@/Context/Context";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New</DialogTitle>
          </DialogHeader>
            <Input id="title" placeholder="Short link's title"/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;
