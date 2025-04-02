import { useGetCourseByIdQuery } from "@/feautures/AppApis/CourceApi";
import { useParams } from "react-router-dom";

function ShowCourseById() {
  const { courseId } = useParams();
  const { data, isLoading, error, isSuccess } = useGetCourseByIdQuery({
    courseId,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-bold text-blue-600 animate-pulse">
          Loading course details...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-bold text-red-500">
          Error: {error.message}
        </div>
      </div>
    );

  if (!isSuccess || !data)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-bold text-gray-600">No course found.</div>
      </div>
    );

  const course = data.getCourse;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white p-4">
            <h1 className="text-4xl font-bold">{course.courseTitle}</h1>
            <p className="text-xl">{course.subTitle}</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-800 text-lg leading-relaxed mb-4">
            {course.description}
          </p>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <span className="font-semibold">Category:</span> {course.category}
            </div>
            <div>
              <span className="font-semibold">Level:</span> {course.courseLevel}
            </div>
            <div>
              <span className="font-semibold">Price:</span> ₹
              {course.coursePrice}
            </div>
            <div>
              <span className="font-semibold">Published:</span>{" "}
              {course.published ? "Yes" : "No"}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Created By:</span>{" "}
              {course.createdBy}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(course.createdAt).toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
              Enroll Now
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
              View Lectures
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowCourseById;
