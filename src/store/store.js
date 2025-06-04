import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";

const ntdlStore = configureStore({
  reducer: {
    taskStore: taskReducer,
    // userStore: userReducer,
    // bookStore: bookReducer,
    // reviewStore: reviewReducer
  },
});

export default ntdlStore;
