export type ParagraphPropType = {
  text?: string
  isCenter?: boolean
  isLocked?: boolean
  onChange?: (props: ParagraphPropType) => void
}

export const QuestionParagrapthDefaultProps: ParagraphPropType = {
  text: '一行段落',
  isCenter: false,
}
