import Component from './Component'
import PropComponent from './PropComponent'
import { defaultTextareaProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionTextarea',
  PropComponent: PropComponent,
  Component: Component,
  defaultProps: defaultTextareaProps,
}
