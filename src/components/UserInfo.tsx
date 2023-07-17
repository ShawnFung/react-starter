import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { removeToken } from '../utils/user-token'
import { useNavigate } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logout } from '../store/userReducer'

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService)
  const { username, nickname } = useGetUserInfo()
  const nav = useNavigate()
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(logout())
    removeToken()
    nav('/')
  }

  const UserInfo = () => {
    return (
      <div style={{ color: '#fff' }}>
        <UserOutlined />
        {nickname}
        <Button type="text" style={{ color: '#fff' }} onClick={handleLogout}>
          退出
        </Button>
      </div>
    )
  }
  const Login = () => <Link to="/login">登录</Link>
  return <div>{username ? <UserInfo /> : <Login />}</div>
}

export default UserInfo
