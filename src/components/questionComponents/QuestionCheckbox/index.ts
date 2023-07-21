import Component from './Component'
import { defaultCheckboxProps } from './interface'
import PropComponent from './PropComponent'
import ChartComponent from './ChartComponent'

export * from './interface'

export default {
  title: '多选',
  type: 'questionCheckbox',
  PropComponent: PropComponent,
  Component: Component,
  ChartComponent,
  defaultProps: defaultCheckboxProps,
}
