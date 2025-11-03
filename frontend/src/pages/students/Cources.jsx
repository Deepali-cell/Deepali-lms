import { Skeleton } from "@/components/ui/skeleton";
import Cource from "./Cource";
import { useGetPubishedCourseQuery } from "@/feautures/AppApis/CourceApi";

const Cources = () => {
  const {
    data: getpublishedCourseData,
    isLoading: getpublishedCourseLoading,
    error: getpublishedCourseError,
  } = useGetPubishedCourseQuery();

  if (getpublishedCourseError) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold text-red-500">
          Some error occurred while fetching the published courses.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-bold text-center text-2xl sm:text-3xl lg:text-4xl mb-10">
          Our Courses
        </h1>

        <div
          className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-5 sm:gap-6 lg:gap-8"
        >
          {getpublishedCourseLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourceSkeleton key={index} />
              ))
            : getpublishedCourseData?.publishedCourse?.map((course, index) => (
                <Cource key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Cources;

const CourceSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[150px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  );
};
