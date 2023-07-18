import React, { FC } from 'react'
import { Radio, Typography, Space } from 'antd'
import { defaultRadioProps, RadioPropsType } from './interface'

const Component: FC<RadioPropsType> = props => {
  const { title, options = [], isVertical, value } = { ...defaultRadioProps, ...props }
  return (
    <>
      <Typography.Title level={4} style={{ marginTop: '0px', marginBottom: '5px' }}>
        {title}
      </Typography.Title>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(item => {
            return (
              <Radio key={item.value} value={item.value}>
                {item.text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </>
  )
}

export default Component
