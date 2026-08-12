import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Priority, TaskInputProps } from "../types/Task";

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleAdd = () => {
    if (!title.trim() || title.trim().length < 3) {
      Alert.alert("Title must be at least 3 characters long");
      return;
    }
    onAddTask(title, priority);
    setTitle("");
  };

  const priorities: Priority[] = ["high", "medium", "low"];

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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {priorities.map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.priorityBtn,
              { borderColor: priorityColors[p] },
              priority === p && { backgroundColor: priorityColors[p] + "20" },
            ]}
            onPress={() => setPriority(p)}
          >
            <Text style={[styles.priorityText, { color: priorityColors[p] }]}>
              {priorityLabel[p]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addBtnText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#F8FAFC",
  },
  priorityRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  priorityBtn: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  priorityText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  addBtn: {
    backgroundColor: "#1A56DB",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  addBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});