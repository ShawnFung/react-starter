import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
  deleteSelectedComponent,
  changeSelectedComponentHidden,
  changeSelectedComponentLock,
  copyComponent,
  pasteComponent,
  moveComponent,
} from '../../../store/componentReducer'
import useGetComponents from '../../../hooks/useGetComponents'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponents()
  const { isLocked = false } = selectedComponent || {}

  const length = componentList.length
  const selectedIndex: number = componentList.findIndex(item => item.fe_id == selectedId)

  function handleDelete() {
    dispatch(deleteSelectedComponent())
  }

  function handleHidden() {
    dispatch(changeSelectedComponentHidden({ id: selectedId, isHidden: true }))
  }

  function handleLock() {
    dispatch(changeSelectedComponentLock({ id: selectedId, isLocked: !isLocked }))
  }

  function handleCopy() {
    dispatch(copyComponent())
  }

  function handlePaste() {
    dispatch(pasteComponent())
  }

  function handleUp() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  function handleDown() {
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  // 撤销
  function undo() {
    dispatch(UndoActionCreators.undo())
  }

  // 重做
  function redo() {
    dispatch(UndoActionCreators.redo())
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
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          disabled={!copiedComponent}
          onClick={handlePaste}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          disabled={selectedIndex <= 0}
          onClick={handleUp}
        ></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          disabled={selectedIndex >= length - 1}
          onClick={handleDown}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="恢复">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
