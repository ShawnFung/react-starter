import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import { useNavPage } from '../hooks/useNavPage'
import { useLoadUserData } from '../hooks/useLoadUserData'

const QuestionLayout: FC = () => {
  const { waitUserData } = useLoadUserData()
  useNavPage(waitUserData)
  return (
    <div style={{ height: '100vh' }}>
      <div>{waitUserData ? <Spin /> : <Outlet />}</div>
    </div>
  )
}

export default QuestionLayout
