import React, { FC } from 'react'
import styled from './ComponentList.module.scss'
import useGetComponents from '../../../hooks/useGetComponents'
import { getComponentConfByType } from '../../../components/questionComponents'
import classnames from 'classnames'
import { changeSelectedId } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'

const ComponentList: FC = () => {
  const { componentList, selectedId } = useGetComponents()
  const dispatch = useDispatch()

  function Empty() {
    return null
  }

  const wrapper = styled['component-wrapper']
  const selected = styled['selected']
  function getComponentName(fe_id: string) {
    return classnames({
      [wrapper]: true,
      [selected]: selectedId == fe_id,
    })
  }

  function changeSelected(id: string) {
    dispatch(changeSelectedId(id))
  }
  return (
    <div className={styled.container}>
      {componentList
        .filter(item => !item.isHidden)
        .map(item => {
          const comp = getComponentConfByType(item.type)
          const { Component = Empty } = comp || {}
          return (
            <div
              key={item.fe_id}
              className={getComponentName(item.fe_id)}
              onClick={() => changeSelected(item.fe_id)}
            >
              <div className={styled.component}>
                <Component {...item.props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ComponentList
