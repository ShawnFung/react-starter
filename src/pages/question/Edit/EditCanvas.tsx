import React, { FC, MouseEvent } from 'react'
import styled from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponents from '../../../hooks/useGetComponents'
import { getComponentConfByType } from '../../../components/questionComponents'
import { changeSelectedId } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

type PropsType = {
  loading: boolean
}

const EditCanvas: FC<PropsType> = props => {
  const { loading } = props
  const { componentList, selectedId } = useGetComponents()
  const dispatch = useDispatch()

  function handleClick(e: MouseEvent, id: string) {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }

  const wrapperClass = styled['component-wrapper']
  const selectedClass = styled['isSelected']
  const lockedClass = styled['isLocked']
  function getWrapperClassName(id: string, isLocked: boolean) {
    return classNames({
      [wrapperClass]: true,
      [selectedClass]: selectedId == id,
      [lockedClass]: isLocked,
    })
  }

  if (loading) {
    return <Spin />
  }
  return (
    <div className={styled.canvas}>
      {componentList
        .filter(item => !item.isHidden)
        .map((item, index) => {
          const { fe_id, isLocked = false } = item || {}
          const comp = getComponentConfByType(item.type)
          if (!comp) {
            return (
              <div key={index} className={getWrapperClassName(fe_id, isLocked)}>
                待开发{item.fe_id}
              </div>
            )
          }
          const { Component } = comp
          return (
            <div
              key={fe_id}
              className={getWrapperClassName(fe_id, isLocked)}
              onClick={event => handleClick(event, fe_id)}
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

export default EditCanvas
