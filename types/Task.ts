export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  priority: Priority;
  createdAt: Date;
  completedAt?: Date;
}

export type Priority = "high" | "medium" | "low";

export interface TaskState {
  tasks: Task[];
  filter: "all" | "active" | "completed";
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TaskInputProps {
  onAddTask: (title: string, priority: Priority) => void;
}
