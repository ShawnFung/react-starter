import React, { FC, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styled from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import useGetUserInfo from '../hooks/useGetUserInfo'

const Logo: FC = () => {
  const { username } = useGetUserInfo()
  return (
    <div className={styled.container}>
      <Link to={username ? MANAGE_INDEX_PATHNAME : HOME_PATHNAME}>
        <Space>
          <Typography.Title>
            <FormOutlined />
            小慕问卷
          </Typography.Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
