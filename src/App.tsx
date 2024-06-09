import "../app/globals.css";
import { Routes, Route } from "react-router-dom";
import CourseDetails from "./components/global/CourseDetails";
import CourseList from "./components/global/CourseList";
import StudentPortal from "./components/global/StudentPortal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/course-details/:courseId" element={<CourseDetails />} />
        <Route path="/students" element={<StudentPortal />} />
      </Routes>
    </>
  );
}

export default App;
