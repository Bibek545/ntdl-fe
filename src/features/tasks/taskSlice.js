import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [
    {
      // _id: "6812d32eb3c10b352ba2b2a3",
      // task: "TEST",
      // hour: 2,
      // type: "good",
      // __v: 0,
    },
  ],

  badHour: 0,
  totalHour: 0,
};

const taskSLice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskList: (prevState, action) => {
      prevState.taskList = action.payload;
    },

    addTask: (prevState, action) => {
      prevState.taskList.push(action.payload);
    },
    setBadHour: (prevState, action)=>{
      prevState.badHour = action.payload;
    },
    setTotalHour: (prevState, action)=> {
      prevState.totalHour = action.payload;
    }
  },
});

const { reducer, actions } = taskSLice;
export const { setTaskList, addTask, setBadHour, setTotalHour } = actions;
export default reducer;
