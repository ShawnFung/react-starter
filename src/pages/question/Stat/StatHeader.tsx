import React, { FC, useRef } from 'react'
import styled from './StatHeader.module.scss'
import { Space, Typography, Button, Input, Tooltip, InputRef, message, Popover } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import QRCodeSVG from 'qrcode.react'

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()
  const urlInputRef = useRef<InputRef>(null)

  function handleCopy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select()
    document.execCommand('copy')
    message.success('拷贝成功')
  }

  function getLinkAndQrCode() {
    if (!isPublished) return null

    const url = `http://localhost:3000/question/${id}`
    const QrcodeElem = (
      <div style={{ width: '150px', textAlign: 'center' }}>
        <QRCodeSVG value={url} />
      </div>
    )

    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: '300px' }} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={handleCopy} />
        </Tooltip>
        <Popover content={QrcodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }
  return (
    <div className={styled['header-wrapper']}>
      <div className={styled.header}>
        <div className={styled.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}></Button>
            <Typography.Title>{title}</Typography.Title>
          </Space>
        </div>
        <div className={styled.center}>{getLinkAndQrCode()}</div>
        <div className={styled.right}>
          <Button type="primary" onClick={() => nav('/question/edit/' + id)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
