import { FC } from 'react'
import QuestionInputConf, { InputPropsType } from './QuestionInput'
import QuestionTitleConf, { TitlePropsType } from './QuestionTitle'

export type ComponentPropsType = InputPropsType & TitlePropsType

export type ComponentConfType = {
  title: string
  type: string
  PropComponent: FC<ComponentPropsType>
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]

export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(item => item.type == type)
}
