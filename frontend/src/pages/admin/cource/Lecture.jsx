import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index, key }) => {
  const navigate = useNavigate();
  const lectureId = lecture._id;
  const handleEditLecture = async () => {
    navigate(
      `/admin/cources/editcource/addlecture/${courseId}/editlecture/${lectureId}`
    );
  };
  return (
    <>
      <div className="p-4 border border-gray-300 rounded-lg flex justify-between items-center">
        <h3 className="text-gray-800 font-medium">
          <span className="pr-4">{index + 1})</span>

          {lecture.lectureTitle}
        </h3>
        <button
          onClick={handleEditLecture}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <Edit className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </>
  );
};

export default Lecture;
