import Component from './Component'
import { defaultInfoProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '标题',
  type: 'questionInfo',
  PropComponent: PropComponent,
  Component: Component,
  defaultProps: defaultInfoProps,
}
