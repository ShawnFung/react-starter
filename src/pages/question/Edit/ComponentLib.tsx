import React, { FC } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/questionComponents'
import { Typography } from 'antd'
import styled from './ComponentLib.module.scss'
import { addComponent } from '../../../store/componentReducer'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

function getComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title: title,
        type: type,
        props: defaultProps,
      })
    )
  }

  return (
    <div key={type} className={styled.wrapper} onClick={handleClick}>
      <div className={styled.component}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { components } = group
        return (
          <div key={index}>
            <Typography.Title
              level={3}
              style={{ fontSize: '16px', marginTop: index == 0 ? '0' : '20px' }}
            >
              {group.groupName}
            </Typography.Title>
            <div>{components.map(c => getComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
