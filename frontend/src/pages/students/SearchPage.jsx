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

  // List of all available categories
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

  // Handle category selection
  const handleCategoryChange = async (category) => {
    setCategory(category);
    if (category) {
      try {
        const response = await getCourseByCategory({ category }).unwrap();
        setFilteredCourses(response.result || []);
      } catch {
        setFilteredCourses([]); // Clear courses if an error occurs
      }
    } else {
      setFilteredCourses([]);
    }
  };

  useEffect(() => {
    console.log("searchData:", searchData);
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
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar: Categories */}
      <div className="w-1/4 bg-white p-5 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center">
              <input
                type="radio"
                id={cat}
                value={cat}
                checked={category === cat}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={cat}
                className="ml-2 text-sm font-medium text-gray-700"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content: Search Results */}
      <div className="flex-1 p-5">
        <div className="mb-4">
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

        {/* Error or No Courses Messages */}
        {showCategoryError && (
          <p className="text-red-500">
            Failed to fetch courses by category. Please try again.
          </p>
        )}

        {showNoCoursesFoundByName && (
          <p className="text-gray-500">No courses found by name: {name}.</p>
        )}

        {showNoCoursesFoundByCategory && (
          <p className="text-gray-500">
            No courses found for the selected category: {category}.
          </p>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(isCategoryLoading || isSearchLoading) && <p>Loading...</p>}
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
              <p className="text-gray-500">
                No courses found for the selected category.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
