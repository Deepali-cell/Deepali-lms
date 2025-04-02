import { useTheme } from "@/components/Themeprovider";
import { Button } from "@/components/ui/button";
import BuyCourseBtn from "@/components/ui/BuyCourseBtn";
import { useGetCourseByIdQuery } from "@/feautures/AppApis/CourceApi";
import { usePurchaseStatusQuery } from "@/feautures/AppApis/TransactionApi";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetailPage() {
  const { theme } = useTheme(); // Get current theme from ThemeProvider
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const {
    data: getCourseData,
    isLoading: getCourseLoading,
    error: getCourseError,
  } = useGetCourseByIdQuery({ courseId });

  const { data } = usePurchaseStatusQuery(courseId);
  const purchasedCourse = data?.purchased;

  const course = getCourseData?.getCourse;

  if (getCourseLoading) {
    return <div className="text-center py-10">Loading course details...</div>;
  }

  if (getCourseError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error fetching course details:{" "}
        {getCourseError.message || "Unknown error"}
      </div>
    );
  }

  const handleContinueCourse = () => {
    navigate(`/continuecourse/${courseId}`);
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        theme === "dark"
          ? "bg-[#1a1a1a] text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div
          className={`rounded-lg shadow-lg p-8 mb-8 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-900"
              : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
          }`}
        >
          <h1 className="text-4xl font-extrabold mb-4">
            {course?.courseTitle || "Course Title"}
          </h1>
          <h4 className="text-lg font-light mb-4">
            {course?.subTitle || "Subtitle not available"}
          </h4>
          <div className="flex flex-col gap-4">
            <h4>
              <span className="font-medium">Created by:</span>{" "}
              <span className="font-semibold">
                {course?.createdBy?.name || "Unknown"}
              </span>
            </h4>
            <h5>
              <span className="font-medium">Last updated:</span>{" "}
              {course?.createdAt.split("T")[0] || "Not available"}
            </h5>
            <h4>
              <span className="font-medium">Students Enrolled:</span>{" "}
              {course?.enrolledStudents?.length || 0}
            </h4>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex gap-x-2">
          {/* Left Column */}
          <div
            className={`rounded-lg shadow-md mr-10 p-6 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="mb-6 leading-relaxed">
              {course?.description || "Description not available"}
            </p>

            <div className="border-t pt-4">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <h4 className="text-lg mb-2">Lectures</h4>
              <ul className="list-disc list-inside space-y-2">
                {course?.lectures?.length > 0 ? (
                  course.lectures.map((lecture, index) => (
                    <li key={index}>{lecture.lectureTitle}</li>
                  ))
                ) : (
                  <li>No lectures available.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div
            className={`rounded-lg shadow-md p-6 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <video
              className="rounded-lg mb-4 w-full"
              controls
              src={
                course?.lectures?.[0]?.videoUrl ||
                "https://via.placeholder.com/300"
              }
            ></video>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {course?.lectures?.[0]?.lectureTitle || "No lecture available"}
              </h3>
              <h5 className="text-lg font-bold text-purple-700 mb-4">
                ₹ {course?.coursePrice || "Not available"}
              </h5>
              {purchasedCourse ? (
                <Button
                  onClick={handleContinueCourse}
                  className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800"
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseBtn courseId={courseId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
