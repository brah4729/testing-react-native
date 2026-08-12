import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Task } from "../types/Task";
interface StatsPanelProps {
  tasks: Task[];
}
export const StatsPanel: React.FC<StatsPanelProps> = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.isCompleted).length,
    high: tasks.filter((t) => t.priority === "high" && !t.isCompleted).length,
    progress:
      tasks.length > 0
        ? Math.round(
            (tasks.filter((t) => t.isCompleted).length / tasks.length) * 100,
          )
        : 0,
  };
  return (
    <View style={styles.container}>
      {" "}
      <View style={styles.statItem}>
        {" "}
        <Text style={styles.value}>{stats.total}</Text>{" "}
        <Text style={styles.label}>Total</Text>{" "}
      </View>{" "}
      <View style={styles.statItem}>
        {" "}
        <Text style={[styles.value, { color: "#16A34A" }]}>
          {stats.completed}
        </Text>{" "}
        <Text style={styles.label}>Selesai</Text>{" "}
      </View>{" "}
      <View style={styles.statItem}>
        {" "}
        <Text style={[styles.value, { color: "#DC2626" }]}>
          {stats.high}
        </Text>{" "}
        <Text style={styles.label}>Prioritas Tinggi</Text>{" "}
      </View>{" "}
      <View style={styles.statItem}>
        {" "}
        <Text style={[styles.value, { color: "#1A56DB" }]}>
          {stats.progress}%
        </Text>{" "}
        <Text style={styles.label}>Progress</Text>{" "}
      </View>{" "}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: { flex: 1, alignItems: "center" },
  value: { fontSize: 22, fontWeight: "bold", color: "#1E293B" },
  label: { fontSize: 11, color: "#94A3B8", marginTop: 2, textAlign: "center" },
});
