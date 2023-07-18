export type TextareaPropsType = {
  title?: string
  placeholder?: string
  onChange?: (props: TextareaPropsType) => void
  isLocked?: boolean
}

export const defaultTextareaProps: TextareaPropsType = {
  title: '输入框',
  placeholder: '请输入',
}
