import React, { FC } from 'react'
import { TextareaPropsType, defaultTextareaProps } from './interface'
import { Input, Typography } from 'antd'

const QuestionInput: FC<TextareaPropsType> = props => {
  const { title, placeholder } = { ...defaultTextareaProps, ...props }
  return (
    <>
      <Typography.Title level={4} style={{ marginTop: '0px', marginBottom: '5px' }}>
        {title}
      </Typography.Title>
      <div>
        <Input.TextArea placeholder={placeholder} />
      </div>
    </>
  )
}

export default QuestionInput
