import { ComponentInfoType } from './index'

export function getNextSelectedId(id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(item => !item.isHidden)
  const index = visibleComponentList.findIndex(item => item.fe_id == id)
  if (index < 0) return ''
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    newSelectedId = ''
  } else {
    if (index == length - 1) {
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}
