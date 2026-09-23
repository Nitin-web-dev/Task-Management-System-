import { create } from "zustand";
import { getAllTaskApi, createTaskApi } from "../api/taskApi";


export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const tasks = await getAllTaskApi();

      set({
        loading: false,
        tasks: tasks.data
      });




    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
    addTasks: async (data) => {
    try {
     
      const tasks = await createTaskApi(data);

        set((state) => ({
            tasks: [tasks.data, ...state.tasks]
        }))



    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
  deleteTask: async (id) => {
    try {
        
    } catch (error) {
        set({
            error: error.message,
            loading : false,
        })
    }
  }
}));
