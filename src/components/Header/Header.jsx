import React from "react";
import logo from "../../assets/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/Context/Context";
import UseFetch from "@/Hooks/UseFetch";
import { logout } from "../../db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = UseFetch(logout);

  return (
    <>
    <nav className="py-4 flex justify-between items-center">
      <Link to={"/"}>
        <img src={logo} className="h-[130px]" alt="" />
      </Link>

      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.user_metadata?.profile_pic}
                  className="object-contain"
                />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {user?.user_metadata?.fullName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={"/deshboard"} className="flex">
                <LinkIcon className="mr-2 h-4 w-4" />
                My Links
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 font-medium">
                <LogOut className="mr-2 h-4 w-4" />
                <span
                  onClick={() => {
                    fnLogout().then(() => {
                      navigate("/");
                      fetchUser()
                    });
                  }}
                >
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
    </>
  );
};

export default Header;
