import React, { FC, useState, ChangeEvent } from 'react'
import { Typography, message } from 'antd'

const FormDemo = () => {
  const [text, setText] = useState('')
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const [gender, setGender] = useState('male')
  const onChangeGender = (e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value)
  }

  const [checkedCity, setCheckedCity] = useState<Array<string>>([])
  const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value
    if (checkedCity.includes(city)) {
      setCheckedCity(checkedCity.filter(item => item != city))
    } else {
      setCheckedCity(checkedCity.concat(city))
    }
  }

  const [language, setLanguage] = useState('html')
  const onChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }
  return (
    <div>
      <Typography.Title level={4}>FormDemo</Typography.Title>
      <input value={text} onChange={onChange} />
      当前输入内容：{text}
      <br />
      {/* 使用 checked 控制默认选中值 */}
      <label htmlFor="radio1">男</label>
      <input
        type="radio"
        id="radio1"
        name="gender"
        value="male"
        checked={gender == 'male'}
        onChange={onChangeGender}
      />
      <label htmlFor="radio2">女</label>
      <input
        type="radio"
        id="radio2"
        name="gender"
        value="female"
        checked={gender == 'female'}
        onChange={onChangeGender}
      />
      选中项：{gender}
      <br />
      <label htmlFor="checkbox1">北京</label>
      <input
        type="checkbox"
        id="checkbox1"
        name="city"
        value="北京"
        checked={checkedCity.includes('北京')}
        onChange={onChangeChecked}
      />
      <label htmlFor="checkbox2">上海</label>
      <input
        type="checkbox"
        id="checkbox2"
        name="city"
        value="上海"
        checked={checkedCity.includes('上海')}
        onChange={onChangeChecked}
      />
      当前选中城市：{checkedCity.toString()}
      <br />
      <select value={language} onChange={onChangeLanguage}>
        <option value="java">java</option>
        <option value="html">html</option>
        <option value="css">css</option>
      </select>
      当前选中语言：{language}
      <br />
      <form>
        <input />
      </form>
    </div>
  )
}

export default FormDemo
