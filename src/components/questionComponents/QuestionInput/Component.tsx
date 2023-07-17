import React, { FC } from 'react'
import { InputPropsType, defaultInputProps } from './interface'
import { Input, Typography } from 'antd'

const QuestionInput: FC<InputPropsType> = props => {
  const { title, placeholder } = { ...defaultInputProps, ...props }
  return (
    <>
      <Typography.Title level={4} style={{ marginTop: '0px', marginBottom: '5px' }}>
        {title}
      </Typography.Title>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </>
  )
}

export default QuestionInput
