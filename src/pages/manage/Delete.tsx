import React, { FC, useState } from 'react'
import {
  Table,
  Typography,
  Empty,
  Tag,
  Button,
  Space,
  Modal,
  message,
  Spin,
  Pagination,
} from 'antd'
import styled from './Delete.module.scss'
import type { ColumnsType } from 'antd/es/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import { updateQuestionService, deleteQuestionsService } from '../../services/question'
import { useRequest } from 'ahooks'

interface DataType {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}

const Delete: FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否已发布',
      dataIndex: 'isPublished',
      render: isPublished => {
        return <Tag color={isPublished ? '#108ee9' : ''}>{isPublished ? '已发布' : '未发布'}</Tag>
      },
    },
    {
      title: '答卷数量',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
  ]

  const { data, loading, refresh } = useLoadQuestionListData({ isDelete: true })
  const { list = [], total = 0 } = data || {}

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys as string[])
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }
  function deleteRow() {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除吗？删除以后不可恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleDelete()
      },
      onCancel() {
        message.info('取消')
      },
    })
    console.log(selectedRowKeys)
  }

  const { run: handleRecover } = useRequest(
    async () => {
      for await (const id of selectedRowKeys) {
        updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('操作成功')
        refresh()
        setSelectedRowKeys([])
      },
    }
  )

  const { run: handleDelete } = useRequest(
    async () => await deleteQuestionsService(selectedRowKeys),
    {
      manual: true,
      onSuccess: () => {
        message.success('操作成功')
        refresh()
        setSelectedRowKeys([])
      },
    }
  )

  return (
    <div>
      <div className={styled.header}>
        <Typography.Title level={3} className={styled.left}>
          回收站
        </Typography.Title>
        <div className={styled.right}>
          <ListSearch />
        </div>
      </div>
      {loading && <Spin />}
      {!loading && list.length == 0 && <Empty />}
      {!loading && list.length > 0 && (
        <>
          <Space style={{ marginBottom: '10px' }}>
            <Button type="primary" disabled={selectedRowKeys.length == 0} onClick={handleRecover}>
              恢复
            </Button>
            <Button danger disabled={selectedRowKeys.length == 0} onClick={deleteRow}>
              删除
            </Button>
          </Space>
          <Table
            columns={columns}
            dataSource={list}
            pagination={false}
            rowKey={p => p._id}
            rowSelection={rowSelection}
          />
          <ListPage total={total} />
        </>
      )}
    </div>
  )
}

export default Delete
