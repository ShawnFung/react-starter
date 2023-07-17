import axios, { ResDataType } from './ajax'

type SearchOption = {
  keywords: string
  isStar: boolean
  isDelete: boolean
  page: number
  pageSize: number
}

export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = await axios.get(url)
  return data
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.post(url)) as ResDataType
  return data
}

export async function getQuestionListService(
  opts: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.get(url, { params: opts })) as ResDataType
  return data
}

export async function updateQuestionService(
  id: string,
  opts: { [key: string]: any }
): Promise<ResDataType> {
  const url = '/api/question/' + id
  const data = (await axios.patch(url)) as ResDataType
  return data
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}

// 批量彻底删除
export async function deleteQuestionsService(ids: string[]): Promise<ResDataType> {
  const url = '/api/question'
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType
  return data
}
