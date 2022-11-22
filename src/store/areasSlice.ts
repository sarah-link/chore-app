import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { AreasState, RenameAreaDetails } from "../models/areaModels";
import {
  CompleteTaskDetails,
  DeleteTaskDetails,
  EditTaskDetails,
  NewTaskDetails,
} from "../models/taskModels";

export enum cycleOptions {
  Days,
  Weeks,
  Months,
  Years,
}

export const getLengthInDays = (cycleOption: cycleOptions, num: string) => {
  switch (cycleOption) {
    case cycleOptions.Years:
      return parseInt(num) * 365;
    case cycleOptions.Months:
      return parseInt(num) * 30;
    case cycleOptions.Weeks:
      return parseInt(num) * 7;
    default:
      return parseInt(num);
  }
};

export const areasSlice = createSlice({
  name: "areasState",
  initialState: {
    areas: [
      {
        id: uuid.v4(),
        name: "Learning",
        tasks: [
          {
            id: uuid.v4(),
            name: "Create a new task",
            lastDone: 1667278800,
            cycleLengthDays: 7,
          },
        ],
      },
    ],
  } as AreasState,
  reducers: {
    addArea: (state, action) => {
      state.areas.push({
        id: uuid.v4() as string,
        name: action.payload,
        tasks: [],
      });
    },
    deleteArea: (state, action) => {
      state.areas = state.areas.filter((area) => area.id !== action.payload);
    },
    editAreaName: (state, action: PayloadAction<RenameAreaDetails>) => {
      let area = state.areas.find((area) => area.id === action.payload.id);
      if (area) {
        area.name = action.payload.newName;
      }
    },
    addTaskToArea: (state, action: PayloadAction<NewTaskDetails>) => {
      let p = action.payload;
      let area = state.areas.find((area) => area.id === p.areaId);
      area?.tasks.push({
        id: uuid.v4() as string,
        name: p.taskName,
        lastDone: p.lastDone,
        cycleLengthDays: p.cycleLengthDays,
      });
    },
    completeTask: (state, action: PayloadAction<CompleteTaskDetails>) => {
      let p = action.payload;
      let task = state.areas
        .find((area) => area.id === p.areaId)
        ?.tasks.find((task) => task.id === p.taskId);
      if (task) {
        task.lastDone = p.lastDone;
      }
    },
    editTask: (state, action: PayloadAction<EditTaskDetails>) => {
      let p = action.payload;
      let task = state.areas
        .find((area) => area.id === p.areaId)
        ?.tasks.find((task) => task.id === p.taskId);
      if (task) {
        task.name = p.newName;
        task.cycleLengthDays = p.cycleLengthDays;
      }
    },
    deleteTask: (state, action: PayloadAction<DeleteTaskDetails>) => {
      let area = state.areas.find((area) => area.id === action.payload.areaId);
      if (area) {
        area.tasks = area.tasks.filter(
          (task) => task.id !== action.payload.taskId
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addArea,
  deleteArea,
  completeTask,
  addTaskToArea,
  editAreaName,
  editTask,
  deleteTask,
} = areasSlice.actions;

export default areasSlice.reducer;
