import React, { FC, useState, useEffect } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponents from '../../../hooks/useGetComponents'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  PAGE_KEY = 'page',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
  const { selectedId } = useGetComponents()

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY)
    } else {
      setActiveKey(TAB_KEYS.PAGE_KEY)
    }
  }, [selectedId])

  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.PAGE_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]
  return <Tabs activeKey={activeKey} items={tabItems} />
}

export default RightPanel
