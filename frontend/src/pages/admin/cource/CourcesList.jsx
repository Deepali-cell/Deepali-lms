import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  useGetAllCourceQuery,
  useDeleteCourceMutation,
} from "@/feautures/AppApis/CourceApi";

function CourcesList() {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetAllCourceQuery();
  const getallcource = Array.isArray(data?.getallcource)
    ? data.getallcource
    : [];

  const [deleteCource, { isLoading: isDeleting }] = useDeleteCourceMutation();

  const handleDeleteCource = async (courseId) => {
    try {
      const response = await deleteCource({ courseId }).unwrap();
      if (response.success) {
        alert("Course deleted successfully!");
        refetch();
      } else {
        alert("Failed to delete the course. Try again!");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("An error occurred while deleting the course.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full px-4 lg:px-0">
      {/* Create Button */}
      <div>
        <Button onClick={() => navigate("addcources")}>
          Create New Course
        </Button>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="table-auto border-collapse w-full min-w-[700px]">
          <caption className="text-left text-lg font-semibold mb-4">
            A list of all courses.
          </caption>

          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 w-[120px]">Price</th>
              <th className="border px-4 py-2 w-[200px]">Status</th>
              <th className="border px-4 py-2 w-[200px]">Title</th>
              <th className="border px-4 py-2 text-right w-[250px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {getallcource.map((cource) => (
              <tr key={cource._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-medium">
                  {cource?.coursePrice || "NA"}
                </td>
                <td className="border px-4 py-2">
                  {cource.published ? "Published" : "Draft"}
                </td>
                <td className="border px-4 py-2 truncate">
                  {cource?.courseTitle}
                </td>

                <td className="border px-4 py-2 text-right">
                  <div className="flex justify-end gap-2 flex-wrap">
                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteCource(cource._id)}
                      disabled={isDeleting}
                      className="flex items-center gap-2"
                    >
                      <MdDelete size={16} />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>

                    {/* Edit Button */}
                    <Button
                      onClick={() => navigate(`editcource/${cource._id}`)}
                      className="flex items-center gap-2"
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
