import React, { FC } from 'react'
import { Checkbox, Space, Typography } from 'antd'
import { CheckboxPropsType } from './interface'

const Component: FC<CheckboxPropsType> = props => {
  const { title, list = [], isVertical } = props

  return (
    <>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(item => {
          return (
            <Checkbox key={item.value} value={item.value} checked={item.checked}>
              {item.text}
            </Checkbox>
          )
        })}
      </Space>
    </>
  )
}

export default Component
