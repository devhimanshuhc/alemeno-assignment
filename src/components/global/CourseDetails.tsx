import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  List,
  Loader2,
  MapPinIcon,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { Course, fetchCourses } from "@/redux/slice/courses";
import { enrollCourse } from "@/redux/slice/enroll";
import { toast } from "sonner";

export default function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch, courseId]);

  const handleEnrollCourse = (course: Course) => {
    dispatch(enrollCourse(course));
    toast("Successfully Enrolled!");
  };

  const course = courses.find((c) => c.id === parseInt(courseId || ""));
  console.log("Coure Details", course);

  if (loading) {
    return (
      <Loader2 className="min-h-screen min-w-screen mx-auto h-10 w-10 flex justify-center items-center text-center" />
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen min-w-screen mx-auto text-xl flex justify-center items-center text-center">
        Course not found
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <header className="bg-gray-900 text-white py-6 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Course Details</h1>
          <div className="flex">
            <Link to="/">
              <Button variant="secondary" className="rounded-3xl">
                <List className="mr-2 h-4 w-4" /> Back to Course List
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 md:gap-12">
          <div className="grid gap-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {course.courseName}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 border">
                  <img src="https://github.com/shadcn.png" alt="Instructor" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium">{course.instructor}</div>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Enrollment: {course.enrollmentStatus}
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="grid gap-6">
              <div className="prose max-w-none">
                <p>{course.description}</p>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div className="text-sm font-medium">
                    Course Duration: {course.duration}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div className="text-sm font-medium">
                    Schedule: {course.schedule}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div className="text-sm font-medium">
                    Location: {course.location}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <div className="text-sm font-medium">
                    Pre-requisites: {course.prerequisites}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Syllabus</CardTitle>
                </CardHeader>
                <CardContent>
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full font-medium [&[data-state=open]>svg]:rotate-90">
                      <span>View Syllabus</span>
                      <ChevronRightIcon className="w-5 h-5 transition-transform" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="grid gap-4">
                        <div>
                          <h4 className="text-lg font-semibold">
                            {course.syllabus[0].title}
                          </h4>
                          <ul className="list-disc pl-6 text-sm text-gray-500 dark:text-gray-400">
                            <li> {course.syllabus[0]?.topics[0]}</li>
                            <li>{course.syllabus[0]?.topics[1]}</li>
                            <li>{course.syllabus[0]?.topics[2]}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">
                            {course.syllabus[1].title}
                          </h4>
                          <ul className="list-disc pl-6 text-sm text-gray-500 dark:text-gray-400">
                            <li>{course.syllabus[1]?.topics[0]}</li>
                            <li>{course.syllabus[1]?.topics[1]}</li>
                            <li>{course.syllabus[1]?.topics[2]}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">
                            {course.syllabus[2].title}
                          </h4>
                          <ul className="list-disc pl-6 text-sm text-gray-500 dark:text-gray-400">
                            <li>{course.syllabus[2]?.topics[0]}</li>
                            <li>{course.syllabus[2]?.topics[1]}</li>
                            <li>{course.syllabus[2]?.topics[2]}</li>
                          </ul>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
              <div className="grid gap-4">
                {course.enrollmentStatus === "Closed" ? (
                  <Button disabled size="lg">
                    Enrollment Closed
                  </Button>
                ) : (
                  <Button size="lg" onClick={() => handleEnrollCourse(course)}>
                    Enroll Now
                  </Button>
                )}
                <Link to="/students">
                  <Button size="lg">Check Your Courses</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
}
