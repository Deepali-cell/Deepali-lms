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
import { useAddCourceMutation } from "@/feautures/AppApis/CourceApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCource = () => {
  const [courseTitle, setcourseTitle] = useState("");
  const [category, setcategory] = useState("");
  const navigate = useNavigate();
  const [
    addCource,
    {
      data: courceData,
      isLoading: courceLoading,
      error: courceError,
      isSuccess: courceSuccess,
    },
  ] = useAddCourceMutation();

  const onselectCategory = (value) => {
    setcategory(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCource({ courseTitle, category });
  };
  useEffect(() => {
    if (courceSuccess) {
      toast.success(courceData.message || "add cource successfully");
      setcourseTitle("");
      setcategory("");
      navigate("/admin/cources");
    }
  }, [courceSuccess, courceError]);
  return (
    <div className=" bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Let's add a course
        </h1>
        <p className="text-gray-600 mb-8">
          Add some basic details for your new course.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title:
            </label>
            <input
              value={courseTitle}
              onChange={(e) => setcourseTitle(e.target.value)}
              id="title"
              type="text"
              placeholder="Your course name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category:
            </label>
            <Select value={category} onValueChange={onselectCategory}>
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

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <Button
              variant="outline"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => navigate("/admin/cources")}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              disabled={courceLoading}
            >
              {courceLoading ? (
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
  );
};

export default AddCource;
