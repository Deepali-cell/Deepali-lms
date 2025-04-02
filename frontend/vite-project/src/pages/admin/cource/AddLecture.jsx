import { Button } from "@/components/ui/button";
import {
  useCreateLectureMutation,
  useGetLectureQuery,
} from "@/feautures/AppApis/CourceApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

function AddLecture() {
  const { courseId } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();

  const [
    createLecture,
    {
      data: lectureData,
      isLoading: lectureLoading,
      error: lectureError,
      isSuccess: lectureSuccess,
    },
  ] = useCreateLectureMutation();

  const {
    data: getLectureData,
    isSuccess: getLectureSuccess,
    error: getLectureError,
    isLoading: getLectureLoading,
    refetch,
  } = useGetLectureQuery(courseId);

  const handleLecture = async (event) => {
    event.preventDefault();
    if (!lectureTitle.trim()) {
      toast.error("Lecture title cannot be empty!");
      return;
    }
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (lectureSuccess) {
      refetch();
      toast.success(lectureData?.message || "Lecture added successfully!");
      setLectureTitle("");
    }
    if (lectureError) {
      toast.error(lectureError?.data?.message || "Failed to add lecture.");
      console.error("Error:", lectureError);
    }
  }, [lectureSuccess, lectureError, lectureData]);
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-6 min-h-screen">
      {/* Add Lecture Form */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Add New Lecture
        </h1>
        <p className="text-gray-600 mb-6">
          Let's add some basic details for your new lecture.
        </p>

        <form className="space-y-6" onSubmit={handleLecture}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Enter lecture title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <Button
              variant="outline"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => navigate("/admin/cources")}
            >
              Back
            </Button>
            <Button type="submit" disabled={lectureLoading}>
              {lectureLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create Lecture"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Display Existing Lectures */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Existing Lectures
        </h2>
        {getLectureLoading && (
          <p className="text-gray-500">Loading lectures...</p>
        )}
        {getLectureError && (
          <p className="text-red-500">Failed to load lectures.</p>
        )}
        {getLectureSuccess && getLectureData?.lectures?.length > 0 ? (
          <div className="space-y-4">
            {getLectureData.lectures.map((lecture, index) => (
              <Lecture
                lecture={lecture}
                key={lecture._id}
                index={index}
                courseId={courseId}
              ></Lecture>
            ))}
          </div>
        ) : (
          !getLectureLoading && (
            <p className="text-gray-500">No lectures found. Add one now!</p>
          )
        )}
      </div>
    </div>
  );
}

export default AddLecture;
