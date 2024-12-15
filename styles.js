import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main container for the app
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
    marginTop: 20,
    padding: 20, // Padding around the content
  },

  // Title of the app
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    textAlign: 'center', // Center align the title
  },

  // Style for the task list
  taskList: {
    marginTop: 20, // Margin between the title and task list
  },

  // Style for each task's container (with checkbox and text)
  taskname: {
    flexDirection: 'row', // Row layout for task name and checkbox
    alignItems: 'center', // Align items vertically in the center
    columnGap: 10, // Space between task name and checkbox
  },

  // Style for individual task items
  taskItem: {
    flexDirection: 'row', // Row layout for task content
    justifyContent: 'space-between', // Distribute content evenly between ends
    alignItems: 'center', // Align items vertically in the center
    backgroundColor: '#fff', // White background for task
    padding: 15, // Padding around the task content
    borderRadius: 10, // Rounded corners
    marginBottom: 10, // Space between tasks
    shadowColor: '#000', // Shadow effect for elevation
    shadowOpacity: 0.1, // Light shadow opacity
    shadowRadius: 5, // Shadow spread
    elevation: 3, // Elevation for Android
  },

  // Style for task text
  taskText: {
    fontSize: 16, // Default font size for task text
  },

  // Style for strikethrough text (completed tasks)
  strikethrough: {
    textDecorationLine: 'line-through', // Apply line-through decoration
    color: '#bbb', // Light grey color for completed tasks
  },

  // Style for completed tasks (background color)
  completedTask: {
    backgroundColor: '#e0e0e0', // Light grey background for completed tasks
  },

  // Style for the checkbox (tick box) to mark tasks as completed
  checkBox: {
    fontSize: 20, // Font size for the checkbox
  },

  // Style for the "No tasks yet" message when there are no tasks
  emptyText: {
    textAlign: 'center', // Center align the empty message
    color: '#888', // Grey color for empty text
    marginTop: 20, // Margin on top
  },

  // Style for the clear all button (e.g., to delete completed tasks)
  clearButton: {
    backgroundColor: '#ff3b30', // Red background for the delete button
    padding: 10, // Padding inside the button
    borderRadius: 10, // Rounded corners
    marginTop: 10, // Margin at the top
    alignItems: 'center', // Center align the button content
  },

  // Text style for the clear button
  clearButtonText: {
    color: '#fff', // White color for the text
    fontWeight: 'bold', // Bold text
  },

  // Bottom sheet container style
  bottomSheet: {
    justifyContent: 'flex-end', // Position at the bottom of the screen
    margin: 0, // Remove default margin
  },

  // Content inside the bottom sheet (task options, filter options)
  bottomSheetContent: {
    backgroundColor: '#fff', // White background for bottom sheet content
    padding: 20, // Padding inside the content
    borderTopLeftRadius: 20, // Rounded top-left corner
    borderTopRightRadius: 20, // Rounded top-right corner
    elevation: 10, // Shadow for elevation
  },

  // Style for text inside the bottom sheet
  bottomSheetText: {
    fontSize: 16, // Default font size for bottom sheet options
    color: '#333', // Dark text color
    paddingVertical: 10, // Vertical padding for better spacing
    paddingHorizontal: 15, // Horizontal padding
    textAlign: 'left', // Left align the text
    borderBottomWidth: 1, // Border at the bottom of each option
    borderBottomColor: '#ddd', // Light grey border color
  },

  // Style for the input field (task input in the modal)
  input: {
    borderWidth: 1, // Border around the input field
    borderColor: '#ddd', // Light grey border color
    borderRadius: 10, // Rounded corners for the input field
    padding: 10, // Padding inside the input field
    marginBottom: 20, // Margin at the bottom
    fontSize: 16, // Font size for the input text
  },

  // Style for the date container in the task modal
  dateContainer: {
    flexDirection: 'row', // Row layout for the date label and button
    alignItems: 'center', // Center align the items vertically
    marginBottom: 20, // Margin at the bottom
  },

  // Style for the date label in the task modal
  dateLabel: {
    fontSize: 16, // Font size for the label
    fontWeight: 'bold', // Bold text for the label
    marginRight: 10, // Space to the right of the label
  },

  // Style for the date button in the task modal
  dateButton: {
    padding: 10, // Padding inside the button
    backgroundColor: '#007bff', // Blue background for the button
    borderRadius: 10, // Rounded corners
  },

  // Text style for the date button
  dateButtonText: {
    color: '#fff', // White color for the text
    fontWeight: 'bold', // Bold text
  },

  // Add task button style
  addButton: {
    backgroundColor: '#007bff', // Blue background for the button
    padding: 15, // Padding inside the button
    borderRadius: 50, // Circular button
    alignItems: 'center', // Center align the text inside
  },

  // Text style for the add task button
  addButtonText: {
    color: '#fff', // White color for the text
    fontWeight: 'bold', // Bold text
  },

  // Action bar style (filter, delete buttons)
  actionBar: {
    flexDirection: 'row', // Row layout for action buttons
    justifyContent: 'space-between', // Space out the buttons
    alignItems: 'center', // Center align the buttons vertically
    marginTop: 20, // Margin at the top
    paddingBottom: 10, // Padding at the bottom
  },

  // Style for individual action buttons (filter and delete)
  actionButton: {
    padding: 10, // Padding inside the button
    borderRadius: 50, // Circular button
    backgroundColor: 'white', // White background for action buttons
  },

  // Filter button style (for opening filter modal)
  filterButton: {
    padding: 10, // Padding inside the filter button
    borderRadius: 50, // Circular button
    backgroundColor: '#007bff', // Blue background for the button
  },

  // Text style for the filter button
  filterButtonText: {
    color: '#fff', // White text color
    fontSize: 16, // Font size for the text
  },

  // Style for modal buttons
  modalButton: {
    marginBottom: 20, // Margin at the bottom of modal buttons
  },
});

export default styles;
