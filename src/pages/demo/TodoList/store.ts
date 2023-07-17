import { configureStore } from '@reduxjs/toolkit'
import todoListReducer from './TodoListSlice'

export default configureStore({
  reducer: {
    todoList: todoListReducer,
  },
})
