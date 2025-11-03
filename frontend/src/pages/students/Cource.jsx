import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Cource = ({ course }) => {
  const navigate = useNavigate();
  const courseId = course?._id;

  return (
    <div
      onClick={() => navigate(`/coursedetailpage/${courseId}`)}
      className="
        transition-transform duration-300 cursor-pointer
        sm:hover:scale-105 sm:hover:shadow-xl sm:hover:border-blue-600
        w-full
      "
    >
      <Card className="border rounded-lg shadow-md overflow-hidden bg-white w-full h-full">
        {/* Thumbnail */}
        <CardHeader className="p-0">
          <div className="h-40 sm:h-48 md:h-52 overflow-hidden">
            <img
              src={course?.courseThumbnail}
              alt="Course Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          <h1 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
            {course?.courseTitle}
          </h1>

          {/* Creator & Level */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    course?.createdBy?.userPic ||
                    "https://github.com/shadcn.png"
                  }
                  alt={course.createdBy?.name}
                  className="w-8 h-8 rounded-full"
                />
                <AvatarFallback className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 font-bold">
                  {course?.createdBy?.name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              <h1 className="font-medium text-sm uppercase line-clamp-1">
                {course?.createdBy?.name}
              </h1>
            </div>

            <span className="bg-blue-600 text-white px-3 py-1 text-xs rounded-full whitespace-nowrap">
              {course?.courseLevel}
            </span>
          </div>
        </CardContent>

        {/* Price */}
        <CardFooter className="p-4">
          <h3 className="text-lg sm:text-xl font-bold text-black">
            ₹ {course?.coursePrice}
          </h3>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cource;
