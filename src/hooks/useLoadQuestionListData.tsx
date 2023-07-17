import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'

type Option = {
  isStar: boolean
  isDelete: boolean
}

function useLoadQuestionListData(opts: Partial<Option> = {}) {
  const { isStar = false, isDelete = false } = opts
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keywords = searchParams.get('keywords') || ''
      const page = parseInt(searchParams.get('page') || '') || 1
      const pageSize = parseInt(searchParams.get('pageSize') || '') || 10
      const data = await getQuestionListService({ keywords, isStar, isDelete, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
