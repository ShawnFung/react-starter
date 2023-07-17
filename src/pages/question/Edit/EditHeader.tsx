import React, { FC } from 'react'
import styled from './EditHeader.module.scss'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'

const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styled['header-wrapper']}>
      <div className={styled.container}>
        <div className={styled.left}>
          <Space>
            <Button type="link" onClick={() => nav(-1)}>
              <LeftOutlined />
              返回
            </Button>
            <Typography.Title>标题</Typography.Title>
          </Space>
        </div>
        <div className={styled.center}>
          <EditToolbar />
        </div>
        <div className={styled.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
