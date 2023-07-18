import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { ParagraphPropType } from './interface'

const PropComponent: FC<ParagraphPropType> = props => {
  const { text, isCenter, isLocked, onChange } = props
  const [form] = Form.useForm()

  function handleChange() {
    if (onChange) {
      const values = form.getFieldsValue()
      onChange(values)
    }
  }

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={isLocked}
      onChange={handleChange}
    >
      <Form.Item label="内容" name="text" rules={[{ required: true, message: '请输入段落内容' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="是否居中" name="isCenter" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
