import { useGetCourseLectureQuery } from "@/feautures/AppApis/TransactionApi";
import { Button } from "./button";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ContinuCourse() {
  const { courseId } = useParams();
  const { data, isLoading, isSuccess, error } =
    useGetCourseLectureQuery(courseId);
  const lectures = data?.courseLecture?.lectures || [];

  // State to manage the currently selected lecture
  const [selectedLecture, setSelectedLecture] = useState(lectures[0] || null);

  const handleLectureClick = (lecture) => {
    console.log(lecture);
    setSelectedLecture(lecture);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 min-h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-black shadow-md rounded-lg p-6 dark:bg-white">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {data?.courseLecture?.courseTitle || "Loading..."}
        </h1>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <video
            className="w-full h-74 object-cover"
            controls
            src={
              selectedLecture?.videoUrl || "https://www.example.com/video.mp4"
            }
            alt={selectedLecture?.lectureTitle || "Course Video"}
          ></video>
          <h2 className="text-lg font-semibold text-gray-700 p-4">
            {selectedLecture?.lectureTitle || "Lecture Title"}
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 dark:bg-white bg-black shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-10">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Course Lectures
          </h1>
          <Button>Mark as Completed</Button>
        </div>
        <ul className="space-y-4">
          {lectures.map((lecture) => (
            <li
              key={lecture._id}
              className={`p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 flex items-center gap-2 cursor-pointer text-black ${
                selectedLecture?.id === lecture.id ? "bg-gray-200" : ""
              }`}
              onClick={() => handleLectureClick(lecture)}
            >
              <FaRegCirclePlay
                className={`${
                  selectedLecture?.id === lecture.id
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              />
              {lecture.lectureTitle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContinuCourse;
