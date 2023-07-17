import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { InputPropsType } from './interface'

const PropComponent: FC<InputPropsType> = props => {
  const { title, placeholder, onChange, isLocked } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  function onValuesChange() {
    if (onChange) {
      const values = form.getFieldsValue()
      onChange(values)
    }
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, placeholder }}
      onValuesChange={onValuesChange}
      disabled={isLocked}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
