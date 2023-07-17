import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Space } from 'antd'
const { Header, Footer, Sider, Content } = Layout
import styled from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import { useNavPage } from '../hooks/useNavPage'
import { useLoadUserData } from '../hooks/useLoadUserData'

const MainLayout: FC = () => {
  const { waitUserData } = useLoadUserData()
  useNavPage(waitUserData)
  return (
    <Layout>
      <Header className={styled.header}>
        <div className={styled.left}>
          <Logo />
        </div>
        <div className={styled.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styled.main}>
        <Outlet />
      </Content>
      <Footer className={styled.footer}>小慕问卷 @2023 created by 蛋挞它姐</Footer>
    </Layout>
  )
}

export default MainLayout
