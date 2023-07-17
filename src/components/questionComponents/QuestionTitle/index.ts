import Component from './Component'
import { defaultTitleProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle',
  PropComponent: PropComponent,
  Component: Component,
  defaultProps: defaultTitleProps,
}
