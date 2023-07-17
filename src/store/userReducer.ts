import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateType = {
  user: UserStateType
}

export type UserStateType = {
  username: string
  nickname: string
}

const initState: UserStateType = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    login(state: UserStateType, action: PayloadAction<UserStateType>) {
      const { username, nickname } = action.payload
      state.username = username
      state.nickname = nickname
    },
    logout: () => {
      return initState
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
