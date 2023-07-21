import React, { FC, useEffect, useState } from 'react'
import { Table, Pagination, Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getQuestionStatListService } from '../../../services/stat'
import { useParams } from 'react-router-dom'
import useGetComponents from '../../../hooks/useGetComponents'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentReducer'

const PageStat: FC = () => {
  const { id = '' } = useParams()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { componentList, selectedId } = useGetComponents()
  const dispatch = useDispatch()

  const { data, run } = useRequest(async () => getQuestionStatListService(id, { page, pageSize }), {
    manual: true,
  })
  const { list = [], total = 0 } = data || {}
  const columns = componentList
    .filter(item => {
      return item.type != 'questionTitle' && item.type != 'questionInfo'
    })
    .map(item => {
      return {
        key: item.fe_id,
        title: (
          <div
            style={{ color: item.fe_id == selectedId ? '#1890ff' : '', cursor: 'pointer' }}
            onClick={() => dispatch(changeSelectedId(item.fe_id))}
          >
            {item.title}
          </div>
        ),
        dataIndex: item.fe_id,
      }
    })

  function onChange(page: number, pageSize: number) {
    setPage(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    run()
  }, [page, pageSize])
  return (
    <div>
      <Typography.Title level={3}>答卷数量：{total}</Typography.Title>
      <Table
        dataSource={list.map((item: any) => {
          return { key: item._id, ...item }
        })}
        columns={columns}
      ></Table>
      <Pagination current={page} total={total} pageSize={pageSize} onChange={onChange} />
    </div>
  )
}

export default PageStat
