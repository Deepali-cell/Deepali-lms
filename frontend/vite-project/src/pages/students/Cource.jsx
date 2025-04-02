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
      className="transition-transform transform hover:scale-105 hover:shadow-xl hover:border-blue-600 duration-300 max-w-xs mx-auto px-6"
    >
      <Card className="border rounded-lg shadow-md overflow-hidden bg-white">
        <CardHeader className="p-0">
          <div className="h-40 overflow-hidden">
            <img
              src={course?.courseThumbnail}
              alt="Course Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <h1 className="text-lg font-semibold text-gray-800 truncate">
            {course?.courseTitle}
          </h1>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src={
                    course.createdBy?.userPic || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                  className="w-8 h-8 rounded-full"
                />
                <AvatarFallback className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 font-bold">
                  {course.createdBy?.name}
                </AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm uppercase">
                {course.createdBy?.name}
              </h1>
            </div>
            <span className="bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
              {course?.courseLevel}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <h3 className="text-xl font-bold text-black">
            ₹ {course?.coursePrice}
          </h3>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cource;
