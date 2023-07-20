import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import styled from './EditHeader.module.scss'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changeTitle } from '../../../store/pageinfoReducer'
import { useDispatch } from 'react-redux'
import useGetComponents from '../../../hooks/useGetComponents'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { updateQuestionService } from '../../../services/question'

const TitleElement: FC<{ title: string }> = props => {
  const { title } = props
  const [editState, setEditState] = useState(false)
  const dispatch = useDispatch()

  function handleClick() {
    setEditState(true)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(changeTitle(e.target.value))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onChange={e => handleChange(e)}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
      />
    )
  }
  return (
    <Space>
      <Typography.Title>{title}</Typography.Title>
      <Button type="text" icon={<EditOutlined />} onClick={handleClick} />
    </Space>
  )
}

const SaveButton: FC = props => {
  const { componentList } = useGetComponents()
  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()

  const { run, loading } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
    }
  )

  // 快捷键保存
  useKeyPress(['ctrl.s'], (event: KeyboardEvent) => {
    event.preventDefault()
    if (!loading) {
      run()
    }
  })

  // 监听内容变化，自动保存
  useDebounceEffect(
    () => {
      run()
    },
    [componentList, pageInfo],
    {
      wait: 1000,
    }
  )

  return (
    <Button onClick={run} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

const PublishButton: FC = () => {
  const { componentList } = useGetComponents()
  const pageInfo = useGetPageInfo()
  const { id = '' } = useParams()
  const nav = useNavigate()

  const { run, loading } = useRequest(
    async () => {
      await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功')
        nav('/question/stat/' + id)
      },
    }
  )
  return (
    <Button type="primary" onClick={run}>
      发布
    </Button>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()
  const { title } = useGetPageInfo()
  return (
    <div className={styled['header-wrapper']}>
      <div className={styled.container}>
        <div className={styled.left}>
          <Space>
            <Button type="link" onClick={() => nav(-1)}>
              <LeftOutlined />
              返回
            </Button>
            <TitleElement title={title} />
          </Space>
        </div>
        <div className={styled.center}>
          <EditToolbar />
        </div>
        <div className={styled.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
