import React, { FC } from 'react'
import useGetComponents from '../../../hooks/useGetComponents'
import { getComponentConfByType } from '../../../components/questionComponents'
import { ComponentPropsType } from '../../../components/questionComponents'
import { changeComponentProps } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponents()
  const dispatch = useDispatch()

  if (!selectedComponent) {
    return <div style={{ textAlign: 'center' }}>未选中组件</div>
  }

  const { type, props } = selectedComponent
  const componentConfig = getComponentConfByType(type)
  if (!componentConfig) {
    return <div style={{ textAlign: 'center' }}>未选中组件</div>
  }

  function onChange(props: ComponentPropsType) {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    dispatch(
      changeComponentProps({
        id: fe_id,
        props: props,
      })
    )
  }

  const { PropComponent } = componentConfig
  const { isLocked } = selectedComponent
  return (
    <div>
      <PropComponent {...props} onChange={onChange} isLocked={isLocked} />
    </div>
  )
}

export default ComponentProp
