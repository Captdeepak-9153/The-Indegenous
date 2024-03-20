import { Button } from "@mui/material";
import { TbWorldSearch } from "react-icons/tb";
import { HiClipboardDocument } from "react-icons/hi2";
import { PiQuotesBold } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
export default function Header() {
  return (
    <div className="w-screen  outline outline-offset-2 outline-2 h-14 rounded-none  outline-gray-400 flex ">
      <div className="h-full">
        <Button
          variant="outlined"
          style={{ borderRadius: "0", height: "100%" }}
        >
        Research  
        <TbWorldSearch />
        </Button>
      </div>

      <div>
        <Button
          variant="outlined"
          style={{ borderRadius: "0", height: "100%" }}
        >

        <HiClipboardDocument />

        </Button>
      </div>
      <div>
        <Button
          variant="outlined"
          style={{ borderRadius: "0", height: "100%" }}
        >
        <PiQuotesBold />
        </Button>
      </div>
      <div className=" grow flex justify-end mr-4 ">
        <Button
          variant="outlined"
          style={{ borderRadius: "0", height: "100%,  " }}
        >
          <GrClose />
        </Button>
      </div>
    </div>
  );
}
