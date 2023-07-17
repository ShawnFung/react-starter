import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router'
import styled from './Home.module.scss'
import { getQuestionService } from '../services/question'

const Home: FC = () => {
  const nav = useNavigate()

  useEffect(() => {
    getQuestionService('1').then(data => {
      console.log(data)
    })
  }, [])

  return (
    <div className={styled.container}>
      <Typography.Title>问卷调查|在线投票</Typography.Title>
      <Typography.Paragraph>
        已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
      </Typography.Paragraph>
      <div>
        <Button
          type="primary"
          onClick={() => {
            nav(MANAGE_INDEX_PATHNAME)
          }}
        >
          立即使用
        </Button>
      </div>
    </div>
  )
}

export default Home
