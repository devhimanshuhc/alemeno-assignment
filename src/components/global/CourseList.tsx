import { Input } from "@/components/ui/input";
import { HeartIcon, LayoutDashboard, Loader2, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../redux/slice/courses";
import { RootState, AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function CourseList() {
  const dispatch: AppDispatch = useDispatch();
  const { courses, loading } = useSelector((state: RootState) => state.courses);
  const [searchTerm, setSearchTerm] = useState(""); // Add this line

  console.log("Course", courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Courses</h1>
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative mb-4 md:mb-0 md:mr-5">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 rounded-md bg-gray-800 focus:outline-none border-none outline-none focus:border-none w-full md:w-auto"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="/students">
              <Button
                variant="secondary"
                className="rounded-3xl w-full md:w-auto"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <h1 className="text-2xl my-5 mx-10 font-bold text-center md:text-left">
          List of Available Courses
        </h1>
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.courseName}
                to={`/course-details/${course.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <img
                    src={course.url}
                    alt="Course Image"
                    width={300}
                    height={200}
                    className="rounded-t-lg w-full h-48 object-cover"
                  />

                  <div className="mt-4">
                    <div className="flex flex-row justify-between">
                      <h3 className="text-xl font-bold">{course.courseName}</h3>
                      <p className="text-sm flex items-center">
                        <HeartIcon className="h-5 w-5 mr-2 " />
                        {course.likes}
                      </p>
                    </div>
                    <p className="text-gray-500 mt-2">{course.instructor}</p>
                    <p className="text-gray-700 mt-2">{course.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-xl font-bold text-center">
            <img
              src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg?w=740&t=st=1717937223~exp=1717937823~hmac=c7184aa2f3564ca810ba7b1a4a1c86cfcac113dfae9ffda5b8e9a49a4cd4d67a"
              width={250}
              height={250}
              className="mx-auto"
              alt=""
            />
            Sorry, "{searchTerm}" not found
          </div>
        )}
      </div>
      <footer className="bg-gray-900 text-white px-4 lg:px-6 py-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">© 2024 Learning Portal</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a href="#" className="text-sm hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-sm hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-sm hover:underline">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
