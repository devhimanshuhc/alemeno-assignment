// coursesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Syllabus {
  title: string;
  topics: string[];
}

export interface Course {
  id: number;
  courseName: string;
  url: string;
  instructor: string;
  description: string;
  enrollmentStatus: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string;
  likes: string;
  syllabus: Syllabus[];
}

interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk("fetchCourses", async () => {
  const response = await axios.get(
    "https://devhimanshuhc.github.io/course_data/course_details.json"
  );
  return response.data;
});

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default coursesSlice.reducer;
