import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styled from './Register.module.scss'
import { registerService } from '../services/user'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'

const Register: FC = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()

  const { run: register } = useRequest(
    async values => {
      const { username, password } = values
      const data = await registerService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功')
        nav('/login')
      },
    }
  )
  const onFinish = (values: any) => {
    console.log(values)
    register(values)
  }
  const onReset = () => {
    form.resetFields()
  }

  return (
    <div className={styled.container}>
      <div>
        <Space>
          <Typography.Title level={2}>
            <UserAddOutlined />
          </Typography.Title>
          <Typography.Title level={2}>注册新用户</Typography.Title>
        </Space>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5 ~ 20 之间' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPass"
            rules={[
              { required: true, message: '请输入确认密码' },
              ({ getFieldValue }) => ({
                // 自定义校验
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
