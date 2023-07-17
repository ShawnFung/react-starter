import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import componentsReducer from './componentReducer'
import { UserStateType } from './userReducer'
import { ComponentStateType } from './componentReducer'

export type StateType = {
  user: UserStateType
  components: ComponentStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
  },
})
