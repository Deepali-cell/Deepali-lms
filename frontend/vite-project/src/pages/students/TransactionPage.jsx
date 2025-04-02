import { useState } from "react";
import { useCompleteTransactionMutation } from "@/feautures/AppApis/TransactionApi";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/feautures/AppApis/CourceApi";

function TransactionPage() {
  const navigate = useNavigate();
  const { paymentId, courseId } = useParams();
  const [completeTransaction, { isLoading }] = useCompleteTransactionMutation();
  const [status, setStatus] = useState("pending");
  const { data: getCourseData } = useGetCourseByIdQuery({ courseId });
  const course = getCourseData?.getCourse;
  const handleCompleteTransaction = async () => {
    try {
      const response = await completeTransaction(paymentId).unwrap();
      setStatus("completed");
      navigate("/mylearning");
      toast.success(response.message || "Transaction completed successfully!");
    } catch (error) {
      toast.error(error.data?.message || "Transaction failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-8">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center text-purple-700">
          {status === "completed"
            ? "Payment Successful"
            : "Complete Your Purchase"}
        </h2>

        <div className="space-y-6">
          {/* Course and Payment Info */}
          <div className="flex flex-col space-y-2">
            <p className="text-lg text-gray-700">
              Course:{" "}
              <strong className="text-purple-700">{course.courseTitle}</strong>
            </p>
            <p className="text-lg text-gray-700">
              Amount:{" "}
              <strong className="text-purple-700">{course.coursePrice}</strong>
            </p>
          </div>

          {/* Payment Progress Section */}
          <div className="space-y-4">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 ${
                  status === "completed" ? "bg-green-500" : "bg-yellow-500"
                } rounded-full`}
                style={{ width: status === "completed" ? "100%" : "50%" }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Checkout</span>
              <span>Complete</span>
            </div>
          </div>

          {/* Action Button */}
          {status === "pending" ? (
            <Button
              className="bg-purple-700 text-white w-full py-2 rounded-md hover:bg-purple-800"
              onClick={handleCompleteTransaction}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
              ) : (
                "Complete Transaction"
              )}
            </Button>
          ) : (
            <Button
              className="bg-green-600 text-white w-full py-2 rounded-md"
              disabled
            >
              Transaction Completed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionPage;
