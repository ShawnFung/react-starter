import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  deleteSelectedComponent,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentReducer'
import { ActionCreators } from 'redux-undo'

function isActiveElemValid() {
  const activeElement = document.activeElement

  if (activeElement == document.body) {
    return true
  }
  if (activeElement?.matches('div[role="button"]')) {
    return true
  }
  return false
}

const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElemValid()) {
      dispatch(deleteSelectedComponent())
    }
  })

  useKeyPress(['ctrl.c'], () => {
    if (!isActiveElemValid()) {
      return
    }
    dispatch(copyComponent())
  })

  useKeyPress(['ctrl.v'], () => {
    if (!isActiveElemValid()) {
      return
    }
    dispatch(pasteComponent())
  })

  useKeyPress(['uparrow'], () => {
    if (!isActiveElemValid()) {
      return
    }
    dispatch(selectPrevComponent())
  })

  useKeyPress(['downarrow'], () => {
    if (!isActiveElemValid()) {
      return
    }
    dispatch(selectNextComponent())
  })

  useKeyPress(
    ['ctrl.z'],
    () => {
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true,
    }
  )

  useKeyPress(
    ['ctrl.shift.z'],
    () => {
      dispatch(ActionCreators.redo())
    },
    {
      exactMatch: true,
    }
  )
}

export default useBindCanvasKeyPress
