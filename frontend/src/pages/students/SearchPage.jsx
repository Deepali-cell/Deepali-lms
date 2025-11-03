import {
  useGetCourseByCategoryMutation,
  useSearchCoursesByNameQuery,
} from "@/feautures/AppApis/CourceApi";
import { useEffect, useState } from "react";
import Cource from "./Cource";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const params = useParams();
  const name = decodeURIComponent(params.searchQuery || "");

  const [category, setCategory] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [
    getCourseByCategory,
    { isLoading: isCategoryLoading, error: categoryError },
  ] = useGetCourseByCategoryMutation();

  const {
    data: searchData = [],
    isSuccess: searchSuccess,
    error: searchError,
    isFetching: isSearchLoading,
  } = useSearchCoursesByNameQuery(name);

  const categories = [
    "Frontend development",
    "Backend development",
    "Mernstack development",
    "Fullstack development",
    "Python",
    "Javascript",
    "MongoDb",
    "Docker",
    "Data science",
    "HTML",
  ];

  const handleCategoryChange = async (category) => {
    setCategory(category);
    if (category) {
      try {
        const response = await getCourseByCategory({ category }).unwrap();
        setFilteredCourses(response.result || []);
      } catch {
        setFilteredCourses([]);
      }
    } else {
      setFilteredCourses([]);
    }
  };

  useEffect(() => {
    if (!category && searchSuccess) {
      setFilteredCourses(searchData.courses || []);
    }
  }, [searchSuccess, searchError, category, name]);

  const showCategoryError = categoryError && filteredCourses.length === 0;
  const showNoCoursesFoundByName =
    !isSearchLoading &&
    searchSuccess &&
    searchData.courses.length === 0 &&
    !category;
  const showNoCoursesFoundByCategory =
    !isCategoryLoading && category && filteredCourses.length === 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 max-w-7xl mx-auto">
        {/* ✅ LEFT SIDEBAR */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Categories</h2>

          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ RIGHT CONTENT */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Search Results</h1>
            <p className="text-gray-500">
              {category ? (
                <>
                  Showing results for{" "}
                  <span className="font-semibold">{category}</span>
                </>
              ) : (
                `Showing results for name: "${name}"`
              )}
            </p>
          </div>

          {/* ✅ ERROR HANDLING */}
          {showCategoryError && (
            <p className="text-red-500 mb-4">
              Failed to fetch courses by category. Please try again.
            </p>
          )}

          {showNoCoursesFoundByName && (
            <p className="text-gray-500 mb-4">
              No courses found by name: {name}.
            </p>
          )}

          {showNoCoursesFoundByCategory && (
            <p className="text-gray-500 mb-4">
              No courses found for the selected category: {category}.
            </p>
          )}

          {/* ✅ COURSES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {(isCategoryLoading || isSearchLoading) && (
              <p className="text-gray-500">Loading...</p>
            )}

            {!isCategoryLoading &&
              !isSearchLoading &&
              filteredCourses.length > 0 &&
              filteredCourses.map((course, index) => (
                <Cource key={index} course={course} />
              ))}

            {!isCategoryLoading &&
              !isSearchLoading &&
              filteredCourses.length === 0 &&
              !showNoCoursesFoundByName &&
              !showCategoryError &&
              !showNoCoursesFoundByCategory && (
                <p className="text-gray-500 col-span-full">
                  No courses found for the selected category.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
