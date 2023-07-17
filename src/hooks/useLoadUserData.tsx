import React, { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import { login, UserStateType, StateType } from '../store/userReducer'
import useGetUserInfo from './useGetUserInfo'

export const useLoadUserData = () => {
  const dispatch = useDispatch()
  const { username } = useGetUserInfo()
  const [waitUserData, setWaitUserData] = useState(true)
  const { data, run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: data => {
      dispatch(login(data as UserStateType))
    },
    onFinally() {
      setWaitUserData(false)
    },
  })

  useEffect(() => {
    if (username) {
      setWaitUserData(false)
      return
    }
    run()
  }, [username])
  return { waitUserData }
}
