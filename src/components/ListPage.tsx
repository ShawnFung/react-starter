import React, { FC, useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

type Option = {
  total: number
}

const ListPage: FC<Option> = (opts: Option) => {
  const { total } = opts
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // 直接在 FC 的第一层中调用 setCurrent，会引起死循环
    setCurrent(parseInt(searchParams.get('page') || '') || 1)
    setPageSize(parseInt(searchParams.get('pageSize') || '') || 10)
  }, [])

  const nav = useNavigate()
  const { pathname } = useLocation()

  function onChange(page: number, pageSize: number) {
    searchParams.set('page', page.toString())
    searchParams.set('pageSize', pageSize.toString())
    nav({
      pathname: pathname,
      search: searchParams.toString(),
    })
  }

  return (
    <div>
      <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange} />
    </div>
  )
}

export default ListPage
