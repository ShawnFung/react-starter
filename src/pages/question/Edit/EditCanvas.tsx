import React, { FC, MouseEvent } from 'react'
import styled from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponents from '../../../hooks/useGetComponents'
import { getComponentConfByType } from '../../../components/questionComponents'
import { changeSelectedId, moveComponent } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/dragSortable/SortableContainer'
import SortableItem from '../../../components/dragSortable/SortableItem'

type PropsType = {
  loading: boolean
}

const EditCanvas: FC<PropsType> = props => {
  const { loading } = props
  const { componentList, selectedId } = useGetComponents()
  const dispatch = useDispatch()

  useBindCanvasKeyPress()

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

  const itemWidthId = componentList.map(item => {
    return {
      id: item.fe_id,
      ...item,
    }
  })

  function onDragEnd(oldIndex: number, newIndex: number) {
    console.log(oldIndex, newIndex)
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  function Empty() {
    return null
  }

  if (loading) {
    return <Spin />
  }
  return (
    <div className={styled.canvas}>
      <SortableContainer items={itemWidthId} onDragEnd={onDragEnd}>
        {componentList
          .filter(item => {
            return !item.isHidden
          })
          .map((item, index) => {
            const { fe_id, isLocked = false } = item || {}
            const comp = getComponentConfByType(item.type)
            const { Component = Empty } = comp || {}
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={getWrapperClassName(fe_id, isLocked)}
                  onClick={event => handleClick(event, fe_id)}
                >
                  <div className={styled.component}>
                    <Component {...item.props} />
                  </div>
                </div>
              </SortableItem>
            )
          })}
      </SortableContainer>
    </div>
  )
}

export default EditCanvas
