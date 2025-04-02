import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useGetAllCourceQuery,
  useDeleteCourceMutation,
} from "@/feautures/AppApis/CourceApi";

function CourcesList() {
  const navigate = useNavigate();

  // Fetch courses
  const { data, isLoading, refetch } = useGetAllCourceQuery();
  const getallcource = Array.isArray(data?.getallcource)
    ? data.getallcource
    : [];

  // Mutation for deleting a course
  const [deleteCource, { isLoading: isDeleting }] = useDeleteCourceMutation();

  // Handle delete operation
  const handleDeleteCource = async (courseId) => {
    try {
      // Trigger the delete mutation
      const response = await deleteCource({ courseId }).unwrap();
      console.log("Delete response:", response);

      if (response.success) {
        // Optionally show a success message
        alert("Course deleted successfully!");
        // Refetch the list of courses to reflect changes
        refetch();
      } else {
        // Handle error response
        alert("Failed to delete the course. Try again!");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("An error occurred while deleting the course.");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Button onClick={() => navigate("addcources")}>
          Create New Course
        </Button>
      </div>
      <div className="w-full">
        <table className="table-auto border-collapse w-full">
          <caption className="text-left text-lg font-semibold mb-4">
            A list of all courses.
          </caption>
          <thead>
            <tr>
              <th className="border px-4 py-2 w-[120px]">Price</th>
              <th className="border px-4 py-2 w-[200px]">Status</th>
              <th className="border px-4 py-2 w-[200px]">Title</th>
              <th className="border px-4 py-2 w-[300px] text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {getallcource.map((cource) => (
              <tr key={cource._id}>
                <td className="border px-4 py-2 font-medium">
                  {cource?.coursePrice || "NA"}
                </td>
                <td className="border px-4 py-2">
                  {cource.published ? "Published" : "Draft"}
                </td>
                <td className="border px-4 py-2">{cource?.courseTitle}</td>
                <td className="border px-4 py-2 w-[300px] text-right">
                  <div className="flex justify-end gap-2">
                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteCource(cource._id)}
                      disabled={isDeleting}
                    >
                      <MdDelete size={16} />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                    {/* Edit Button */}
                    <Button
                      onClick={() => navigate(`editcource/${cource._id}`)}
                    >
                      <MdEdit size={16} />
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourcesList;
