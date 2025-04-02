import { usePurchaseStatusQuery } from "@/feautures/AppApis/TransactionApi";
import { useParams, Navigate } from "react-router-dom";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = usePurchaseStatusQuery(courseId);
  if (isLoading) return <p>Loading...</p>;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/coursedetailpage/${courseId}`} />
  );
};
export default PurchaseCourseProtectedRoute;
