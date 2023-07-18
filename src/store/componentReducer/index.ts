import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/questionComponents'
import { getNextSelectedId } from './utils'
import cloneDeep from 'lodash.clonedeep'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentStateType = {
  selectedId: string
  componentList: Array<ComponentInfoType>
  copiedComponent: ComponentInfoType | null
}

const initState: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: initState,
  reducers: {
    resetComponents(state, action: PayloadAction<ComponentStateType>) {
      return action.payload
    },
    changeSelectedId(state: ComponentStateType, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
    addComponent(state, action: PayloadAction<ComponentInfoType>) {
      const index = state.componentList.findIndex(item => item.fe_id == state.selectedId)
      if (index >= 0) {
        state.componentList.splice(index + 1, 0, action.payload)
      } else {
        state.componentList.push(action.payload)
      }
      state.selectedId = action.payload.fe_id
    },
    changeComponentProps(state, action: PayloadAction<{ id: string; props: ComponentPropsType }>) {
      state.componentList.forEach(item => {
        if (item.fe_id == action.payload.id) {
          item.props = action.payload.props
        }
      })
    },
    deleteSelectedComponent(state) {
      const index = state.componentList.findIndex(item => item.fe_id == state.selectedId)
      const newSelectedId = getNextSelectedId(state.selectedId, state.componentList)
      if (index >= 0) {
        state.componentList.splice(index, 1)
        state.selectedId = newSelectedId
      }
    },
    changeSelectedComponentHidden(state, action: PayloadAction<{ id: string; isHidden: boolean }>) {
      const { id, isHidden } = action.payload
      const comp = state.componentList.find(item => item.fe_id == id)
      const newSelectedId = getNextSelectedId(id, state.componentList)
      if (!comp) return
      comp.isHidden = isHidden
      state.selectedId = isHidden ? newSelectedId : id
    },
    changeSelectedComponentLock(state, action: PayloadAction<{ id: string; isLocked: boolean }>) {
      const { id, isLocked } = action.payload
      const comp = state.componentList.find(item => item.fe_id == id)
      if (!comp) return
      comp.isLocked = isLocked
    },
    copyComponent(state) {
      const { selectedId } = state
      const selectionComponent = state.componentList.find(item => item.fe_id == selectedId)
      if (selectionComponent) {
        state.copiedComponent = cloneDeep({ ...selectionComponent, fe_id: nanoid() })
      }
    },
    pasteComponent(state) {
      if (!state.selectedId || !state.copiedComponent) {
        return
      }
      const index = state.componentList.findIndex(item => item.fe_id == state.selectedId)
      if (index == -1) {
        return
      }
      state.componentList.splice(index + 1, 0, state.copiedComponent)
      state.selectedId = state.copiedComponent.fe_id
      state.copiedComponent = null
    },
    selectPrevComponent(state) {
      const { selectedId } = state
      if (!selectedId) {
        return
      }
      const index = state.componentList.findIndex(item => item.fe_id == selectedId)
      if (index == 0) {
        return
      }
      state.selectedId = state.componentList[index - 1].fe_id
    },
    selectNextComponent(state) {
      const { selectedId, componentList } = state
      if (!selectedId) {
        return
      }
      const index = componentList.findIndex(item => item.fe_id == selectedId)
      if (index == componentList.length - 1) {
        return
      }
      state.selectedId = state.componentList[index + 1].fe_id
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
  changeSelectedComponentHidden,
  changeSelectedComponentLock,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
