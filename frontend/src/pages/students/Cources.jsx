import { Skeleton } from "@/components/ui/skeleton";
import Cource from "./Cource";
import { useGetPubishedCourseQuery } from "@/feautures/AppApis/CourceApi";

const Cources = () => {
  const {
    data: getpublishedCourseData,
    isLoading: getpublishedCourseLoading,
    isSuccess: getpublishedCourseSuccess,
    error: getpublishedCourseError,
  } = useGetPubishedCourseQuery();

  if (getpublishedCourseError) {
    return <h1>Some error occured while fetching the published course.</h1>;
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-[#141414]">
        <div className="mx-auto max-w-7xl p-6 ">
          <h1 className="font-bold text-center text-3xl mb-10">Our Cources</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getpublishedCourseLoading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <CourceSkeleton key={index} />
                ))
              : getpublishedCourseData?.publishedCourse &&
                getpublishedCourseData?.publishedCourse.map((course, index) => {
                  return <Cource key={index} course={course} />;
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cources;

const CourceSkeleton = () => {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </>
  );
};
