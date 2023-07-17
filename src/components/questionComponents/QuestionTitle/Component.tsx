import React, { FC } from 'react'
import { TitlePropsType, defaultTitleProps } from './interface'
import { Typography } from 'antd'

const QuestionTitle: FC<TitlePropsType> = props => {
  const { text, level = 1, isCenter } = { ...defaultTitleProps, ...props }
  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }
  return (
    <Typography.Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        margin: '0px',
        fontSize: genFontSize(level),
      }}
    >
      {text}
    </Typography.Title>
  )
}

export default QuestionTitle
