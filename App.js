import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
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
  // State variables
  const [task, setTask] = useState(''); // Task input state
  const [tasks, setTasks] = useState([]); // List of tasks
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility for adding task
  const [dueDate, setDueDate] = useState(null); // Due date for task
  const [priority, setPriority] = useState(1); // Priority of the task (default: 1)
  const [taskToEdit, setTaskToEdit] = useState(null); // Task to edit
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false); // Bottom sheet visibility for task options
  const [showDatePicker, setShowDatePicker] = useState(false); // Date picker visibility
  const [filterVisible, setFilterVisible] = useState(false); // Filter modal visibility
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered list of tasks based on selected filter
  const [filterType, setFilterType] = useState('all'); // Filter type (default: 'all')

  // Load tasks from AsyncStorage when the app is first loaded
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks'); // Fetch tasks from AsyncStorage
        if (storedTasks) setTasks(JSON.parse(storedTasks)); // Parse and set tasks
      } catch (error) {
        console.log('Error loading tasks:', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks list changes
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks in AsyncStorage
      } catch (error) {
        console.log('Error saving tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  // Filter tasks whenever tasks or filterType changes
  useEffect(() => {
    handleFilter(filterType); // Apply selected filter
  }, [tasks, filterType]);

  // Add a new task to the list
  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty!'); // Prevent adding empty tasks
      return;
    }
    const newTask = {
      id: Date.now().toString(), // Unique task ID based on timestamp
      text: task.trim(), // Task text
      completed: false, // Task completion status (default: false)
      priority, // Task priority
      dueDate: dueDate ? dueDate.toLocaleDateString() : null, // Task due date
      isImportant: false, // Task importance (default: false)
    };
    setTasks([...tasks, newTask]); // Add new task to the list
    setTask(''); // Reset task input
    setPriority(1); // Reset priority to default
    setDueDate(null); // Reset due date
    setModalVisible(false); // Close the add task modal
  };

  // Toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks); // Update tasks list
    setBottomSheetVisible(false); // Close bottom sheet
  };

  // Toggle the importance of a task
  const toggleTaskImportance = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isImportant: !task.isImportant } : task
    );
    setTasks(updatedTasks); // Update tasks list
    setBottomSheetVisible(false); // Close bottom sheet
  };

  // Delete a task from the list
  const toggleTaskDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id); // Remove task with matching ID
    setTasks(updatedTasks); // Update tasks list
    setBottomSheetVisible(false); // Close bottom sheet
  };

  // Delete all completed tasks after confirmation
  const deleteAllCompletedTasks = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete all completed tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => setTasks(tasks.filter((task) => !task.completed)) }, // Delete completed tasks
      ]
    );
  };

  // Handle filtering tasks based on selected filter type
  const handleFilter = (filterType) => {
    setFilterType(filterType); // Set the selected filter type
    let filtered = [];
    switch (filterType) {
      case 'pending':
        filtered = tasks.filter((task) => !task.completed); // Filter pending tasks
        break;
      case 'completed':
        filtered = tasks.filter((task) => task.completed); // Filter completed tasks
        break;
      case 'important':
        filtered = tasks.filter((task) => task.isImportant); // Filter important tasks
        break;
      case 'dueDate':
        filtered = tasks.filter((task) => task.dueDate !== null); // Filter tasks with due dates
        break;
      case 'all':
      default:
        filtered = tasks; // Show all tasks
    }
    setFilteredTasks(filtered); // Update filtered tasks list
    setFilterVisible(false); // Close the filter modal
  };

  // Open task options in a bottom sheet when long pressed
  const openTaskOptions = (task) => {
    setTaskToEdit(task); // Set the task to be edited
    setBottomSheetVisible(true); // Open the bottom sheet
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Action bar with filter and delete buttons */}
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

        {/* List of tasks with a filter applied */}
        <FlatList
          data={filterType !== 'all' ? filteredTasks : tasks} // Use filtered tasks if filter is applied
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
          ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add some!</Text>} // Show if there are no tasks
        />

        {/* Button to open the Add Task modal */}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>

        {/* Bottom Sheet for task options (e.g., mark as important, delete) */}
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

        {/* Modal for adding a new task */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.bottomSheet}
          avoidKeyboard
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.bottomSheetContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter a task"
              value={task}
              onChangeText={setTask} // Update task input state
            />
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Due Date: </Text>
              {/* Button to show/hide date picker */}
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
              {/* Date picker when enabled */}
              {showDatePicker && (
                <DateTimePicker
                  value={dueDate || new Date()} // Default to current date if no due date is set
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false); // Hide the date picker
                    setDueDate(selectedDate); // Set the selected due date
                  }}
                />
              )}
            </View>
            <TouchableOpacity
              style={[styles.addButton, styles.modalButton]}
              onPress={handleAddTask} // Trigger task addition
            >
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
