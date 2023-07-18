import { FC } from 'react'
import QuestionInputConf, { InputPropsType } from './QuestionInput'
import QuestionTitleConf, { TitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { ParagraphPropType } from './QuestionParagraph'
import QuestionInfoConf, { InfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { TextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, { RadioPropsType } from './QuestionRadio'
import QuestionCheckboxConf, { CheckboxPropsType } from './QuestionCheckbox'

export type ComponentPropsType = InputPropsType &
  TitlePropsType &
  ParagraphPropType &
  InfoPropsType &
  TextareaPropsType &
  RadioPropsType &
  CheckboxPropsType

export type ComponentConfType = {
  title: string
  type: string
  PropComponent: FC<ComponentPropsType>
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

export const componentConfGroup = [
  {
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
  },
  {
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(item => item.type == type)
}
