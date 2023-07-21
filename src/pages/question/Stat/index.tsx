import React, { FC, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import { Spin, Result, Button } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useTitle } from 'ahooks'
import styled from './index.module.scss'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'

const Stat: FC = () => {
  const { loading, error } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const nav = useNavigate()
  useTitle('问卷统计-' + title)

  function generateContent() {
    if (isPublished === false) {
      return (
        <div>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          />
        </div>
      )
    } else {
      return <PageStat />
    }
  }

  return (
    <div className={styled.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styled['content-wrapper']}>
        {loading && <Spin />}
        {!loading && (
          <div className={styled.content}>
            <div className={styled.left}>
              <ComponentList />
            </div>
            <div className={styled.center}>{generateContent()}</div>
            <div className={styled.right}>
              <ChartStat />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Stat
