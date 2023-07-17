import React, { FC, useEffect } from 'react'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import styled from './Login.module.scss'
import { Link } from 'react-router-dom'
import { loginService } from '../services/user'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../utils/user-token'

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

function rememberUserInfo(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserInfo() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfo() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()

  const { run: login } = useRequest(
    async values => {
      const { username, password } = values
      const data = await loginService(username, password)
      return data
    },
    {
      manual: true,
      onSuccess: data => {
        setToken(data.token)
        nav('/manage/list')
      },
    }
  )

  const onFinish = (values: any) => {
    console.log(values)
    if (values.remember) {
      rememberUserInfo(values.username, values.password)
    } else {
      deleteUserInfo()
    }
    login(values)
  }

  useEffect(() => {
    const userInfo = getUserInfo()
    form.setFieldsValue(userInfo)
  }, [])

  return (
    <div className={styled.container}>
      <div>
        <Space>
          <Typography.Title level={2}>
            <UserAddOutlined />
          </Typography.Title>
          <Typography.Title level={2}>用户登录</Typography.Title>
        </Space>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to="/register">注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
