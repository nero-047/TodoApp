import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState(1);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterType, setFilterType] = useState('all'); // Default filter type to 'all'

  // Load tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.log('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.log('Error saving tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  useEffect(() => {
    handleFilter(filterType);
  }, [tasks, filterType]);

  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty!');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: task.trim(),
      completed: false,
      priority,
      dueDate: dueDate ? dueDate.toLocaleDateString() : null,
      isImportant: false,
    };
    setTasks([...tasks, newTask]);
    setTask('');
    setPriority(1);
    setDueDate(null);
    setModalVisible(false);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setBottomSheetVisible(false);
  };

  const toggleTaskImportance = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isImportant: !task.isImportant } : task
    );
    setTasks(updatedTasks);
    setBottomSheetVisible(false);
  };

  const toggleTaskDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setBottomSheetVisible(false);
  };

  const deleteAllCompletedTasks = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete all completed tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => setTasks(tasks.filter((task) => !task.completed)) },
      ]
    );
  };

  const handleFilter = (filterType) => {
    setFilterType(filterType);
    let filtered = [];
    switch (filterType) {
      case 'pending':
        filtered = tasks.filter((task) => !task.completed);
        break;
      case 'completed':
        filtered = tasks.filter((task) => task.completed);
        break;
      case 'important':
        filtered = tasks.filter((task) => task.isImportant);
        break;
      case 'dueDate':
        filtered = tasks.filter((task) => task.dueDate !== null);
        break;
      case 'all':
      default:
        filtered = tasks;
    }
    setFilteredTasks(filtered);
    setFilterVisible(false);
  };

  const openTaskOptions = (task) => {
    setTaskToEdit(task);
    setBottomSheetVisible(true);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => setFilterVisible(true)} style={styles.actionButton}>
          <Ionicons name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>To-Do</Text>
        </View>
        <TouchableOpacity onPress={deleteAllCompletedTasks} style={styles.actionButton}>
          <Ionicons name="trash-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filterType !== 'all' ? filteredTasks : tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onLongPress={() => openTaskOptions(item)}>
            <View style={styles.taskItem}>
              <View style={styles.taskname}>
                <Text style={styles.goldenStar}>{item.isImportant ? '⭐' : ''}</Text>
                <View style={styles.taskContent}>
                  <Text style={[styles.taskText, item.completed && styles.strikethrough]}>{item.text}</Text>
                  <Text style={styles.dueDate}>{item.dueDate ? `Due: ${item.dueDate}` : ''}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                <Text style={styles.checkBox}>{item.completed ? '✅' : '⬜'}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add some!</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Bottom Sheet for task options */}
      <Modal isVisible={isBottomSheetVisible} onBackdropPress={() => setBottomSheetVisible(false)} style={styles.bottomSheet}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={() => toggleTaskImportance(taskToEdit?.id)}>
            <Text style={styles.bottomSheetText}>{taskToEdit?.isImportant ? 'Unmark as Important' : 'Mark as Important'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleTaskCompletion(taskToEdit?.id)}>
            <Text style={styles.bottomSheetText}>
              {taskToEdit?.completed ? 'Mark as Unread' : 'Mark as Read'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleTaskDelete(taskToEdit?.id)}>
            <Text style={styles.bottomSheetText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Bottom Sheet for filter options */}
      <Modal isVisible={filterVisible} onBackdropPress={() => setFilterVisible(false)} style={styles.bottomSheet}>
        <View style={styles.bottomSheetContent}>
          <TouchableOpacity onPress={() => handleFilter('pending')}>
            <Text style={styles.bottomSheetText}>Pending Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('completed')}>
            <Text style={styles.bottomSheetText}>Completed Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('important')}>
            <Text style={styles.bottomSheetText}>Important Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('dueDate')}>
            <Text style={styles.bottomSheetText}>Due Date Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('all')}>
            <Text style={styles.bottomSheetText}>Show All Tasks</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for adding task */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.bottomSheet}
        avoidKeyboard // This makes the modal adjust automatically to keyboard presence
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.bottomSheetContent}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter a task"
            value={task}
            onChangeText={setTask}
          />
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Due Date: </Text>
            {!showDatePicker && (
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {dueDate ? dueDate.toLocaleDateString() : 'Select Due Date'}
                </Text>
              </TouchableOpacity>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={dueDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  setDueDate(selectedDate);
                }}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTask}
          >
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}