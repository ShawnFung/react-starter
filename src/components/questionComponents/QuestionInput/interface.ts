export type InputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (props: InputPropsType) => void
  isLocked?: boolean
}

export const defaultInputProps: InputPropsType = {
  title: '输入框',
  placeholder: '请输入',
}
