import { Link, useNavigate, useParams } from "react-router-dom";
import CourceDetailEdit from "./CourceDetailEdit";

function EditCource() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <div className="w-full px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white text-center md:text-left">
          Add detailed information regarding courses
        </h1>

        <button
          className="underline text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400 text-sm md:text-base"
          onClick={() =>
            navigate(`/admin/cources/editcource/addlecture/${courseId}`)
          }
        >
          Go to the Lectures Edit Page
        </button>
      </div>

      {/* Form Section */}
      <div className="mt-6">
        <CourceDetailEdit />
      </div>
    </div>
  );
}

export default EditCource;
