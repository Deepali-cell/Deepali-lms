import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllPurchaseCourseQuery } from "@/feautures/AppApis/TransactionApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const { data, isSuccess, isError, isLoading } =
    useGetAllPurchaseCourseQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased course</h1>;

  const { purchaseCourses } = data || [];

  const courseData = purchaseCourses.map((course) => ({
    name: course?.course?.courseTitle,
    price: course?.course?.coursePrice,
  }));

  const totalRevenue = purchaseCourses.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchaseCourses.length;

  return (
    <div className="min-h-screen grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-lg hover:shadow-xl transition">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
        </CardContent>
      </Card>

      {/* Full Width Chart */}
      <Card className="shadow-lg hover:shadow-xl transition col-span-1 sm:col-span-2 lg:col-span-4 h-[500px]">
        <CardHeader>
          <CardTitle>Course Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
