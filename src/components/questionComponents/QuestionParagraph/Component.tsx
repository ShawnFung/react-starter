import React, { FC } from 'react'
import { ParagraphPropType, QuestionParagrapthDefaultProps } from './interface'
import { Typography } from 'antd'

const Component: FC<ParagraphPropType> = props => {
  const { text = '', isCenter = false } = { ...QuestionParagrapthDefaultProps, ...props }
  const textList = text.split('\n')
  return (
    <Typography.Paragraph style={{ textAlign: isCenter ? 'center' : 'left' }}>
      {textList.map((item, index) => {
        return (
          <span key={index}>
            {index > 0 ? <br /> : ''}
            {item}
          </span>
        )
      })}
    </Typography.Paragraph>
  )
}

export default Component
