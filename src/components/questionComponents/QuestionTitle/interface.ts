export type TitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4
  isCenter?: boolean
  isLocked?: boolean
  onChange?: (props: TitlePropsType) => void
}

export const defaultTitleProps: TitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
