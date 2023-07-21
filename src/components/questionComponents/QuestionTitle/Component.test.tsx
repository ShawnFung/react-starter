import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)
  const h = screen.getByText('一行标题')
  expect(h).toBeInTheDocument()
})

test('输入属性', () => {
  render(<Component text="测试" level={2} isCenter={true} />)

  // 判断内容
  const h = screen.getByText('测试')
  expect(h).toBeInTheDocument()

  // 判断标签
  expect(h.matches('h2')).toBeTruthy()

  // 判断样式
  const style = h.style
  expect(style.textAlign).toBe('center')
})
