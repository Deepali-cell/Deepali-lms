import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useEditCourceMutation,
  useGetCourseByIdQuery,
  useTogglePublishMutation,
} from "@/feautures/AppApis/CourceApi";

function CourseDetailEdit() {
  const params = useParams();
  const courseId = params.courseId;

  const [courseDetail, setCourseDetail] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const navigate = useNavigate();

  const {
    data: getCourseData,
    isLoading: getCouseLoading,
    refetch: getCourseRefetch,
  } = useGetCourseByIdQuery({ courseId });

  const [togglePublish] = useTogglePublishMutation();

  const [editCourse, { data, isLoading, error, isSuccess }] =
    useEditCourceMutation();

  const course = getCourseData?.getCourse;

  useEffect(() => {
    if (course) {
      setCourseDetail({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: course.courseThumbnail,
      });
      setPreviewThumbnail(course.courseThumbnail);
    }
  }, [course]);

  const changeThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseDetail((prev) => ({ ...prev, courseThumbnail: file }));
        setPreviewThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSelectCategory = (value) => {
    setCourseDetail((prev) => ({ ...prev, category: value }));
  };

  const onSelectLevel = (value) => {
    setCourseDetail((prev) => ({ ...prev, courseLevel: value }));
  };

  const handlePublishedClick = async (query) => {
    try {
      const response = await togglePublish({ courseId, query });
      if (response) {
        getCourseRefetch();
        toast.success(response.data.message);
      } else {
        toast.error("Failed to publish course");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseTitle", courseDetail.courseTitle);
    formData.append("subTitle", courseDetail.subTitle);
    formData.append("description", courseDetail.description);
    formData.append("category", courseDetail.category);
    formData.append("courseLevel", courseDetail.courseLevel);
    formData.append("coursePrice", courseDetail.coursePrice);
    if (courseDetail.courseThumbnail) {
      formData.append("courseThumbnail", courseDetail.courseThumbnail);
    }
    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
      navigate("/admin/cources");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full flex justify-center px-4 md:px-0">
      <div className="bg-gray-100 shadow-xl rounded-lg p-6 md:p-10 w-full max-w-3xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Basic Course Information
          </h1>

          <Button
            disabled={course?.lectures.length === 0}
            onClick={() =>
              handlePublishedClick(course?.published ? "false" : "true")
            }
          >
            {course?.published ? "Unpublish" : "Publish"}
          </Button>
        </div>

        <p className="text-gray-600 mt-4 mb-8">
          Make changes to your course here. Click save after you are done.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title :</label>
            <input
              value={courseDetail.courseTitle}
              onChange={(e) =>
                setCourseDetail((prev) => ({
                  ...prev,
                  courseTitle: e.target.value,
                }))
              }
              type="text"
              className="w-full border border-gray-300 dark:text-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Course title"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle :</label>
            <input
              value={courseDetail.subTitle}
              onChange={(e) =>
                setCourseDetail((prev) => ({
                  ...prev,
                  subTitle: e.target.value,
                }))
              }
              type="text"
              className="w-full border border-gray-300 dark:text-black rounded-lg px-4 py-2"
              placeholder="Course subtitle"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description :
            </label>
            <textarea
              value={courseDetail.description}
              onChange={(e) =>
                setCourseDetail((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full border border-gray-300 dark:text-black rounded-lg px-4 py-2 h-24 resize-none"
              placeholder="Write course description..."
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Price :</label>
            <input
              value={courseDetail.coursePrice}
              onChange={(e) =>
                setCourseDetail((prev) => ({
                  ...prev,
                  coursePrice: e.target.value,
                }))
              }
              type="number"
              className="w-full border border-gray-300 dark:text-black rounded-lg px-4 py-2"
              placeholder="Course price"
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4">
            <label className="block text-sm font-medium mb-2">
              Thumbnail :
            </label>

            <div className="md:col-span-3">
              <Input
                type="file"
                className="dark:text-black"
                onChange={changeThumbnail}
              />

              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="thumbnail"
                  className="mt-4 rounded-lg w-full max-h-48 object-cover shadow"
                />
              )}
            </div>
          </div>

          {/* Category + Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category :
              </label>
              <Select
                value={courseDetail.category}
                onValueChange={onSelectCategory}
              >
                <SelectTrigger className="w-full dark:text-black">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="next.js">Next.js</SelectItem>
                    <SelectItem value="frontend development">
                      Frontend
                    </SelectItem>
                    <SelectItem value="backend development">Backend</SelectItem>
                    <SelectItem value="mernstack development">
                      MERN Stack
                    </SelectItem>
                    <SelectItem value="fullstack development">
                      Full Stack
                    </SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="mongoDb">MongoDB</SelectItem>
                    <SelectItem value="docker">Docker</SelectItem>
                    <SelectItem value="data science">Data Science</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium mb-2">Level :</label>
              <Select
                value={courseDetail.courseLevel}
                onValueChange={onSelectLevel}
              >
                <SelectTrigger className="w-full dark:text-black">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() => navigate("/admin/cources")}
            >
              Back
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseDetailEdit;
