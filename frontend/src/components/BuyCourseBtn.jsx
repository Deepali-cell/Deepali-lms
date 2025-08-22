import { useCreateCheckoutSessionMutation } from "@/feautures/AppApis/TransactionApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function BuyCourseBtn({ courseId }) {
  const navigate = useNavigate();
  const [createCheckoutSession, { data, isLoading, isSuccess, error }] =
    useCreateCheckoutSessionMutation();

  const handleBuyCourseBtn = async () => {
    if (!courseId) {
      toast.error("Course ID is missing!");
      return;
    }
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      const paymentId = data?.paymentId;
      if (paymentId) {
        setTimeout(() => {
          navigate(`/transactionpage/${paymentId}/course/${courseId}`);
          toast.success(data?.message || "Redirecting to transaction page...");
        }, 100); 
      }
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to initiate checkout.");
    }
  }, [isSuccess, error, data, navigate]);

  return (
    <>
      <Button
        className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 w-full"
        onClick={handleBuyCourseBtn}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Buy Course Now"}
      </Button>
    </>
  );
}

export default BuyCourseBtn;
