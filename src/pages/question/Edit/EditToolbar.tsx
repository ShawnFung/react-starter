import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  deleteSelectedComponent,
  changeSelectedComponentHidden,
  changeSelectedComponentLock,
} from '../../../store/componentReducer'
import useGetComponents from '../../../hooks/useGetComponents'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent } = useGetComponents()
  const { isLocked = false } = selectedComponent || {}

  function handleDelete() {
    dispatch(deleteSelectedComponent())
  }

  function handleHidden() {
    dispatch(changeSelectedComponentHidden({ id: selectedId, isHidden: true }))
  }

  function handleLock() {
    dispatch(changeSelectedComponentLock({ id: selectedId, isLocked: !isLocked }))
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title={isLocked ? '解锁' : '锁定'}>
        <Button
          shape="circle"
          icon={<LockOutlined />}
          disabled={selectedId ? false : true}
          type={isLocked ? 'primary' : 'default'}
          onClick={handleLock}
        ></Button>
      </Tooltip>
      {selectedId}
    </Space>
  )
}

export default EditToolbar
