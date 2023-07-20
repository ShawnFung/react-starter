import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import componentsReducer from './componentReducer'
import { UserStateType } from './userReducer'
import { ComponentStateType } from './componentReducer'
import pageInfoReducer, { PageInfoType } from './pageinfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'

export type StateType = {
  user: UserStateType
  components: StateWithHistory<ComponentStateType>
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: undoable(componentsReducer, {
      limit: 20,
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})
