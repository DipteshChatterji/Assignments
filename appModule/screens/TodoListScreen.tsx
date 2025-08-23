import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import ResponsiveContainer from '../component/commonComponents/Container';
import AnimatedTodoItem from '../component/AnimatedTodoItem';
import { styles } from '../styles/todoScreenStyles';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoListScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newTask.trim(), completed: false },
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimatedTodoItem
            text={item.text}
            completed={item.completed}
            onToggle={() => toggleTask(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </ResponsiveContainer>
  );
};



export default TodoListScreen;
