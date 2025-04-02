import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/feautures/AppApis/CourceApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function EditLecture() {
  const MEDIA_URL = "http://localhost:3000/api/videoupload";
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const [lectureTitle, setlectureTitle] = useState("");
  const [isPreviewFree, setisPreviewFree] = useState(false);
  const [uploadVideoInfo, setuploadVideoInfo] = useState(null);
  const [mediaProgress, setmediaProgress] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [btnDisable, setbtnDisable] = useState(true);

  const [
    editLecture,
    {
      data: editData,
      error: editError,
      isSuccess: editSuccess,
      isLoading: editLoading,
    },
  ] = useEditLectureMutation();
  const [
    removeLecture,
    {
      data: removeLectureData,
      isSuccess: removeLectureSuccess,
      isLoading: removeLectureLoading,
    },
  ] = useRemoveLectureMutation();
  const {
    data: getLectureData,
    isLoading: getLectureLoading,
    isSuccess: getLectureSuccess,
    error: getLectureError,
  } = useGetLectureByIdQuery(lectureId);

  // File Upload Handler
  const FileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setmediaProgress(true);
      try {
        const response = await axios.post(
          `${MEDIA_URL}/uploadLecture`,
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setuploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );
        if (response.data.success) {
          setuploadVideoInfo({
            videoUrl: response.data.data.url,
            publicId: response.data.data.public_id,
          });
          setbtnDisable(false);
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Video upload failed.");
      } finally {
        setmediaProgress(false);
      }
    }
  };

  // Handle Lecture Edit
  const handleEditLecture = async () => {
    if (!lectureTitle) {
      toast.error("Lecture title is required.");
      return;
    }
    if (!uploadVideoInfo?.videoUrl) {
      toast.error("Video URL is required.");
      return;
    }
    await editLecture({
      lectureTitle,
      isPreviewFree,
      uploadVideoInfo,
      courseId,
      lectureId,
    });
  };

  // Handle Lecture Removal
  const handleRemoveLecture = async () => {
    await removeLecture(lectureId);
  };

  // Load Existing Lecture Data
  useEffect(() => {
    if (getLectureSuccess && getLectureData) {
      setlectureTitle(getLectureData.lecture?.lectureTitle || "");
      setisPreviewFree(getLectureData.lecture?.isPreviewFree || false);
      setuploadVideoInfo({
        videoUrl: getLectureData.lecture?.videoUrl || "",
        publicId: getLectureData.lecture?.publicId || "",
      });
    }
  }, [getLectureSuccess, getLectureData]);

  // Handle Edit Success/Error
  useEffect(() => {
    if (editSuccess) {
      toast.success(editData.message);
      setlectureTitle("");
      setisPreviewFree(false);
      setuploadVideoInfo(null);
      navigate(`/admin/cources/editcource/addlecture/${courseId}`);
    }
    if (editError) {
      toast.error(editError.data.message);
    }
  }, [editSuccess, editError]);

  // Handle Remove Success
  useEffect(() => {
    if (removeLectureSuccess) {
      toast.success(removeLectureData.message);
    }
  }, [removeLectureSuccess]);

  return (
    <div>
      <div className="flex items-center">
        <IoArrowBackCircleOutline
          className="text-2xl"
          onClick={() =>
            navigate(`/admin/cources/editcource/addlecture/${courseId}`)
          }
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Update Your Lecture
        </h1>
      </div>
      <form className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl text-gray-800">Edit Lecture</h3>
            <p className="text-gray-600">
              Make changes and click save when done.
            </p>
          </div>
          <Button
            onClick={handleRemoveLecture}
            disabled={removeLectureLoading}
            className="bg-red-700 text-white hover:bg-red-600"
          >
            {removeLectureLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Please wait</span>
              </div>
            ) : (
              "Remove Lecture"
            )}
          </Button>
          <div className="space-y-2">
            <div>
              <label htmlFor="lecturetitle" className="block text-gray-700">
                Lecture Title :
              </label>
              <input
                value={lectureTitle || ""}
                onChange={(e) => setlectureTitle(e.target.value)}
                type="text"
                id="lecturetitle"
                placeholder="Enter your lecture title"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div>
              <label htmlFor="videourl" className="block text-gray-700">
                Video URL :
              </label>
              <input
                type="file"
                name="file"
                accept="video/*"
                onChange={FileChangeHandler}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-300"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={isPreviewFree}
                onCheckedChange={setisPreviewFree}
              />
              <Label htmlFor="airplane-mode">Is this video free?</Label>
            </div>
          </div>
          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )}
          <div>
            <Button
              onClick={handleEditLecture}
              disabled={editLoading}
              className="w-1/2 bg-gray-600 hover:bg-gray-700"
            >
              {editLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditLecture;
