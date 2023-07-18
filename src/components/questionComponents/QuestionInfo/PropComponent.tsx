import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { InfoPropsType } from './interface'
const { TextArea } = Input

const PropComponent: FC<InfoPropsType> = props => {
  const { title, desc, isLocked, onChange } = props
  const [form] = Form.useForm()

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, desc }}
      disabled={isLocked}
      onChange={handleChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
