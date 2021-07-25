import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string) {
    const isTaskDuplicated = tasks.find((task) => task.title === title);

    if (isTaskDuplicated) {
      Alert.alert("Você não pode cadastrar uma task com o mesmo nome");
      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      title,
      done: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Tem certeza que você deseja remover esse item?", undefined, [
      { text: "Não" },
      {
        text: "Sim",
        onPress: () =>
          setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id)),
      },
    ]);
  }

  function handleEditTask(taskId: number, newTitle: string) {
    setTasks((oldTasks) =>
      oldTasks.map((task) => {
        if (task.id === taskId) {
          task.title = newTitle;
        }

        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
