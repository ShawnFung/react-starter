export type InfoPropsType = {
  title?: string
  desc?: string
  isLocked?: boolean
  onChange?: (props: InfoPropsType) => void
}

export const defaultInfoProps: InfoPropsType = {
  title: '问卷标题',
  desc: '描述文件',
}
