import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)

  const title = screen.getByText('radio 标题')
  expect(title).toBeInTheDocument()
  for (let i = 0; i < 3; i++) {
    const input = screen.getByDisplayValue('item' + (i + 1))
    expect(input).toBeInTheDocument()
    const label = screen.getByText('选项' + (i + 1))
    expect(label).toBeInTheDocument()
  }
})

test('传入属性', () => {
  const opts = [
    { value: 'v1', text: 't1' },
    { value: 'v2', text: 't2' },
    { value: 'v3', text: 't3' },
  ]
  const value = 'v1'
  render(<Component title="hello" options={opts} value={value} />)
  for (let i = 1; i <= 3; i++) {
    const input = screen.getByDisplayValue(`v${i}`)
    expect(input).toBeInTheDocument()
    if (value == `v${i}`) {
      expect(input.getAttribute('checked')).not.toBeNull()
    }
  }
})
