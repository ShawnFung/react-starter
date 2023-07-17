import React, { FC, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, del, todoType } from './TodoListSlice'
import { Button, Input, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const TodoList: FC = () => {
  const [name, setName] = useState('')
  const todoList = useSelector((state: any) => state.todoList)
  const dispatch = useDispatch()

  function addTodo() {
    dispatch(add({ id: Math.random(), name: name }))
  }
  function delTodo(id: string) {
    dispatch(del(id))
  }
  return (
    <div>
      <Space>
        <Input value={name} style={{ width: '200px' }} onChange={e => setName(e.target.value)} />
        <Button onClick={addTodo}>添加</Button>
      </Space>
      {todoList.map((item: todoType) => (
        <div key={item.id}>
          <span style={{ display: 'inline-block', width: '200px' }}>{item.name}</span>
          <Button type="text" onClick={() => delTodo(item.id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default TodoList
