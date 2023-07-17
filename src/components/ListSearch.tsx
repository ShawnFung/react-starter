import React, { useState, useEffect, ChangeEvent } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const ListSearch = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  const [searchParams] = useSearchParams()
  useEffect(() => {
    setValue(searchParams.get('keywords') || '')
  }, [searchParams])

  const [value, setValue] = useState<string>()
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }
  const handleSearch = (value: string) => {
    nav({
      pathname: pathname,
      search: 'keywords=' + value,
    })
  }
  return (
    <div>
      <Input.Search
        value={value}
        placeholder="搜索"
        allowClear
        onChange={handleChange}
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
    </div>
  )
}

export default ListSearch
