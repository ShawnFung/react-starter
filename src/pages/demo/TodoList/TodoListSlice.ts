import { createSlice } from '@reduxjs/toolkit'

export type todoType = {
  id: string
  name: string
}

const initialState: Array<todoType> = []

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: initialState,
  reducers: {
    add: (state: todoType[], action) => {
      // Redux Toolkit 允许我们在 reducers 中编写 mutating 逻辑。
      // 它实际上并没有 mutate state 因为它使用了 Immer 库，
      // 它检测到草稿 state 的变化并产生一个全新的基于这些更改的不可变 state
      state.push(action.payload)
    },
    del: (state, action) => {
      return state.filter(item => {
        return item.id != action.payload
      })
    },
  },
})

// 为每个 case reducer 函数生成 Action creators
export const { add, del } = todoListSlice.actions

export default todoListSlice.reducer
