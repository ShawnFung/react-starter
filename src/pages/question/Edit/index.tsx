import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styled from './index.module.scss'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentReducer'

const Edit: FC = () => {
  const { loading, error } = useLoadQuestionData()
  const dispatch = useDispatch()

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styled.container}>
      <div className={styled.header}>
        <EditHeader />
      </div>
      <div className={styled.main}>
        <div className={styled.left}>
          <LeftPanel />
        </div>
        <div className={styled.center} onClick={clearSelectedId}>
          <div className={styled['canvas-wrapper']}>
            <EditCanvas loading={loading}></EditCanvas>
          </div>
        </div>
        <div className={styled.right}>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default Edit
