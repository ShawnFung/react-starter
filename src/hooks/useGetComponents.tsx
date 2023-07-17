import React from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentStateType } from '../store/componentReducer'

function useGetComponents() {
  const components = useSelector<StateType>(state => state.components)
  const { componentList = [], selectedId } = components as ComponentStateType

  const selectedComponent = componentList.find(item => item.fe_id == selectedId)
  return {
    componentList,
    selectedId,
    selectedComponent,
  }
}

export default useGetComponents
