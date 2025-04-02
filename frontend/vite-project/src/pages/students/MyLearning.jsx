import { Skeleton } from "@/components/ui/skeleton";
import Cource from "./Cource";
import { useGetBuyCourseQuery } from "@/feautures/AppApis/AppApi";

function MyLearning() {
  const { data, isLoading, isSuccess, error } = useGetBuyCourseQuery();
  const myCources = data?.buyCourse?.enrollementCourses;
  return (
    <>
      <div className="bg-gray-50">
        <div className=" max-w-7xl p-6 mx-auto">
          <h1 className="font-bold text-3xl mb-10 ml-6">My Learning</h1>
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
    </>
  );
}

export default MyLearning;

const LearningSkeleton = () => {
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
