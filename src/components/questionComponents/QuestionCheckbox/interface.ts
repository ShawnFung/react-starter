export type OptionType = {
  value: string
  text: string
  checked: boolean
}
export type CheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]
  isLocked?: boolean
  onChange?: (props: CheckboxPropsType) => void
}

export const defaultCheckboxProps: CheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { value: 'item1', text: '选项一', checked: false },
    { value: 'item2', text: '选项二', checked: false },
    { value: 'item3', text: '选项三', checked: false },
  ],
}
