import React, { FC, useState } from 'react'
import styled from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

type PropsType = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  del: (id: string) => void
  publish: (id: string) => void
}

const ListItem: FC<PropsType> = props => {
  const { _id, title, isPublished, isStar, createdAt, answerCount, del, publish } = props
  const [isStarState, setIsStarState] = useState(isStar)

  const nav = useNavigate()

  const cancel = () => {
    message.info('取消')
  }

  const { run: handleUpdateStar, loading: changeStarLoading } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isStar: !isStar })
      return data
    },
    {
      manual: true,
      onSuccess: res => {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    }
  )

  const [isDeleted, setIsDeleted] = useState(false)
  const { run: handleDelete, loading: deleteLoading } = useRequest(
    async () => {
      const data = await updateQuestionService(_id, { isDeleted: true })
      return data
    },
    {
      manual: true,
      onSuccess: res => {
        setIsDeleted(true)
        message.success('删除成功')
      },
    }
  )

  const { run: handleCopy } = useRequest(async () => await duplicateQuestionService(_id), {
    manual: true,
    onSuccess: res => {
      message.success('复制成功')
      nav({
        pathname: '/question/edit/' + res.id,
      })
    },
  })

  if (isDeleted) {
    return null
  }

  return (
    <div className={styled.container}>
      <div className={styled.title}>
        <div className={styled.left}>
          <Space>
            {isStarState && <StarOutlined style={{ color: 'red' }} />}
            <Link to={isPublished ? '/question/stat/' + _id : '/question/edit/' + _id}>
              {title}
            </Link>
          </Space>
        </div>
        <div className={styled.right}>
          <Tag color={isPublished ? '#108ee9' : ''}>{isPublished ? '已发布' : '未发布'}</Tag>
          <span>答卷：{answerCount}</span>&nbsp;
          <span>{createdAt}</span>
        </div>
      </div>
      <Divider style={{ margin: '10px 0' }} />
      <div className={styled.buttonContainer}>
        <div className={styled.left}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => nav('/question/edit/' + _id)}
            >
              编辑问卷
            </Button>
            <Button
              type="text"
              size="small"
              disabled={!isPublished}
              icon={<LineChartOutlined />}
              onClick={() => nav('/question/stat/' + _id)}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styled.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined />}
              disabled={changeStarLoading}
              onClick={handleUpdateStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷吗？"
              onConfirm={handleCopy}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" size="small" icon={<CopyOutlined />}>
                复制
              </Button>
            </Popconfirm>
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              disabled={deleteLoading}
              onClick={handleDelete}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default ListItem
