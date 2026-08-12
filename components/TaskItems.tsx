import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Priority, TaskItemProps } from "../types/Task";

const priorityColors: Record<Priority, string> = {
  high: "red",
  medium: "orange",
  low: "green",
};

const priorityLabel: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <View style={[styles.container, task.isCompleted && styles.completed]}>
      {/* Priority Indicator */}
      <View
        style={[
          styles.priorityIndicator,
          { backgroundColor: priorityColors[task.priority] },
        ]}
      />

      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, task.isCompleted && styles.checkboxDone]}
        onPress={() => onToggle(task.id)}
      >
        {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Task Content */}
      <View style={styles.content}>
        <Text style={[styles.title, task.isCompleted && styles.titleDone]}>
          {task.title}
        </Text>
        <View style={styles.metaRow}>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityColors[task.priority] + "20" },
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                { color: priorityColors[task.priority] },
              ]}
            >
              {priorityLabel[task.priority]}
            </Text>
          </View>
          <Text style={styles.date}>
            {task.createdAt.toLocaleDateString("id-ID")}
          </Text>
        </View>
      </View>

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  completed: {
    backgroundColor: "#F1F5F9",
    opacity: 0.8,
  },
  priorityIndicator: {
    width: 4,
    height: "100%" as unknown as number,
    borderRadius: 2,
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#F8FAFC",
  },
  checkboxDone: {
    backgroundColor: "#1A56DB",
    borderColor: "#1A56DB",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 4,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
  },
  date: {
    fontSize: 11,
    color: "#94A3B8",
  },
  deleteBtn: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
  },
});