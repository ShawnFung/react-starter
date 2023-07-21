import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
  render(<Component />)

  const p = screen.getByText('多选标题')
  expect(p).toBeInTheDocument()
})
