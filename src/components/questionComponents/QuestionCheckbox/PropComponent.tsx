import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { CheckboxPropsType } from './interface'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: FC<CheckboxPropsType> = props => {
  const { title, list, isVertical, isLocked, onChange } = props
  const [form] = Form.useForm()

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical })
  }, [title, list, isVertical])
  return (
    <Form
      form={form}
      initialValues={{ title, list, isVertical }}
      layout="vertical"
      disabled={isLocked}
      onChange={handleChange}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((item, index) => {
                const { key, name } = item
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item name={[name, 'text']}>
                      <Input />
                    </Form.Item>
                    {index > 0 && (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(name)
                          handleChange()
                        }}
                      />
                    )}
                  </Space>
                )
              })}
              <Button
                block
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => add({ value: nanoid(), text: '', checked: false })}
              >
                新增选项
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="是否垂直" name="isVertical" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
