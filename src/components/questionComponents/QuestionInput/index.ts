import Component from './Component'
import PropComponent from './PropComponent'
import { defaultInputProps } from './interface'

export * from './interface'

export default {
  title: '输入框',
  type: 'questionInput',
  PropComponent: PropComponent,
  Component: Component,
  defaultProps: defaultInputProps,
}
