import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./slice/courses";
import enrolledCoursesSlice from "./slice/enroll";

export const store = configureStore({
  reducer: {
    courses: coursesSlice,
    enrolledCourses: enrolledCoursesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
