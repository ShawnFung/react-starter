export type OptionType = {
  value: string
  text: string
}
export type RadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string
  isLocked?: boolean
  onChange?: (props: RadioPropsType) => void
}

export const defaultRadioProps: RadioPropsType = {
  title: 'radio 标题',
  isVertical: false,
  options: [
    { value: 'item1', text: '选项一' },
    { value: 'item2', text: '选项二' },
    { value: 'item3', text: '选项三' },
  ],
  value: '',
}
