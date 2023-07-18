import Component from './Component'
import { defaultRadioProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '单选',
  type: 'questionRadio',
  PropComponent: PropComponent,
  Component: Component,
  defaultProps: defaultRadioProps,
}
