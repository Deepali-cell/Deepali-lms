import { Link, useNavigate, useParams } from "react-router-dom";
import CourceDetailEdit from "./CourceDetailEdit";

function EditCource() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  return (
    <>
      <div>
        <div className="flex justify-center items-center gap-[300px]">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Add detail Information regarding cources
          </h1>
          <button
            className="underline"
            variant={"outline"}
            onClick={() =>
              navigate(`/admin/cources/editcource/addlecture/${courseId}`)
            }
          >
            {" "}
            Go to the Lectures edit Page ->
          </button>
        </div>
        <div>
          <CourceDetailEdit />
        </div>
      </div>
    </>
  );
}

export default EditCource;
