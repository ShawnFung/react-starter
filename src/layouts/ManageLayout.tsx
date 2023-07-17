import React, { FC, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styled from './ManageLayout.module.scss'
import { Button, Space, Divider, message, Spin } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useLoadUserData } from '../hooks/useLoadUserData'

const ManageLayout: FC = () => {
  const { waitUserData } = useLoadUserData()
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: data => {
      const { id } = data
      if (id) {
        nav(`/question/edit/${id}`)
        message.success('创建成功')
      }
    },
  })

  return (
    <div className={styled.container}>
      <div className={styled.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            disabled={loading}
            onClick={handleCreateClick}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTopColor: 'transparent' }} />
          <Button
            type={pathname == '/manage/list' ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname == '/manage/star' ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname == '/manage/delete' ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/delete')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styled.right}>{waitUserData ? <Spin /> : <Outlet />}</div>
    </div>
  )
}

export default ManageLayout
