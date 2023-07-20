import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageinfoReducer'

const PageSetting: FC = () => {
  const { title, desc, js, css } = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  function onChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [title, desc, js, css])
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, desc, js, css }}
      onChange={onChange}
    >
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="脚本" name="js">
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
