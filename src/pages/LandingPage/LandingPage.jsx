import React, { useState } from "react";
import banner from "../../assets/banner.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const [longUrl, setLongUrl] = useState()
  const navigate = useNavigate();

  const handleShorten = (e)=>{
    e.preventDefault()
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortener <br /> you'll ever need! 👇
      </h2>
      <form
        onSubmit={handleShorten}
        action=""
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
      >
        <Input
          type="url"
          value={longUrl}
          placeholder="Enter your long url"
          className="h-full flex-1 py-4 px-4"
          onChange={(e)=>setLongUrl(e.target.value)}
        />
        <Button className="h-full" type="submit" variant="secondary">
          Shorten!
        </Button>
      </form>
      <img src={banner} alt="" className="w-full my-11 md:px-11" />
      <Accordion type="multiple" className="w-full md:px-11" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the this web?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your urls, view
            analytics, and customiz your short urls.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            what analytics are available for my shorted url?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocatiion data of the clicks
            and device type (mobile/desktop/tablets) for each of your shorted
            urls.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LandingPage;
