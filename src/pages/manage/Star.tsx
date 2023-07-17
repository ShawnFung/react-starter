import React, { useRef, useState } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styled from './Star.module.scss'
import { Typography, Empty, Spin } from 'antd'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'

function Star() {
  const { data, loading, error } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data || {}

  return (
    <div>
      <div className={styled.header}>
        <Typography.Title level={3} className={styled.left}>
          星标问卷
        </Typography.Title>
        <div className={styled.right}>
          <ListSearch />
        </div>
      </div>
      {loading && <Spin />}
      {!loading && list.length == 0 && <Empty />}
      {!loading &&
        list.length > 0 &&
        list.map((item: any) => <QuestionCard key={item._id} {...item} />)}
      <ListPage total={total} />
    </div>
  )
}

export default Star
