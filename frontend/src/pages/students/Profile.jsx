import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Cource from "./Cource";
import {
  useGetBuyCourseQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/feautures/AppApis/AppApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { data, isLoading, refetch } = useGetProfileQuery();
  const user = data?.user || {};
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [userPic, setuserPic] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const changePic = (e) => {
    const file = e.target.files?.[0];
    if (file) setuserPic(file);
  };

  const navigate = useNavigate();

  const [
    updateProfile,
    {
      data: updateData,
      isLoading: updateLoading,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateProfileMutation();
  const {
    data: mycourseData,
    isLoading: mycourseLoading,
    isSuccess: mycourseSuccess,
    error: mycourseError,
  } = useGetBuyCourseQuery();
  const myCources = mycourseData?.buyCourse?.enrollementCourses;

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name || user.name);
      formData.append("email", email);
      formData.append("userPic", userPic);
      await updateProfile(formData);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (updateSuccess) {
      refetch();
      toast.success(updateData.message || "Profile updated successfully");
      setName("");
      setEmail("");
      setuserPic(null);
      setIsDialogOpen(false); // Close the dialog
      navigate("/profile");
    }

    if (updateError) {
      toast.error(updateError.data?.message || "Profile update failed");
    }
  }, [updateData, updateError, updateSuccess]);

  useEffect(() => {
    if (isDialogOpen) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [isDialogOpen, user]);

  return (
    <div className=" min-h-screen">
      <h1 className="font-bold text-3xl mb-6 ml-10 p-10">My Profile</h1>

      <div className="rounded-lg shadow-lg p-6 max-w-3xl ml-10 dark:bg-white  bg-black text-white">
        <div className="flex items-center gap-10 flex-col md:flex-row lg:flex-row sm:flex-row">
          <Avatar>
            <AvatarImage
              src={user.userPic || "https://github.com/shadcn.png"}
              alt="@shadcn"
              className="w-24 h-24 rounded-full"
            />
            <AvatarFallback className="w-24 h-24 flex items-center justify-center bg-gray-300  font-bold">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className=" dark:text-black font-medium">Name:</h2>
              <span className=" font-semibold dark:text-black">
                {user.name || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center md:gap-0 gap-6">
              <h2 className="font-medium dark:text-black">Email:</h2>
              <span className=" font-semibold dark:text-black">
                {user.email || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=" font-medium dark:text-black">Role:</h2>
              <span className=" font-semibold dark:text-black">
                {user.role || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-1/2 md:w-1/4 sm:w-1/4 mr-10 sm:mr-0 md:mr-0 lg-mr-0 ">
                Edit Profile
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your profile details and save changes.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={email}
                    readOnly
                    className="col-span-3  cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Profile Image
                  </Label>
                  <Input id="userPic" type="file" onChange={changePic} />
                </div>
              </div>

              <DialogFooter>
                <Button onClick={handleSubmit} disabled={updateLoading}>
                  {updateLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* <div> */}
      <div className="p-10">
        <h1 className="font-bold text-3xl  mb-6 ml-10">My Courses</h1>
        <div className="max-w-7xl p-6 ml-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              data?.buyCourse?.enrollementCourses.map((_, index) => (
                <LearningSkeleton key={index} />
              ))
            ) : (
              <>
                {myCources.length === 0 ? (
                  <p>You are not enrolled in any cource.</p>
                ) : (
                  myCources.map((course, index) => (
                    <Cource key={index} course={course} />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Profile;

const LearningSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);
