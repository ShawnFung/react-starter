import React, { FC } from 'react'
import { Typography } from 'antd'
import { InfoPropsType, defaultInfoProps } from './interface'

const Component: FC<InfoPropsType> = props => {
  const { title, desc } = { ...defaultInfoProps, ...props }
  const descList = desc?.split('\n')
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title>{title}</Typography.Title>
      <Typography.Paragraph>
        {descList?.map((item, index) => {
          return (
            <span key={index}>
              {index > 0 ? <br /> : ''}
              {item}
            </span>
          )
        })}
      </Typography.Paragraph>
    </div>
  )
}

export default Component
