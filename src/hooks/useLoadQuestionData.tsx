import React, { useEffect, useState } from 'react'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { resetComponents } from '../store/componentReducer'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../store/pageinfoReducer'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  const { loading, data, error, run } = useRequest(
    async (id: string) => {
      if (!id) {
        throw new Error('')
      }
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )

  useEffect(() => {
    if (!data) {
      return
    }
    const { title, desc, js, css, componentList = [] } = data
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    dispatch(resetComponents({ componentList, selectedId: selectedId, copiedComponent: null }))
    dispatch(resetPageInfo({ title, desc, js, css }))
  }, [data])

  useEffect(() => {
    run(id)
  }, [id])

  return {
    loading,
    error,
  }
}

export default useLoadQuestionData
