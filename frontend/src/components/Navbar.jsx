import { MenuIcon, School } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "./ui/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/feautures/AppApis/AppApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((store) => store.userSlice || {});
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "logout successfully");
      navigate("/register");
    }
  }, [isSuccess]);
  return (
    <div className="border-b border-gray-300 shadow-md px-10">
      {/* desktop navbar */}
      <div className=" justify-between items-center px-4 py-2 md:flex hidden ">
        {/* Left Section */}
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate("/")}
        >
          <School className="text-blue-500" />
          <h1 className="text-xl font-semibold">Tech Learning</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-10">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={user.userPic || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/mylearning")}>
                      My Learning
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  {user.role == "instructor" && (
                    <>
                      {" "}
                      <Button
                        className={"w-full"}
                        onClick={() => navigate("/admin")}
                      >
                        DashBoard
                      </Button>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/register")}>Signup</Button>
              </div>
            </>
          )}
          <DarkMode />
        </div>
      </div>
      {/* mobile navbar  */}
      <div className="flex items-center justify-around space-x-20 py-2 md:hidden">
        <div
          className="flex items-center space-x-2"
          onClick={() => navigate("/")}
        >
          <School className="text-blue-500" />
          <h1 className="text-xl font-bold mr-10 ">Tech Learning</h1>
        </div>
        <div className="ml-10">
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

const MobileNavbar = () => {
  const { user } = useSelector((store) => store.userSlice || {});
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "logout successfully");
      navigate("/register");
    }
  }, [isSuccess]);
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={"rounded-full bg-gray-200 hover:bg-gray-100"}
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader
            className={"flex flex-row items-center justify-between mt-10"}
          >
            <SheetTitle className={"font-bold text-2xl"}>
              Tech Learning
            </SheetTitle>
            <DarkMode />
          </SheetHeader>
          <nav className="flex flex-col space-y-4 my-10">
            <span onClick={() => navigate("/mylearning")}>My Learning</span>
            <span onClick={() => navigate("/profile")}>Edit Profile</span>
            <p onClick={logoutHandler}>Logout</p>
          </nav>
          {user?.role == "instructor" && (
            <>
              {" "}
              <SheetFooter>
                <SheetClose asChild>
                  <Button onClick={() => navigate("/admin")}>Dashboard</Button>
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
