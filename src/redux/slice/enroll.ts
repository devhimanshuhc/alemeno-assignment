// redux/slice/enrolledCourses.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "./courses";

interface EnrolledCoursesState {
  enrolledCourses: Course[];
}

const initialState: EnrolledCoursesState = {
  enrolledCourses: [],
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<Course>) => {
      state.enrolledCourses.push(action.payload);
    },
  },
});

export const { enrollCourse } = enrolledCoursesSlice.actions;
export default enrolledCoursesSlice.reducer;
