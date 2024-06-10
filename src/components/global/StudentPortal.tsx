import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { List } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { toast } from "sonner";

const StudentPortal: React.FC = () => {
  const enrolledCourses = useSelector(
    (state: RootState) => state.enrolledCourses.enrolledCourses
  );
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);

  console.log("Enrolled", enrolledCourses);

  const handleCourseComplete = (courseId: number) => {
    if (completedCourses.includes(courseId)) {
      setCompletedCourses(completedCourses.filter((id) => id !== courseId));
      toast("Course marked as incomplete!");
    } else {
      setCompletedCourses([...completedCourses, courseId]);
      toast("Course marked as completed");
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-900 text-white py-6 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Student Portal</h1>
          <div className="flex">
            <div className="flex items-center gap-4">
              <HoverCard>
                <Avatar className="w-8 h-8">
                  <HoverCardTrigger asChild>
                    <img
                      src="https://github.com/shadcn.png"
                      alt="User Avatar"
                    />
                  </HoverCardTrigger>
                  <AvatarFallback>JD</AvatarFallback>
                  <HoverCardContent className="w-28">
                    <div className="flex">
                      <div className="space-y-1 text-center mx-auto flex flex-col">
                        <h4 className="text-sm font-semibold underline">
                          Joe Doe
                        </h4>
                        <p className="text-sm">Student</p>
                      </div>
                    </div>
                  </HoverCardContent>
                </Avatar>
              </HoverCard>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-100 dark:bg-gray-950 p-6 md:p-8 lg:p-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">My Courses</h1>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button size="sm">
                  <List className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </Link>
            </div>
          </div>
          {enrolledCourses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={course.url}
                      alt="image"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                      {course.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {course.courseName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {course.instructor}
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4">
                        <div
                          className={`bg-primary rounded-full h-4 transition-all duration-300 ${
                            completedCourses.includes(course.id)
                              ? "w-full"
                              : "w-0"
                          }`}
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {" "}
                        <span className="ml-2 text-sm font-medium">
                          {completedCourses.includes(course.id) ? "100%" : "0%"}
                        </span>
                      </span>
                    </div>

                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => handleCourseComplete(course.id)}
                    >
                      {completedCourses.includes(course.id)
                        ? "Mark as Incomplete"
                        : "Mark as Completed"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-10 text-gray-900">
              <p className="text-xl font-bold">
                You have not enrolled in any courses yet.
              </p>
              <p className="mt-2">
                Explore{" "}
                <a href="/" className="underline">
                  Course List
                </a>{" "}
                and enroll in courses to get started.
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-900 mt-10 text-white px-4 lg:px-6 py-4 flex items-center justify-between">
        <p className="text-sm">© 2024 Learning Portal</p>
        <div className="flex items-center gap-4">
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
};

export default StudentPortal;
