import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  taskList: {
    marginTop: 20,
  },
  taskname:{
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  completedTask: {
    backgroundColor: '#e0e0e0',
  },
  checkBox: {
    fontSize: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
  },
  bottomSheet: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheetContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  bottomSheetText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlign: 'left',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
  },
  actionButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});

export default styles;