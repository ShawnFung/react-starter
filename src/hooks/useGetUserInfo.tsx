import React from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../store/userReducer'

const useGetUserInfo = () => {
  const { username, nickname } = useSelector((state: StateType) => state.user)
  return { username, nickname }
}

export default useGetUserInfo
