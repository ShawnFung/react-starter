import React, { FC, useEffect } from 'react'
import { RadioPropsType, OptionType } from './interface'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

const PropComponent: FC<RadioPropsType> = props => {
  const { title, options, value, isVertical, isLocked, onChange } = props
  const [form] = Form.useForm()

  function handleChange() {
    if (!onChange) {
      return
    }
    const newValues = form.getFieldsValue()
    console.log(newValues)
    onChange(newValues)
  }

  function getValue() {
    const newValues = form.getFieldsValue()
    console.log('getValue', newValues)
  }

  useEffect(() => {
    console.log('useEffect')
    form.setFieldsValue({ title, options, value, isVertical })
  }, [title, options, value, isVertical])
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, options, value, isVertical }}
      disabled={isLocked}
      onChange={handleChange}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }: any, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { options: opts } = form.getFieldsValue()
                            let num = 0
                            opts.forEach((opt: OptionType) => {
                              if (opt.text == text) {
                                num++
                              }
                            })
                            if (num == 1) {
                              return Promise.resolve()
                            } else {
                              return Promise.reject('选项重复了')
                            }
                          },
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    {index > 1 && (
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
              <Form.Item>
                <Button
                  block
                  type="primary"
                  onClick={() => add({ text: '', value: nanoid() })}
                  icon={<PlusOutlined />}
                >
                  新增选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="是否垂直" name="isVertical" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options}
          fieldNames={{ label: 'text', value: 'value' }}
          onChange={handleChange}
        ></Select>
      </Form.Item>
      <Button onClick={getValue}>获取内容</Button>
    </Form>
  )
}

export default PropComponent
