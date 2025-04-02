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
  const [isPublished, setisPublished] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [editCourse, { data, isLoading, error, isSuccess }] =
    useEditCourceMutation();
  const navigate = useNavigate();
  const {
    data: getCourseData,
    isLoading: getCouseLoading,
    error: getCourseError,
    isSuccess: getCourseSuccess,
    refetch: getCourseRefetch,
  } = useGetCourseByIdQuery({ courseId });
  const [togglePublish, {}] = useTogglePublishMutation();
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
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setCourseDetail((prev) => ({ ...prev, courseThumbnail: file }));
        setPreviewThumbnail(fileReader.result);
      };
      fileReader.readAsDataURL(file);
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
        toast.error("failed to publish or unpublish course");
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
      setCourseDetail({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: null,
      });
    }
    if (error) {
      const errorMessage =
        error?.data?.message || "Failed to update the course";
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

  return (
    <>
      <div>
        <div className="bg-gray-100 shadow-lg rounded-lg p-8 max-w-lg w-full">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-6 text-gray-800">
                Basic Course Information
              </h1>
            </div>
            <div>
              <Button
                disabled={course?.lectures.length === 0}
                onClick={() =>
                  handlePublishedClick(course?.published ? "false" : "true")
                }
              >
                {course?.published ? "UnPublished" : "Published"}
              </Button>
            </div>
          </div>
          <p className="text-gray-600 mb-8">
            Make changes to your course here. Click save after you are done.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title :
              </label>
              <input
                id="title"
                value={courseDetail.courseTitle}
                onChange={(e) =>
                  setCourseDetail((prev) => ({
                    ...prev,
                    courseTitle: e.target.value,
                  }))
                }
                type="text"
                placeholder="Your course Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="subtitle"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                SubTitle :
              </label>
              <input
                id="subtitle"
                type="text"
                value={courseDetail.subTitle}
                onChange={(e) =>
                  setCourseDetail((prev) => ({
                    ...prev,
                    subTitle: e.target.value,
                  }))
                }
                placeholder="Your subtitle"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description :
              </label>
              <input
                id="description"
                type="text"
                value={courseDetail.description}
                onChange={(e) =>
                  setCourseDetail((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Price :
              </label>
              <input
                id="price"
                type="text"
                value={courseDetail.coursePrice}
                onChange={(e) =>
                  setCourseDetail((prev) => ({
                    ...prev,
                    coursePrice: e.target.value,
                  }))
                }
                placeholder="Enter your course price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="courseThumbnail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Thumbnail :
              </label>
              <Input
                id="courseThumbnail"
                type="file"
                onChange={changeThumbnail}
              />
              {previewThumbnail && (
                <img
                  src={previewThumbnail}
                  alt="course thumbnail"
                  className="e-64 my-2"
                />
              )}
            </div>

            <div className="flex flex-row gap-2">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category :
                </label>
                <Select
                  value={courseDetail.category}
                  onValueChange={onSelectCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="next.js">Next.js</SelectItem>
                      <SelectItem value="frontend development">
                        Frontend development
                      </SelectItem>
                      <SelectItem value="backend development">
                        Backend development
                      </SelectItem>
                      <SelectItem value="mernstack development">
                        Mernstack development
                      </SelectItem>
                      <SelectItem value="fullstack development">
                        Fullstack development
                      </SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">Javascript</SelectItem>
                      <SelectItem value="mongoDb">MongoDb</SelectItem>
                      <SelectItem value="docker">Docker</SelectItem>
                      <SelectItem value="data science">Data science</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Level :
                </label>
                <Select
                  value={courseDetail.courseLevel}
                  onValueChange={onSelectLevel}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Level</SelectLabel>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <Button
                variant="outline"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => navigate("/admin/cources")}
              >
                Back
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CourseDetailEdit;
