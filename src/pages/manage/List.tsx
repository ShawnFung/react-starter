import React, { FC, useRef, useState, useEffect } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styled from './List.module.scss'
import { Typography, Spin, Empty, Result } from 'antd'
import ListSearch from '../../components/ListSearch'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '../../services/question'

const List: FC = () => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const hasMoreData = total > list.length
  const [searchParams] = useSearchParams()
  const keywords = searchParams.get('keywords') || ''

  const { run: load, loading } = useRequest(
    async () => {
      const keywords = searchParams.get('keywords') || ''
      const data = await getQuestionListService({ page, pageSize: 10, keywords })
      return data
    },
    {
      manual: true,
      onSuccess: data => {
        const { list: newList, total } = data
        setList(list.concat(newList))
        setTotal(total)
      },
    }
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      console.log('tryLoadMore')
      const elem = footerRef.current
      if (elem === null) {
        return
      }
      const domRect = elem.getBoundingClientRect()
      if (domRect === null) {
        return
      }
      const { bottom } = domRect
      // 判断元素是否在视口内
      const viewHeight = window.innerHeight || document.documentElement.clientHeight
      if (bottom <= viewHeight) {
        console.log('执行加载', bottom, viewHeight)
        setPage(page + 1)
        load()
      }
    },
    { wait: 500 }
  )

  useEffect(() => {
    setList([])
    setPage(1)
    setTotal(0)
  }, [keywords])

  const footerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, hasMoreData])

  const LoadMore = () => {
    if (loading) {
      return <Spin />
    }
    if (total == 0) {
      return <Empty />
    }
    if (!hasMoreData) {
      return <span>没有更多了</span>
    }
    return <span>开始加载下一页</span>
  }

  return (
    <div>
      <div className={styled.header}>
        <Typography.Title level={3} className={styled.left}>
          我的问卷
        </Typography.Title>
        <div className={styled.right}>
          <ListSearch />
        </div>
      </div>
      {list.length > 0 && list.map((item: any) => <QuestionCard key={item._id} {...item} />)}
      <div ref={footerRef}>
        <LoadMore />
      </div>
    </div>
  )
}

export default List
