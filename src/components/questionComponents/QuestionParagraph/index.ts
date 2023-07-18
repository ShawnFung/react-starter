import Component from './Component'
import { QuestionParagrapthDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '段落',
  type: 'questionParagraph',
  PropComponent: PropComponent,
  Component: Component,
  defaultProps: QuestionParagrapthDefaultProps,
}
