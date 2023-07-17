import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
  isLoginOrRegister,
  MANAGE_INDEX_PATHNAME,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
} from '../router'

export const useNavPage = (waitUserData: boolean) => {
  const { pathname } = useLocation()
  const { username } = useGetUserInfo()
  const nav = useNavigate()

  useEffect(() => {
    if (waitUserData) {
      return
    }
    console.log({ waitUserData, username, pathname })
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
    } else {
      if (isNoNeedUserInfo(pathname)) {
        return
      } else {
        nav(LOGIN_PATHNAME)
      }
    }
  }, [waitUserData, username, pathname])
}
