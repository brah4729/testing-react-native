import { useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, Priority, TaskState } from "../types/Task";

const STORAGE_KEY = "@TaskManager:tasks";

export const useTasks = () => {
  const [state, setState] = useState<TaskState>({
    tasks: [],
    filter: "all",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from storage when app first opens
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedTasks) {
          const parsedTasks: Task[] = JSON.parse(savedTasks).map(
            (task: Task) => ({
              ...task,
              createdAt: new Date(task.createdAt),
              completedAt: task.completedAt
                ? new Date(task.completedAt)
                : undefined,
            })
          );
          setState((prev) => ({ ...prev, tasks: parsedTasks }));
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  // Save to storage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks)).catch(
        (err) => console.error("Failed to save tasks:", err)
      );
    }
  }, [state.tasks, isLoading]);

  const addTask = useCallback((title: string, priority: Priority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      isCompleted: false,
      priority,
      createdAt: new Date(),
    };
    setState((prevState) => ({
      ...prevState,
      tasks: [newTask, ...prevState.tasks],
    }));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              completedAt: !task.isCompleted ? new Date() : undefined,
            }
          : task
      ),
    }));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }, []);

  const setFilter = useCallback(
    (filter: "all" | "active" | "completed") => {
      setState((prevState) => ({ ...prevState, filter }));
    },
    []
  );

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === "all") return true;
    if (state.filter === "active") return !task.isCompleted;
    if (state.filter === "completed") return task.isCompleted;
    return true;
  });

  return {
    filteredTasks,
    addTask,
    toggleTask,
    deleteTask,
    setFilter,
    isLoading,
  };
};