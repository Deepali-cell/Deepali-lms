import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/Themeprovider";

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access theme from ThemeProvider

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/course/search/${searchQuery}`);
  };

  const handleExploreCourses = () => {
    navigate("/course/search/");
  };

  return (
    <div
      className={`py-20 px-8 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white"
          : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white"
      }`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find the Best Course for You
        </h1>
        <h4 className="text-lg md:text-xl font-medium mb-8">
          Discover, learn, and upskill with our wide range of courses.
        </h4>
        <div className="flex justify-center items-center gap-4 mb-6">
          <form
            onSubmit={handleSearch}
            className={`relative w-full max-w-lg mx-auto flex items-center rounded-md shadow-lg overflow-hidden border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600"
                : "bg-white/20 backdrop-blur-lg border-white/30"
            }`}
          >
            <input
              type="text"
              placeholder="Search courses..."
              className={`flex-grow py-3 px-6 outline-none placeholder-gray-300 ${
                theme === "dark"
                  ? "text-gray-200 bg-transparent"
                  : "text-white bg-transparent"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className={`py-3 px-6 font-bold rounded-md transition-transform transform hover:scale-105 ${
                theme === "dark"
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
              }`}
            >
              Search
            </button>
          </form>
        </div>
        <Button
          className={`px-6 py-3 font-bold rounded-full shadow-lg ${
            theme === "dark"
              ? "bg-gray-700 text-purple-400 hover:bg-gray-600"
              : "bg-white text-pink-600 hover:bg-gray-100"
          }`}
          onClick={handleExploreCourses}
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
